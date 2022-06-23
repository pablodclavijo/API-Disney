const {Router} = require('express');
const passport = require('passport');
const tokenGen = require('../middleware/jwt/jwt');

const router = Router();

router.get('/', (req, res)=> res.status(200).send("go to /login or /register to continue"))
router.post('/register', passport.authenticate('signup', { session: false }),
async (req, res) => {
  res.json({
    message: 'Signup successful',
    user: req.user
  });
})
router.post('/login', tokenGen, 
async(req, res) =>{
  res.status(200).send("token succesfully generated")
})


module.exports = router