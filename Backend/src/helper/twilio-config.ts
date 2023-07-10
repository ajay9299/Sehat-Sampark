const twilio = require("twilio");
import dotenv from "dotenv";
dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// console.log(authToken);
const verifySid = process.env.TWILIO_VERIFY_SID;
const client = twilio(accountSid, authToken);

export async function sendOTP(phoneNumber : string, otp: string ): Promise<void> {
    try {
      const message = await client.messages.create({
        body: `Please enter the OTP to login to Sehat Sampark application ${otp}`,
        to: phoneNumber,
        from: "+15416923106",
      });
      console.log(`SMS sent with SID: ${message.sid}`);
      // Handle success
    } catch (error) {
      console.error(error);
      // Handle error
    }
  }

export async function verifyOTP(
  phoneNumber: string,
  code: string
): Promise<void> {
  try {
    const verificationCheck = await client.verify
      .services(verifySid)
      .verificationChecks.create({
        to: phoneNumber,
        code: code,
      });
    console.log(verificationCheck.status);
  } catch (error) {
    console.error(error);
  }
}
