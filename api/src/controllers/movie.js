const moviesDbInfo = require('../services/dbInfo.js')

async function getMoviesHandler (req, res){

    const {name, genreId, order} = req.params
    if((order && genreId)) return res.status(400).send("name and genre can only be queryed one at a time")
    const movies = {}
    if(name) movies = await moviesDbInfo.searchMoviesByTitle(name, order ? order : null).catch(err => {return res.status(500).send(err)})
    if(genreId) movies = await moviesDbInfo.searchMoviesByGenre(genreId, order ? order : null).catch(err => {return res.status(500).send(err)})
    movies = await moviesDbInfo.getAllMovies().catch(err => {return status(500).send(err)})
    if(!movies) return res.status(404).send("movies not found")
    return res.status(200).send(movies)

    }

async function getMovieByIdHandler (req, res){

    const {id} = req.params
    const movieDetail = await moviesDbInfo.getMovieDetail(id).catch(err => {return res.status(500).send(err)})
    if(!movieDetail) return res.status(404).send("movie's id doesn't match database")
    return res.status(200).send(movieDetail)
}

async function deleteMovieHandler (req, res) {
     
    const {id} = req.body
    const isDeleted = await moviesDbInfo.deleteMovie(id).catch(err => {return res.status(500).send(err)})
    if(!isDeleted) return res.status(400).send("failed")
    return res.status(200).send("movie succesfully deleted")
}

async function putMovieHandler (req, res) {

    const {id, newValues} = req.body
    const isUpdated = await moviesDbInfo.updateMovie(id, newValues).catch(err => {return res.status(500).send(err)})
    if(!isUpdated) return res.status(400).send("update failed")
    return res.status(200).send(isUpdated)
}

async function postMovieHandler (req, res){

    const {movieData} = req.body
    const isPosted = await moviesDbInfo.createMovie(movieData).catch(err => {return res.status(500).send(err)})
    if(!isPosted) return res.status(400).send("creatiion failed")
    return res.status(200).send(isPosted)
}
module.exports ={
    postMovieHandler,
    putMovieHandler,
    getMoviesHandler,
    getMovieByIdHandler,
    deleteMovieHandler
}
