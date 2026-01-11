import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'

dotenv.config()
const app = express();

app.use(cors())

app.use(express.json());

const PORT = process.env.PORT || 6000;
app.get("/", (req, res) => {
  res.send("hello world");
});
app.use('/auth',authRoutes)

connectDB();
app.listen(PORT, () => {
  console.log(`server is running ${PORT} `);
});
