import { log } from "console";
import { connectToDatabase } from "./database/db-connection";
import app from "./app";
const PORT = 3001;

app?.listen(PORT, async () => {
  /** Connect to database*/
  connectToDatabase();
  log(
    "🚀🚀🚀==================Sehat-Pampark server up on port====================🚀🚀🚀",
    PORT
  );
});
