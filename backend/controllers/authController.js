
import connectDB from "../config/db.js";
import bcrypt from 'bcrypt'


export async function register(req,res) {

    const {username,email,password}  = req.body

   try {
     const db = getDB();
    //   console.log(db)
    const [rows]  = await db.query('select * from users where email = ?',[email])
    if(rows.length>0){
      return res.status(401).json({message:"user already exists"})
    }

    const hashedPassword =  await bcrypt.hash(password,10)
    await db.query("insert into users (name,email,password) values(?,?,?)",[username,email,hashedPassword])

    res.status(201).json({message:"user created successfully"})
   } catch (error) {
     return res.status(500).json({message:"Internal server error"})
   }
    

}