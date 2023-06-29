import express from "express";
import patientController from "../../controllers/patient/patient-controller";
import { authVerify } from "../../middlewares/auth.middleware";
import { celebrate, Joi, Segments } from "celebrate";
const router = express.Router();
/**
 * SingIn and Otp verification apis.
 */
router.post(
  "/patient/signIn",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      aadharCardNumber: Joi.string().required(),
    }),
  }),
  patientController.signIn
);
router.post(
  "/patient/otpVerify",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      aadharCardNumber: Joi.string().required(),
      otp: Joi.string().required(),
    }),
  }),
  patientController.logIn
);

/**
 * Get patient profile information api.
 */
router.get("/patient/myProfile", authVerify, patientController.getPatientInfo);

/**
 * Get patient health history api.
 * */
router.get(
  "/patient/health/history",
  authVerify,
  patientController.getPatientHealthHistory
);

router.get(
  "/patient/:patientId",
  authVerify,
  patientController.getPatientInfoByPatientId
);

export default router;
