import { NextFunction, Request, Response } from "express";
import patientService from "../../services/patient/patient-service";
import { jwtTokenGenerator } from "../../helper/jwt-token-generator";
class PatientController {
  /**
   *
   * @param req Express request object
   * @param res Express response object
   * @param next Express next function
   */
  async signIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const aadharCardNumber: string = req.body.aadharCardNumber;
      const { success, message, status, error, data } =
        await patientService.signIn(aadharCardNumber);
      if (success === false) {
        return res.status(status).json({ error });
      }
      return res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }

  async logIn(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const aadharCardNumber: string = req.body.aadharCardNumber;
      const otp: string = req.body.otp;
      const { success, message, status, error, data } =
        await patientService.logIn(aadharCardNumber, otp);
      if (success === false) {
        return res.status(status).json({ error });
      }
      const jwtToken: string = jwtTokenGenerator(aadharCardNumber);
      return res.status(status).json({ message, data: { jwtToken } });
    } catch (error) {
      next(error);
    }
  }
}

export default new PatientController();
