const mongoose = require('mongoose')

const connectDB = async () => {
    let connect
    try {
       const conn =  await mongoose.connect(process.env.MONGODB_URI)
        console.log((await conn).connection.host)
        
    } catch (error) {
        console.log(error)
        // throw new Error('Not able to connect to DB')
        process.exit(1)
    }

}

module.exports = {connectDB}