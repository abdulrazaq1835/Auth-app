import passport from "passport";
import GoogleStratergy from 'passport-google-oauth20'
import { getDB } from "./db.js";

passport.use(new GoogleStratergy (
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },

    async(accessToken,refreshToken,profile,done)=>{
        try {
            
            const  db  = getDB()

            const email  = profile.email[0].value

            const [rows] = db.execute(
                "select * from users  where email = ?",[email]
            )
       
            if(rows.length > 0) {
                return done(null, rows[0])
            }

              const [result] = await db.execute(
          "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)",
          [profile.displayName, email, profile.id]
        )

        return done(null, {
          id: result.insertId,
          name: profile.displayName,
          email,
        })

        } catch (error) {
              return done(err, null)
        }
    }
))

export default passport;