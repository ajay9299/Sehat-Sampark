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
 * Consulating the patient api.
 */
router.post("/doctor/consulate",authVerify,doctorController.consulatePatient)

export default router;
