import { NextFunction, Request, Response } from "express";
import { jwtTokenGenerator } from "../../helper/jwt-token-generator";
import doctorService from "../../services/doctor/doctor-service";
import { PatientFormAttributes } from "../../models/patient-form-model";

class DoctorController {
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
      const doctorId: string = req.body.doctorId;
      const { success, message, status, error, data } =
        await doctorService.signIn(doctorId);
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
      const doctorId: string = req.body.doctorId;
      const otp: string = req.body.otp;
      const { success, message, status, error, data } =
        await doctorService.logIn(doctorId, otp);
      if (success === false) {
        return res.status(status).json({ error });
      }
      const jwtToken: string = jwtTokenGenerator(doctorId);
      return res.status(status).json({ message, data: { jwtToken } });
    } catch (error) {
      next(error);
    }
  }

  async getDoctorInfo(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const doctorId: string = req.user.id;
      const { success, message, status, error, data } =
        await doctorService.getDoctorInfo(doctorId);
      if (success === false) {
        return res.status(status).json({ error });
      }
      return res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
  async consulatePatient(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const doctorId: string = req.user.id;
      const formInfo: PatientFormAttributes = req.body;
      formInfo.doctorId = doctorId;
      const { success, message, status, error, data } =
        await doctorService.consulatePatient(formInfo);
      if (success === false) {
        return res.status(status).json({ error });
      }
      return res.status(status).json({ message, data });
    } catch (error) {
      next(error);
    }
  }
}

export default new DoctorController();
