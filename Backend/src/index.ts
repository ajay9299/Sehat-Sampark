import { log } from "console";
import { connectToDatabase } from "./database/db-connection";
import app from "./app";
import dotenv from "dotenv";
import "./database/db-connection";
dotenv.config();
const PORT = 3001;

app?.listen(PORT, async () => {
  /** Connect to database*/
  connectToDatabase();
  log(
    "🚀🚀🚀==================Sehat-Pampark server up on port====================🚀🚀🚀",
    PORT
  );
});
