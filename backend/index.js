import express from "express";
import { configDotenv } from "dotenv";
import connectDB from "./config/db.js";

const app = express();

const PORT = process.env.PORT || 6000;
app.get("/", (req, res) => {
  res.send("hello world");
});
connectDB();
app.listen(PORT, () => {
  console.log(`server is running ${PORT} `);
});


