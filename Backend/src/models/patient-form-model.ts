import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db-connection"; // Replace with your Sequelize instance
import Patient from "./patient-model";
import Doctor from "./doctor-model";

interface Medication {
  medicationName: string;
  dosage: string;
  frequency: string;
  duration: string;
}

interface RecommendedTest {
  testName: string;
  reasonForTest: string;
}

export interface PatientFormAttributes {
  patientId: string;
  doctorId: string;
  symptoms: string[];
  durationOfSymptoms: string;
  physicalExaminationFindings: string[];
  medicationList: Medication[];
  recommendedTests: RecommendedTest[];
  additionalNotes: string;
}

class PatientForm
  extends Model<PatientFormAttributes>
  implements PatientFormAttributes
{
  public patientId!: string;
  public doctorId!: string;
  public symptoms!: string[];
  public durationOfSymptoms!: string;
  public physicalExaminationFindings!: string[];
  public medicationList!: Medication[];
  public recommendedTests!: RecommendedTest[];
  public additionalNotes!: string;
}

PatientForm.init(
  {
    patientId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Patients",
        key: "uidNumber",
      },
    },
    doctorId: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: "Doctors",
        key: "doctorId",
      },
    },
    symptoms: {
      type: DataTypes.JSON, // Store array values as JSON
      defaultValue: [],
    },
    durationOfSymptoms: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    physicalExaminationFindings: {
      type: DataTypes.JSON, // Store array values as JSON
      defaultValue: [],
    },
    medicationList: {
      type: DataTypes.JSON, // Store array values as JSON
      defaultValue: [],
    },
    recommendedTests: {
      type: DataTypes.JSON, // Store array values as JSON
      defaultValue: [],
    },
    additionalNotes: { type: DataTypes.STRING },
  },
  {
    sequelize,
    modelName: "PatientForm",
  }
);

// Define the associations
PatientForm.belongsTo(Doctor, { foreignKey: "doctorId" });
PatientForm.belongsTo(Patient, { foreignKey: "uidNumber" });

// You can call this to synchronize the model with the database
PatientForm.sync();

export default PatientForm;
