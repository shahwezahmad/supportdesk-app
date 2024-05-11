const mongoose = require('mongoose')

const userSchema =  mongoose.Schema({
    name:{
        type:String,
        required:[true,'enter your name']
    },
    email:{
        type:String,
        required:[true,'enter your email'],
        unique:true
    },
    password:{
        type:String,
        required:[true,'enter your password']
    },
    isAdmin:{
        type:Boolean,
        default:false,
        required:true
    },

}, {timestamps:true})


module.exports = mongoose.model('User', userSchema)