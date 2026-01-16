import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let db;

const connectDB = async () => {
  try {
   db = mysql.createPool({
     host: process.env.DB_HOST,
     user: process.env.DB_USER,
     password: process.env.DB_PASSWORD,
     database: process.env.DB_NAME,
   })

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
