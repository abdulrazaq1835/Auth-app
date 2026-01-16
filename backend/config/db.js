import sql, { createConnection } from "mysql2/promise";
import dotenv from "dotenv";
import { createPool } from "mysql/promise";

dotenv.config();

let db;

const connectDB = async () => {
  try {
    db = await createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
    });

    console.log("database connected");
  } catch (error) {
    console.log("database error", error);
  }


};

export const getDB = () => {
  if (!db) {
    throw new Error("Database not initialized. Call connectDB() first.");
  }
  return db;
};

export default connectDB;
