import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getDB } from "../config/db.js"

dotenv.config();
  // async functon
export async function register(req, res) {
  const { name, email, password } = req.body;

  try {
    const db = getDB();

   
    const [rows] = await db.query("select * from users where email = ?", [
      email,
    ]);
    if (rows.length > 0) {
      return res.status(401).json({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("insert into users (name,email,password) values(?,?,?)", [
      name,
      email,
      hashedPassword,
    ]);

    res.status(201).json({ message: "user created successfully" });
  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
     return  res.status(401).json({ message: "All fields Required" });
    }

    const db =  getDB();
    const [rows] = await db.query("select * from users where email = ?", [
      email,
    ]);

    if (rows.length === 0) {
      return res.status(401).json({ message: "USER not exists" });
    }

    const isMatch =  await bcrypt.compare(password, rows[0].password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }

    const token = jwt.sign({ id: rows[0].id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
      
    });
    return res.status(200).json({ token: token });
  } catch (error) {
    console.log("REGISTER ERROR 👉", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}




export const getUser = async (req, res) => {
  try {
     const userId = req.userId;

    const db = getDB();
    const [rows] = await db.execute(
      "SELECT id, name, email, auth_provider FROM users WHERE id = ?",
      [userId]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(rows[0]);
  } catch (error) {
    console.log("GET USER ERROR ", error);
    res.status(500).json({ message: "Server error" });
  }
};