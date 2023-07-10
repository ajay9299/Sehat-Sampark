import patientRoute from "./patient/patient-route";
import doctorRoute from "./doctor/doctor-route";
import express from "express";
const router = express.Router();

router.use("/api", patientRoute, doctorRoute);

export default router;
