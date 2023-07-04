import express from "express";
import { authVerify } from "../../middlewares/auth.middleware";
import doctorController from "../../controllers/doctor/doctor-controller";
import { celebrate, Joi, errors, Segments } from "celebrate";
const router = express.Router();
/**
 * SingIn and Otp verification apis.
 */
router.post(
  "/doctor/signIn",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      doctorId: Joi.string().required(),
    }),
  }),
  doctorController.signIn
);

router.post(
  "/doctor/otpVerify",
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      doctorId: Joi.string().required(),
      otp: Joi.string().required(),
    }),
  }),
  doctorController.logIn
);

/**
 * Get doctor profile information apis.
 */
router.get("/doctor/myProfile", authVerify, doctorController.getDoctorInfo);

/**
 * Consult the patient api.
 */
router.post("/doctor/consult", authVerify, doctorController.consulatePatient);

/**
 * Check patient history
 */
router.get(
  "/doctor/:patientId",
  authVerify,
  doctorController.getPatientOldHistory
);

export default router;
