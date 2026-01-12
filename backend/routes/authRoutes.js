import express from 'express'
import { login, register } from '../controllers/authController.js';
import protect from '../middleware/authMiddleware.js';

const router =  express.Router()

router.post('/register', register)
router.post('/login',login)
router.get('/home',protect,(req,res)=>{
res.status(200).json({message:"welcome homne", userId:req.userId})
})




export default router;