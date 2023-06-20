import { Sequelize } from "sequelize-typescript";
export const sequelize = new Sequelize("sehat_sampark", "root", "qwerty123", {
  host: "health-connectdb.ch5fbz3ff1yl.ap-south-1.rds.amazonaws.com",
  dialect: "mysql",
});

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // Perform other database operations here
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
