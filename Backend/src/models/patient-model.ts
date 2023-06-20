import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from "../database/db-connection"; // Replace with your Sequelize instance

interface PatientAttributes {
  uidNumber: string;
  name: string;
  dob: string;
  gender: string;
  phoneNumber: string;
  email: string;
  state: string;
  district: string;
  subDistrict: string;
  street: string;
  pinCode: string;
}

class Patient extends Model<PatientAttributes> implements PatientAttributes {
  public uidNumber!: string;
  public name!: string;
  public dob!: string;
  public gender!: string;
  public phoneNumber!: string;
  public email!: string;
  public state!: string;
  public district!: string;
  public subDistrict!: string;
  public street!: string;
  public pinCode!: string;
}

Patient.init(
  {
    uidNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    district: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subDistrict: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Patient",
  }
);

// - You can call this to synchronize the model with the database
Patient.sync();

export default Patient;
