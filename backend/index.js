import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRoutes from './routes/authRoutes.js'
import passport from "passport";
import "./config/passport.js"
import path from 'path'


dotenv.config()
const app = express();

app.use(passport.initialize())

if(process.env.NODE_ENV !== "production"){
  app.use(cors({
  origin:process.env.UI_URL,
  credentials:true,
  allowedHeaders: ['Content-Type', 'Authorization']
}))
}

app.use(express.json());

const PORT = process.env.PORT || 6000;
const __dirname  = path.resolve()
// app.get("/", (req, res) => {
//   res.send("hello world");
// });
app.use('/auth',authRoutes)

if(process.env.NODE_ENV === "production"){


  app.use(express.static(path.join(__dirname,"../frontend/dist")))

app.get("/login",(req,res)=>{
  res.sendFile(path.join(__dirname,"..frontend","dist","index.html"))
})
}

connectDB();
app.listen(PORT, () => {
  console.log(`server is running ${PORT} `);
});
