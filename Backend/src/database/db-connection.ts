import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();

export let sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST!,
    dialect: "mysql",
  }
);

export async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    // Perform other database operations here
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
