import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db-connection"; // Replace with your Sequelize instance

interface DoctorAttributes {
  doctorId: string;
  departmentId: string;
  departmentName: string;
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

class Doctor extends Model<DoctorAttributes> implements DoctorAttributes {
  public doctorId!: string;
  public departmentId!: string;
  public departmentName!: string;
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

Doctor.init(
  {
    doctorId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    departmentId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    departmentName: {
      type: DataTypes.STRING,
      allowNull: false,
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
      allowNull: true, // Set allowNull as true to make it optional
    },
  },
  {
    sequelize,
    modelName: "Doctor",
  }
);

// - You can call this to synchronize the model with the database
Doctor.sync();

export default Doctor;
