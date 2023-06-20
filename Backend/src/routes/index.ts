import patientRoute from "./patient/patient-route";
import express from "express";
const router = express.Router();

router.use("/api", patientRoute);

export default router;
