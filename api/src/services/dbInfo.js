const sequelize = require ('sequelize')
const {Character, Movie, Genre, User} = require('../db')
const Op = sequelize.Op


const getAllCharacters = async () =>{
    
    const characters = await Character.findAll(
        {attributes: ['name', 'image']}); 
    if(!characters) return false;
    return characters; 
}

const createCharacter = async (characterData) =>{

    const newCharacter = await Character.create({...characterData})
    if(!newCharacter) return false
    return newCharacter
}

const updateCharacter = async (characterId, newValues) => {

    const characterInstance = await Character.findByPk(characterId)
    if(!characterInstance) return false
    const isUpdated = await characterInstance.update({...newValues})
    if(!isUpdated) return false
    return isUpdated
}

const deleteCharacter = async (characterId) => {

    const character = await Character.findByPk(characterId)
    if(!character) return false
    const isDeleted = await character.destroy()
    if(!isDeleted) return false
    return true
}

const getCharacterDetail = async (id) =>{

    const character = await findByPk(id, { include: Movie })
    if(!character) return false
    return character
}

const getAllMovies= async () =>{
    
    const movies = await Movie.findAll({
        attributes: ['title', 'image', 'date']}); 
    if(!movies) return false;
    return movies; 
}

const createMovie = async (movieData) =>{

    const newMovie = await Movie.create({...movieData})
    if(!newMovie) return false
    return newMovie
}

const updateMovie = async (movieId, newValues) => {

    const movieInstance = await Movie.findByPk(movieId)
    if(!movieInstance) return false
    const isUpdated = await movieInstance.update({...newValues})
    if(!isUpdated) return falsemovieInstance
    return isUpdated
}

const deleteMovie = async (movieId) => {

    const movie = await Movie.findByPk(movieId)
    if(!movie) return false
    const isDeleted = await movie.destroy()
    if(!isDeleted) return false
    return true
}

const getMovieDetail = async (id) =>{

    const movie = await findByPk(id, { include: Character })
    if(!movie) return false
    return movie
}


const searchCharacters = async (endpoint, argument) =>{

    const characters = {}
    switch(endpoint){
        case "name": characters = await Character.findAll({where: {[Op.substring] : argument}})
        case "age" : characters = await Character.findAll({where: {age : argument}})
        case "weight" : characters = await  Character.findAll({where: {weight : argument}})
        default : characters = false
    }       
    return characters
}

const filterCharactersByMovie= async (movieId) =>{

    const movie = await Movie.findByPk(movieId)
    if(!movie) return false
    const characters = await movie.getCharacters() // lazy loading
    if(!characters) return false
    return characters
 
}
const searchMoviesByTitle = async (title , sort = null ) =>{

    const acceptedSortValues = ['ASC', 'DESC']
    if(sort && !acceptedSortValues.includes(sort)) return false
    const movies = sort ? await Movie.findAll({where: {title: title}, order : [['date', sort]]}) :
    await Movie.findAll({where: {title: title}})
    if(!movies) return false
    return movies
}

const searchMoviesByGenre = async (genreId, sort = null) =>{

    const acceptedSortValues = ['ASC', 'DESC']
    if(sort != false && !acceptedSortValues.includes(sort)) return false
    const movies = sort ? await Genre.findByPk(genreId, {include: Movie , order : [['date', sort]]}) :
    await Genre.findByPk(genreId, {include : Movie})
    if(!movies) return false
    return movies
    
}
const passwordHash = async (password, saltRounds) => {
    try {
      const salt = await bcrypt.genSalt(saltRounds)
      return await bcrypt.hash(password, salt)
    } catch (err) {
      console.log(err)
    }
    return null
  }

const userCreate = async (email, password) =>{

    const hashedPassword = passwordHash(password, 10);
    if(!hashedPassword || !email) return false
    const newUser = User.create({email: email, hashedPassword : hashedPassword}).catch(err => console.log(err))
    if(!newUser) return false
    return newUser
}

const getUser = async (email) => {

    const user = await User.findByPk(email).catch(err => console.log(err))
    if(!user) return false
    return user
}
module.exports = {
    deleteCharacter,
    updateCharacter,
    getAllCharacters,
    createCharacter,
    getCharacterDetail,
    deleteMovie,
    updateMovie,
    getAllMovies,
    getOneMovie,
    getMovieDetail,
    createMovie,
    searchMoviesByTitle,
    searchMoviesByGenre,
    filterCharactersByMovie,
    searchCharacters,
    userCreate,
    getUser
}
