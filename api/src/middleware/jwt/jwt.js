const jwt = require('jsonwebtoken');
const passport = require('passport')

 

const tokenGen = async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
             const error = new Error('An error occurred.');
             return next(error);
          }
          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);
              const body = {email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }


module.exports = tokenGen