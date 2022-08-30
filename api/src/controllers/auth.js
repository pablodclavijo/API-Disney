const {userCreate, getUser} = require('../services/dbInfo')

async function postAuthRegisterController(req, res){

    const {email, password} = req.body
    const userExists = await getUser(email)
    if(userExists) return res.status(403).send("email already registered")
    const user = await userCreate(email, password).catch(err => {return res.status(500).send(err)})
    if(!user) return res.status(500).send("unable to register user")
    return res.status(200).send(user)

}



module.exports = postAuthRegisterController
