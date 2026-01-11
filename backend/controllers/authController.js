
import bcrypt from 'bcrypt'
import { getDB } from '../config/db.js';


export async function register(req,res) {

    const {name,email,password}  = req.body

   try {
     const db = getDB();

    //   console.log(db)
    const [rows]  = await db.query('select * from users where email = ?',[email])
    if(rows.length>0){
      return res.status(401).json({message:"user already exists"})
    }

    const hashedPassword =  await bcrypt.hash(password,10)
    await db.query("insert into users (name,email,password) values(?,?,?)",[name,email,hashedPassword])

    res.status(201).json({message:"user created successfully"})
   } catch (error) {
       console.log("REGISTER ERROR 👉", error); // 👈 THIS IS THE KEY
  return res.status(500).json({message:"Internal server error"});
   }
    

}