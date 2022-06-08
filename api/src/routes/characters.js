const {Router} = require('express');
const charactersHandlers = require('../controllers/characters.js');

const router = Router();

router.get('/', charactersHandlers.getCharactersHandler)
router.delete('/', charactersHandlers.deleteCharacterHandler)
router.post('/', charactersHandlers.postCharacterHandler)
router.put('/', charactersHandlers.putCharacterHandler)
router.get('/:id', charactersHandlers.getCharactersByIdHandler)



module.exports = router