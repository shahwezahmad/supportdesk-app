
const jwt = require('jsonwebtoken')
const User = require('../models/userModels')

const protect = async (req,res,next) => {
    let token
    console.log(typeof req.headers.authorization )
    if(req.headers.authorization && String(req.headers.authorization).startsWith('Bearer') ){
        try {
             token = req.headers.authorization.split(' ')[1]
        let decoded = jwt.verify(token,process.env.SECRET_KEY)

         req.user = await User.findById(decoded.id).select('-password')
         next()

        } catch (error) {
            res.status(400).send('not authorized')
            console.log(error)
        }
    }else{
        if(!token){
            res.status(500).send('not authorized')
        }
    }

}

module.exports = {protect}