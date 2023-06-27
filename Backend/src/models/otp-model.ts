import { DataTypes, Model } from "sequelize";
import { sequelize } from "../database/db-connection"; // Replace with your Sequelize instance
interface OtpAttributes {
  uniqueId: string;
  mobileNumber: string;
  otp: string;
}

class Otp extends Model<OtpAttributes> implements OtpAttributes {
  public uniqueId!: string;
  public mobileNumber!: string;
  public otp!: string;
}

Otp.init(
  {
    uniqueId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    otp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Otp",
  }
);

// - You can call this to synchronize the model with the database
Otp.sync();

export default Otp;
