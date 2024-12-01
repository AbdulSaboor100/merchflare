const passport = require("passport");
const User = require("../modals/User");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

let opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(
  new JwtStrategy(opts, async function (jwt_payload, done) {
    try {
      const user = await User?.findById(jwt_payload?.user?.id);

      if (user?.id) {
        return done(null, user);
      }

      return done(null, false);
    } catch (error) {
      console.log(`ERROR IN JWT STRATEGY: ${error}`);
      return done(null, false);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
