const {Router} = require('express');
const { postNewDog } = require('../controllers/dogs');

const router = Router();

router.post('/', postNewDog)

module.exports = router