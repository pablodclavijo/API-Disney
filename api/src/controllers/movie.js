const {getAllDb, getOneDb, postDog, postTemperament} = require('../services/dbInfo')
const {getApiInfo} = require ('../services/apiInfo.js')
const sequelize = require ('sequelize')

async function saveDog (id=null, name, height, lifespan, weight, image, temperament, createdInDb = false)
    {
     if(image==null){
        const dogs = await getApiInfo();
        const dogFromApi = dogs.filter(e=>e.name === name);
        if(!dogFromApi) res.status(404).send("not found")
        saveDog(
            dogFromApi[0].id,
            dogFromApi[0].name,
            dogFromApi[0].height.metric,
            dogFromApi[0]["life_span"],
            dogFromApi[0].weight.metric,
            dogFromApi[0].image.url,
            dogFromApi[0].temperament)
    }
     const dogInstance = await postDog(
        id, 
        name, 
        height, 
        lifespan, 
        weight, 
        image, 
        createdInDb
        ).catch(err => console.log(err))
        if(!dogInstance) return false;
        console.log(typeof(temperament), temperament)
    const temperaments = temperament.split(', ')
    temperaments.forEach(async (el)=> {
        const temperamentInstance = await postTemperament(el);
        temperamentInstance && await dogInstance.addTemperament(temperamentInstance, {through : "dogs_temperament"}).catch(err => console.log(err))
        })

    return true;
   }


async function getDogs (req, res){

const {name} = req.query
if(name){
    const dog = await getOneDb(name) 
    if(dog !== null ){ return res.status(200).send(dog)}
    const dogFromApi = await getApiInfo(name).catch(err => console.log(err))
    if(Object.keys(dogFromApi).length === 0) return res.status(404).send("not found")
    await saveDog(
        dogFromApi[0].id,
        dogFromApi[0].name,
        dogFromApi[0].height.metric,
        dogFromApi[0]["life_span"],
        dogFromApi[0].weight.metric,
        null,
        dogFromApi[0].temperament)
    return getDogs(req, res)
}


const dbInfo = await getAllDb("dogs")
if(dbInfo.length>1) return res.status(200).send(dbInfo)
const apiInfo = await getApiInfo()
apiInfo.forEach(dog=>{
    dog.temperament &&
    saveDog(
        dog.id,
        dog.name,
        dog.height.metric,
        dog["life_span"],
        dog.weight.metric,
        dog.image.url,
        dog.temperament
)
});
const dbInfoAfterSaving = await getAllDb('dogs')
if(!dbInfoAfterSaving) return res.status(404).send("not found")
return res.status(200).send(dbInfoAfterSaving);

}

async function getById(req, res){
    const {id} = req.params
    const dog = await getOneDb(parseInt(id))
    if(!dog) {
        const dogs = await getDogs()
        const dogApi = dogs.filter(e=> e.id === id)    
        if(!dogApi) return res.status(404).send("not found")
        await saveDog(dogApi)
        return res.status(200).send(dogApi)
    }
    return res.status(200).send(dog)    
    }

async function postNewDog (req, res) {

    const {name, weight, lifespan, height, image, temperament} = req.body
    const newDog = await saveDog(id=null, name, height, lifespan, weight, image, temperament, true);
    console.log(name, weight, lifespan, height, image, temperament)
    if(!newDog) return res.status(404).send("fatal error")
    return res.status(200).send("success")
}


module.exports = {
    getDogs,
    getById,
    postNewDog
}