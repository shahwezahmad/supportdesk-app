const Note = require('../models/notesModel')
const User = require('../models/userModels')
const Ticket = require('../models/ticketModel')

const getNotes = async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(401)
        throw new Error('user not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id){
        res.status(401)
        throw new Error('ticket not found')
    }

    const notes = await Note.find({ticket:req.params.ticketId})
    console.log(req.params.ticketId)
    console.log(notes)
        res.status(200).json(notes)
    
}

const addNote = async (req,res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.send(400)
        throw new Error('user not found')
    }
    const ticket = await Ticket.findById(req.params.ticketId)
    if(ticket.user.toString() !== req.user.id){
        res.send(401)
        throw new Error('not authorized')
    }

    const note = await Note.create({
        text:req.body.text,
        isStaff:false,
        user:req.user.id,
        ticket:req.params.ticketId
    })
        res.status(200).json(note)
    
}


module.exports  = {getNotes,addNote}