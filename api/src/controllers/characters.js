const charactersDbInfo = require("../services/dbInfo.js");


async function getAllCharacters (req, res){
    
    const characters = await charactersDbInfo.getAllCharacters ().catch(err => console.log(err))
    if(!characters) return res.status(404).send("characters not found")
    return res.status(200).send(characters)

    }


module.exports ={
    
}