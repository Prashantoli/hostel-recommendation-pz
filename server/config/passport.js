const passport = require("passport")
const GoogleStrategy = require("passport-google-oauth20").Strategy
const FacebookStrategy = require("passport-facebook").Strategy

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // In production, save user to database
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "google",
          type: "user",
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

// Facebook OAuth Strategy
passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: "/api/auth/facebook/callback",
      profileFields: ["id", "displayName", "emails"],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // In production, save user to database
        const user = {
          id: profile.id,
          name: profile.displayName,
          email: profile.emails[0].value,
          provider: "facebook",
          type: "user",
        }

        return done(null, user)
      } catch (error) {
        return done(error, null)
      }
    },
  ),
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  // In production, fetch user from database
  done(null, { id })
})

module.exports = passport
