const cors = require("cors");
const path = require('path')
const express = require('express')
const {connectDB} = require('./config/db')
const dotenv = require('dotenv').config()
const {errorHandler} = require('./middleware/errorMiddleware')
const app = express()
const PORT = process.env.PUBLIC_DOMAIN || 8000

app.use(express.json())
app.use(express.urlencoded({extended:true}))


 connectDB()
console.log(PORT)

app.use('/api/users',  require('./routes/userRoutes'))
app.use('/api/tickets',require('./routes/ticketRoutes'))
app.use('/api/ticket/notes', require('./routes/noteRoutes'))
if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname,'../frontend/build')))
    app.get('*', (req, res)=> res.sendFile(__dirname, '../', 'frontend','build','index.html'))
}else {
    app.get('/',(req,res)=> res.status(200).send('Welcome to support desk'))
}
app.use(cors({
    origin:"https://supportdesk-app-c1ny.onrender.com",
    methods:["GET","POST","PUT","DELETE"]
}));
app.use(errorHandler)


app.listen(PORT,()=>{console.log('Hello guys');})