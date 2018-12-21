const passport = require('passport')
const { Strategy, ExtractJwt } = require('passport-jwt')
const boom = require('boom')
const { config } = require('../../../config')
const MongoLib = require('../../../lib/mongo')

passport.use(
  new Strategy({
    secretOrKey: config.authJwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
  },
  async function (tokenPayload, cb) {
    const mongoDB = new MongoLib()

    try {
      const [user] = await mongoDB.getAll('user', {
        username: tokenPayload.sub
      })
      console.log('user', user)

      if (!user) {
        return cb(boom.unauthorized(), false)
      }

      return cb(null, user)
    } catch (error) {
      return cb(error)
    }
  })
)
