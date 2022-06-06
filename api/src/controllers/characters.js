const { filterCharactersByMovie, searchCharacters, deleteCharacter, updateCharacter, getAllCharacters,
    characterDetail,createCharacter,getCharacterDetail} = require("../services/dbInfo");


async function fetchAllCharacters (req, res){
    
    const characters = await getAllCharacters ().catch(err => console.log(err))
    if(!characters) return res.status(404).send("characters not found")
    return res.status(200).send(characters)

    }

async function getById (req, res) {

    const {id} = req.params
    const characterDetail = await characterDetail(id).catch(err => console.log(err))
    if(!characterDetail) return res.status(404).send("character not found")
    return res.status(200).send(character)
}

async function postCharacterInDb (req, res){

    const {name, iamge, age, weight, story} = req.body
    const character = await createCharacter({name, iamge, age, weight, story}).catch(err => console.log(err))
    if(!character) return res.status(500).send("Error")
    return res.status(200).send("character successfully created")
}

async function updateCharacterInDb (req, res){

    const {id, name, iamge, age, weight, story} = req.body
    const character = await updateCharacter(id, {name, iamge, age, weight, story}).catch(err => console.log(err))
    if(!character) return res.status(500).send("Error")
    return res.status(200).send("character successfully created")
}

async function deleteCharacterInDb (req, res){

    const {id} = req.params
    const isDeleted = await deleteCharacter(id).catch(err => console.log(err))
    if(!isDeleted) return res.status(500).send("error")
    return res.status(200).send("character deleted")
}

async function queryCharactersByName (req, res){

    const {name} = req.params
    const characters = await searchCharacters("name", name).catch(err => console.log(err))
    if(!characters) return res.status(404).send("not found")
    return res.status(200).send(characters)
}

async function filterCharactersByWeight (req, res) { 
    
    const {weight} = req.params
    const characters = await searchCharacters("weight", weight).catch(err => console.log(err))
    if(!characters) return res.status(404).send("not found")
    return res.status(200).send(characters)
}
async function filterCharactersByAge (req, res) { 
    
    const {age} = req.params
    const characters = await searchCharacters("age", age).catch(err => console.log(err))
    if(!characters) return res.status(404).send("not found")
    return res.status(200).send(characters)
}

async function searchCharactersByMovie (req, res) {

    const {id} = req.params
    const characters = await filterCharactersByMovie(id)
    if(!characters) return res.status(404).send("not found")
    return res.status(200).send(characters)
}

async function characterDetail (req, res){

    const {id} = req.params
    const character = await getCharacterDetail(id).catch(err => console.log(err))
    if(!character) return res.status(404).send("not found")
    return res.status(200).send(character)
}
module.exports ={
    fetchAllCharacters, getById, postCharacterInDb, updateCharacterInDb, 
    deleteCharacterInDb, queryCharactersByName, filterCharactersByAge, filterCharactersByWeight,
    searchCharactersByMovie, characterDetail
}