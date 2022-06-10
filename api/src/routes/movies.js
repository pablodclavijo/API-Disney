const {Router} = require('express')
const movieHandlers = require('../controllers/movie.js')
const router = Router()

router.get('/', movieHandlers.getMoviesHandler)
router.delete('/', movieHandlers.deleteMovieHandler)
router.put('/', movieHandlers.putMovieHandler)
router.get('/:id', movieHandlers.getMovieByIdHandler)
router.post('/', movieHandlers.postMovieHandler)

module.exports = router