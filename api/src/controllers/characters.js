const { getAllDb } = require("../services/dbInfo");


async function getTemperaments (req, res){
    const temperaments = await getAllDb().catch(err => console.log(err))
    if(temperaments.length) return res.status(200).send(temperaments)
    res.status(404).send("not found")
    }

module.exports = getTemperaments