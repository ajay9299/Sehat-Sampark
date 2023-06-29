import { doctorInfo } from "../../database/doctor-info";
import { generateOTP } from "../../helper/otp-generator";
import Doctor from "../../models/doctor-model";
import Otp from "../../models/otp-model";
import { sendOTP, verifyOTP } from "../../helper/twilio-config";
import PatientForm, {
  PatientFormAttributes,
} from "../../models/patient-form-model";

class DoctorService {
  async signIn(doctorId: string) {
    try {
      /**Call doctorId verification api that will generate otp on linked phone number */
      const isValidDoctorId = doctorInfo.find(
        (info) => info.doctorId === doctorId
      );

      if (!isValidDoctorId) {
        return {
          success: false,
          status: 400,
          error: "Invalid DoctorId number",
        };
      }

      /**Assume Otp will generate by DoctorId verification api */
      const otp: string = generateOTP();
      console.log(otp);

      
      /**Save the generated otp*/

      const isOtp = await Otp.findByPk(isValidDoctorId.doctorId);

      if (isOtp) {
        isOtp.otp = otp;
        await isOtp.save();
      }else{
        await Otp.create({
          uniqueId: isValidDoctorId.doctorId,
          mobileNumber: isValidDoctorId.phoneNumber,
          otp,
        });
      }

      if (isValidDoctorId.phoneNumber === "+917905455033") {
        await sendOTP(isValidDoctorId.phoneNumber, otp);
      }

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
   * @param doctorId doctorId
   * @param otp
   */
  async logIn(doctorId: string, otp: string) {
    try {
      /**Find otp data based on doctorId */
      const isOtpPresent = await Otp.findByPk(doctorId);
      if (!isOtpPresent || isOtpPresent.otp !== otp) {
        return {
          success: false,
          status: 400,
          error: "Invalid otp",
        };
      }

      /**If doctorId verified then we will receive Doctor info. */
      const isValidDoctorInfo = doctorInfo.find(
        (info) => info.doctorId === doctorId
      );

      /**Fetch Doctor info already present in db */
      const isDoctorAlreadyPresent = await Doctor.findByPk(doctorId);

      if (!isDoctorAlreadyPresent) {
        await Doctor.create(isValidDoctorInfo);
      }

      await Otp.destroy({ where: { uniqueId: doctorId } });

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
   * @param doctorId logged in doctorId
   * @returns DoctorInfo by doctorId
   */
  async getDoctorInfo(doctorId: string) {
    try {
      const doctorInfo = await Doctor.findByPk(doctorId);
      return {
        success: true,
        status: 200,
        message: "DoctorInfo by uuid",
        data: { doctorInfo },
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }

  async consulatePatient(formData: PatientFormAttributes) {
    try {
      const newlyCreatedForm = await PatientForm.create(formData);
      // form database operation
      return {
        success: true,
        status: 200,
        message: "Form submit successfully",
        data: newlyCreatedForm,
      };
    } catch (error) {
      return { success: false, status: 500, error };
    }
  }
}

export default new DoctorService();
