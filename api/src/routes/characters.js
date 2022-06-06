const {Router} = require('express');
const { getDogs, getById, postNewDog } = require('../controllers/dogs');

const router = Router();

router.get('/', getDogs)
router.get('/:id', getById)
router.post('/', postNewDog)

module.exports = router