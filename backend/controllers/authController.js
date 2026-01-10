
import connectDB from "../config/db.js";


export async function register(req,res) {

    const {username,email,password}  = req.body

   try {
      const db = connectDB()
    //   console.log(db)
   } catch (error) {
    
   }
    

}