import { where } from "sequelize";
import { addharCardInfo } from "../../database/aadhar-card-info";
import { generateOTP } from "../../helper/otp-generator";
import Otp from "../../models/otp-model";
import Patient from "../../models/patient-model";

class PatientService {
  async signIn(aadharCardNumber: string) {
    /**Call aadharCard verification api that will generate otp on linked phone number */
    const isValidAadharCard = addharCardInfo.find(
      (info) => info.uidNumber === aadharCardNumber
    );

    if (!isValidAadharCard) {
      return {
        success: false,
        status: 400,
        error: "Invalid aadharCard number",
      };
    }

    /**assume Otp will generate by aadharCard verification api */
    const otp: string = generateOTP();
    /**Save the generated otp*/
    await Otp.create({
      aadharCardNumber: isValidAadharCard.uidNumber,
      mobileNumber: isValidAadharCard.phoneNumber,
      otp,
    });

    console.log("Otp", otp);
    return {
      success: true,
      status: 200,
      message: "Otp send to linked mobile number",
      data: {},
    };
  }

  /**
   *
   * @param aadharCardNumber patient aadhar card number
   * @param otp
   */
  async logIn(aadharCardNumber: string, otp: string) {
    /**Find otp data based on aadharCard number*/
    const isOtpPresent = await Otp.findByPk(aadharCardNumber);
    if (!isOtpPresent || isOtpPresent.otp !== otp) {
      return {
        success: false,
        status: 400,
        error: "Invalid otp",
      };
    }

    /**If aadharCard verified then we will receive patient info. */
    const isValidAadharCard = addharCardInfo.find(
      (info) => info.uidNumber === aadharCardNumber
    );

    /**Fetch patient info already present in db */
    const isPatientAlreadyPresent = await Patient.findByPk(aadharCardNumber);

    if (!isPatientAlreadyPresent) {
      await Patient.create(isValidAadharCard);
    }

    await Otp.destroy({ where: { aadharCardNumber: aadharCardNumber } });

    return {
      success: true,
      status: 200,
      message: "Otp verified successfully 😁",
      data: { jwt: "123bksfuhsfkjsdnnsjdn" },
    };
  }
}

export default new PatientService();
