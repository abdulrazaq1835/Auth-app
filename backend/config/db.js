import sql, { createConnection } from "mysql2";
import dotenv from "dotenv";

dotenv.config();

let db;

const connectDB = async () => {
  try {
    db = await createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.user_db,
    });

    console.log("database connected");
  } catch (error) {
    console.log("database error", error);
  }
};

export default connectDB;
