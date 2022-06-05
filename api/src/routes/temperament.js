const {Router} = require('express')
const getTemperaments = require('../controllers/temperament')
const router = Router()

router.get('/', getTemperaments)

module.exports = router