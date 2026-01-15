import express from "express"
import passport from "passport"
import jwt from "jsonwebtoken"
import { getUser, login, register } from "../controllers/authController.js"
import protect from "../middleware/authMiddleware.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.get("/home", protect, getUser)

router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"],
}))

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    )
    
    

      res.redirect(`http://localhost:5173/home?token=${token}`)
  }
)

export default router
