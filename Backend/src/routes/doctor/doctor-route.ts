import express, { Request, Response } from "express";
import { authVerify } from "../../middlewares/auth.middleware";
import doctorController from "../../controllers/doctor/doctor-controller";
import { celebrate, Joi, errors, Segments } from "celebrate";
import fs from "fs";
import csv from "csv-parser";
import path from "path";

const tf = require("@tensorflow/tfjs-node");

// Step 1: Load the saved model
const modelPath = path.join(__dirname, "../../MlModel/model.json");

const router = express.Router();
router.post("/doctor/test", async (req: Request, res: Response) => {
  tf.loadLayersModel("file://" + modelPath)
    .then((model: any) => {
      // Step 2: Read and preprocess the symptom data
      const userSymptoms = ["Rash", "Itching", "Blistering", "Sunburn"];
      const uniqueSymptoms = ["Rash", "Itching", "Blistering", "Sunburn"]; // Update with the unique symptoms in your dataset
      const encodedSymptoms = userSymptoms.map((symptom) =>
        uniqueSymptoms.indexOf(symptom)
      );

      const input = tf.tensor2d([encodedSymptoms], [1, 4]);

      // Step 3: Make predictions
      const prediction = model.predict(input);
      const predictedDiseaseIndex = tf.argMax(prediction).dataSync()[0];

      // Step 4: Use the unique diseases
      const uniqueDiseases = ["Flu", "Cold", "COVID-19"]; // Update with the unique diseases in your dataset
      const predictedDisease = uniqueDiseases[predictedDiseaseIndex];
      console.log("Predicted Disease:", predictedDisease);
    })
    .catch((error: Error) => {
      console.error("Error loading model:", error);
    });

  res.status(200).json({ ok: "ok" });
});

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
