import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

const protect = async(req,res,next) => {
    try {
        let token;
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token = req.headers.authorization.split(" ")[1]

            console.log(req.headers)
        }

        if(!token){
            return res.status(401).json({message:"no authorization"})
        }

        // verify token
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        req.userId = decoded.id
 
        next()

    } catch (error) {
        return res.status(401).json({message:"not authorized"})
    }
}

export default protect