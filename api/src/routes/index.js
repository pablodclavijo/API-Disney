const { Router } = require('express');
const dogs = require('./dogs')
const temperament = require('./temperament')
const dog = require('./dog')


const router = Router();

router.use('/characters', characters)
router.use('/auth', auth)
router.use('/movies', movies)

module.exports = router;
