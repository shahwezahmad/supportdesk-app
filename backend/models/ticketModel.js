const mongoose = require('mongoose')

const ticketSchema = mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    product:{
        type:String,
        required:[true,'select any product'],
        enum:['iPhone','iMac','Macbook','iPad']
    },
    description:{
        type:String,
        required:[true,'Enter a description'],
    },
    status:{
        type:String,
        required:[true,'select status of ticket'],
        enum:['open','closed','new'],
        default:'new'
    }

},{timestamps:true})

module.exports = mongoose.model('Ticket',ticketSchema)