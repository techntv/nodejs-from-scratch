require('dotenv').config()
const passport = require('passport')
const { ExtractJwt, Strategy } = require('passport-jwt')

const { find: findUser } = require('../services/users')

const { JWT_SECRET } = process.env;

const strategy = new Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
      const user = await findUser({ id: jwtPayload.id })
      if (!user) {
        const error = new Error('User not found')
        error.statusCode = 404;
        throw error
      }
      done(null, user)
    } catch (error) {
      done(error)
    }
  }
)

passport.use(strategy);

const initialize = () => {
  return passport.initialize();
};

const authenticate = () => {
  return passport.authenticate("jwt", { session: false });
};

module.exports = {
  initialize,
  authenticate,
};
