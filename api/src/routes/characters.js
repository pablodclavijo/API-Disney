const {Router} = require('express');
const { fetchAllCharacters, getById, postCharacterInDb, updateCharacterInDb, 
    deleteCharacterInDb, queryCharactersByName, filterCharactersByAge, filterCharactersByWeight,
    searchCharactersByMovie } = require('../controllers/characters');

const router = Router();

router.get('/', fetchAllCharacters)
router.get('/:id', getById)
router.post('/', postCharacterInDb)
router.delete('/:id', deleteCharacterInDb)
router.put('/', updateCharacterInDb)
router.get('/', queryCharactersByName)
router.get('/', filterCharactersByAge)
router.get('/', filterCharactersByWeight)
router.get('/', searchCharactersByMovie)




module.exports = router