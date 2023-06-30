import { where } from "sequelize";
import { addharCardInfo } from "../../database/aadhar-card-info";
import { generateOTP } from "../../helper/otp-generator";
import Otp from "../../models/otp-model";
import Patient from "../../models/patient-model";
import PatientForm from "../../models/patient-form-model";
import Doctor from "../../models/doctor-model";
import { sendOTP } from "../../helper/twilio-config";

class PatientService {
  async signIn(aadharCardNumber: string) {
    try {
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
      const isOtp = await Otp.findByPk(isValidAadharCard.uidNumber);

      if (isOtp) {
        isOtp.otp = otp;
        await isOtp.save();
      } else {
        await Otp.create({
          uniqueId: isValidAadharCard.uidNumber,
          mobileNumber: isValidAadharCard.phoneNumber,
          otp,
        });
      }

      if (isValidAadharCard.phoneNumber === "+917905455033") {
        await sendOTP(isValidAadharCard.phoneNumber, otp);
      }

      console.log("Otp", otp);

      return {
        success: true,
        status: 200,
        message: "Otp send to linked mobile number",
        data: {},
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }

  /**
   *
   * @param aadharCardNumber patient aadhar card number
   * @param otp
   */
  async logIn(aadharCardNumber: string, otp: string) {
    try {
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

      await Otp.destroy({ where: { uniqueId: aadharCardNumber } });

      return {
        success: true,
        status: 200,
        message: "Otp verified successfully 😁",
        data: {},
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }
  /**
   *
   * @param patientId logged in patientId
   * @returns patientInfo by patientId
   */
  async getPatientInfo(patientId: string) {
    try {
      const patientInfo = await Patient.findByPk(patientId);
      return {
        success: true,
        status: 200,
        message: "PatientInfo by uuid",
        data: { patientInfo },
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }

  /**
   *
   * @param patientId logged in patientId
   * @returns patient health history
   */
  async getPatientHealthHistory(patientId: string) {
    try {
      const patientInfo = await PatientForm.findAll({
        where: { patientId },
        include: [
          {
            model: Doctor,
            attributes: ["doctorId", "name", "departmentId", "phoneNumber"], // Specify the desired attributes from the joined table
          },
        ],
      });
      return {
        success: true,
        status: 200,
        message: "PatientInfo by uuid",
        data: patientInfo,
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }

  async getPatientInfoByPatientId(patientId: string) {
    try {
      let patientInfoByDb = await Patient.findByPk(patientId);
      if (!patientInfoByDb) {
        /**If aadharCard verified then we will receive patient info. */
        const isValidAadharCard = addharCardInfo.find(
          (info) => info.uidNumber === patientId
        );

        if (!isValidAadharCard) {
          return {
            success: false,
            status: 400,
            error: "Invalid patientId",
            data: {},
          };
        }

        patientInfoByDb = await Patient.create(isValidAadharCard);
      }
      const { name, dob, gender, phoneNumber } = patientInfoByDb;
      return {
        success: true,
        status: 200,
        message: "PatientInfo by uuid",
        data: { name, dob, gender, phoneNumber },
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }

  async updatePatientInfoService(
    patientId: string,
    weight: string,
    height: string,
    bloodGroup: string
  ) {
    try {
      const patientData = await Patient.findByPk(patientId);
      if (patientData) {
        patientData.weight = weight;
        patientData.height = height;
        patientData.bloodGroup = bloodGroup;
        await patientData?.save();
      }
      return {
        success: true,
        status: 200,
        message: "PatientInfo updated successfully",
        data: {},
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }
}

export default new PatientService();
