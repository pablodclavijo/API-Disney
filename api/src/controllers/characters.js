const charactersDbInfo = require("../services/dbInfo.js");


async function getCharactersHandler (req, res){

    const {name, movies, age, weight} = req.params
    if((name && age) || (weight && age) || (name && weight)) return res.status(400).send(
        "weight, age and name can only be queryed one at a time")
    const characters = {}
    if(name) characters = await charactersDbInfo.searchCharacters("name", name)     //we can do this without checking the result
    if(age) characters = await charactersDbInfo.searchCharacters("age", name)        // bc the function returns
    if(weight) characters = await charactersDbInfo.searchCharacters("weight", name)   //false when nothing found
    
    characters = await charactersDbInfo.getAllCharacters().catch(err => console.log(err))
    if(!characters) return res.status(404).send("characters not found")
    return res.status(200).send(characters)

    }

async function getCharactersByIdHandler (req, res){

    const {id} = req.params
    const characterDetail = await charactersDbInfo.getCharacterDetail(id).catch(err => consolelog(err))
    if(!characterDetail) return res.status(404).send("characters id doesn't match database")
    return res.status(200).send(characterDetail)
}

async function deleteCharacterHandler (req, res) {
     
    const {id} = req.body
    const isDeleted = await charactersDbInfo.deleteCharacter(id).catch(err => console.log(err))
    if(!isDeleted) return res.status(400).send("failed")
    return res.status(200).send("character succesfully deleted")
}

async function putCharacterHandler (req, res) {

    const {id, newValues} = req.body
    const isUpdated = await charactersDbInfo.updateCharacter(id, newValues)
    if(!isUpdated) return res.status(400).send("update failed")
    return res.status(200).send(isUpdated)
}

async function postCharacterHandler (req, res){

    const {characterData} = req.body
    const isPosted = await charactersDbInfo.createCharacter(characterData)
    if(!isPosted) return res.status(400).send("creatiion failed")
    return res.status(200).send(isPosted)
}
module.exports ={
    getCharactersHandler,
    getCharactersByIdHandler,
    deleteCharacterHandler,
    putCharacterHandler,
    postCharacterHandler

}

/*  
name    age     weight      fout    dout

T       f          f          t        t
T       t          f          f        

*/