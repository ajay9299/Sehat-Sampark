import express from "express";
import patientController from "../../controllers/patient/patient-controller";
const router = express.Router();
router.post("/signIn", patientController.signIn);
router.post("/logIn", patientController.logIn);
export default router;
