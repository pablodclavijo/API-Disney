const { Router } = require('express');
const auth = require('./auth')
const movies = require('./movies')
const characters = require('./characters')
const passport = require('passport')

const jwtMiddleware = passport.authenticate('jwt', { session: false })

const router = Router();

router.use('/characters', jwtMiddleware, characters)
router.use('/auth', auth)
router.use('/movies', jwtMiddleware, movies)

module.exports = router;
