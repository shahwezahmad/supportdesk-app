
const User = require('../models/userModels')
const Ticket = require('../models/ticketModel')

const getTickets = async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400).send('no user')
    }

        const tickets = await Ticket.find({user:req.user.id})
        res.status(200).json(tickets)
    
}

const getTicket = async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400).send('no user found')
        return
    }

    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400).send('Not found')
        return;
    }
    if(ticket.user.toString() !== req.user.id ){
        res.status(404).send('Not authorized')
        return
    }
    res.status(200).send(ticket)
}

const createTicket = async (req, res) => {
    const {product, description} = req.body

    if(!product || !description) {
        res.status(400).send('fill all fields')
        return
    }

    const user = await User.findById(req.user.id)
    if(!user){
        res.status(400).send('no user')
        return
    }

    const ticket = await Ticket.create({
        product,
        description,
        status:'new',
        user:req.user.id
    })

    res.status(201).json(ticket)

}

const deleteTicket = async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user) {
        res.send(400).send("not found")
        return
    }
 const ticket = await Ticket.findById(req.params.id)
 if(!ticket){
    res.status(400).send('Not found')
    return
 }
if(ticket.user.toString() !== req.user.id){
    res.status(400).send('Not authorized')
    return
}
   await ticket.remove()
    res.status(200).json({success:true})
}
const updateTicket = async (req, res) => {
    const user = await User.findById(req.user.id)
    if(!user){
        req.status(400).send('No user')
        return
    }
    const ticket = await Ticket.findById(req.params.id)
    if(!ticket){
        res.status(400).send('no ticket')
        return
    }
    if(ticket.user.toString() !== req.user.id){
        console.log(ticket.user.toString())
        console.log(req.user.id)
        res.status(401).send('not authorized')
        return
    }

     const updatedTicket =  await  Ticket.findByIdAndUpdate(req.params.id,req.body,{new:true})
     res.status(200).json(updatedTicket)

}
module.exports = {
    getTickets,
    createTicket,
    getTicket,
    deleteTicket,
    updateTicket
}