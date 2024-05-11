
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const userRegister = async (req,res)=> {
    const {name, email, password}  = req.body
    try {
    
            if(!name || !email || !password) {
                res.status(400).send('fill all field')
            // throw new Error('') 
            // throw new Error('fill all field')
            }
            
            // check if user already exist
            const userExist = await User.findOne({email})

            if(userExist){
                res.status(500).send('User already exists')
            }
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(password,salt)

            const user = await  User.create({
                name,
                email,
                password:hashPassword
            })

            if(user) {
                res.status(200).json({
                    _id:user._id,
                    name:user.name,
                    email:user.email,
                    token:generateToken(user._id)
                })
               
            }else {
                res.status(400).send('Invalid data')
            }

        } catch (error) {
            console.log(error)
        }
}

const userLogin = async (req,res)=>{
    const {email, password} = req.body
    const user = await User.findOne({email})
   try {
    if(user && (await bcrypt.compare(password, user.password))){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:generateToken(user._id)
        })
    }
    else{
        res.status(400).send('User not found    ')
    }
   } catch (error) {
    console.log(error)
    res.status(400).send('User not found')
    
   }
}

const getMe = async (req,res) => {
    res.send('user profile from c')
}

const generateToken = (id) => {
   return jwt.sign({id},process.env.SECRET_KEY,{expiresIn:'30d'})
}


module.exports = {userRegister, userLogin,getMe}