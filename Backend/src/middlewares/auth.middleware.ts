import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { NextFunction, Request, Response } from "express";
dotenv.config();

/**
 *
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express nextFunction
 */
export const authVerify = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    const token = req.headers["authorization"]?.split(" ")[1];
    console.log(">>>>>>>>>>>>>>>", token);
    if (!token) {
      return res.status(400).json({
        errors: "Please pass valid token",
      });
    }
    const patientInfo: any = jwt.verify(token!, process.env.JWT_KEY!);
    console.log(">>>>>>>>>>>>>>>>>>>>>>", patientInfo);
    req.user = {
      id: patientInfo.aadharCardNumber,
    };
    
    next();
  } catch (error) {
    return res.status(403).json({ errors: "Please pass valid token" });
  }
};
