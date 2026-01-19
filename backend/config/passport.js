import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import { getDB } from "./db.js";
import dotenv from 'dotenv'

dotenv.config()

passport.use(new GoogleStrategy.Strategy(  // ← Note: .Strategy
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.callbackURL,
    },

    async (accessToken, refreshToken, profile, done) => {
        try {
            const db = getDB();

            // ✅ Fixed: 'emails' (plural) with safe access
            const email = profile.emails?.[0]?.value;

            // Check if email exists
            if (!email) {
                return done(new Error('No email found in Google profile'), null);
            }

            const [rows] = await db.execute(
                "SELECT * FROM users WHERE email = ?", [email]
            );
       
            if (rows.length > 0) {
                return done(null, rows[0]);
            }

            const [result] = await db.execute(
                "INSERT INTO users (name, email, google_id) VALUES (?, ?, ?)",
                [profile.displayName, email, profile.id]
            );

            return done(null, {
                id: result.insertId,
                name: profile.displayName,
                email,
            });

        } catch (error) {
            return done(error, null);
        }
    }
));

export default passport;