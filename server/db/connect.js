const mongoose = require('mongoose')
require('dotenv').config()

const conncetionString = process.env.MONGODB_URL

const ConnectDB = async () => {
    mongoose.set('strictQuery', true)

    await mongoose.connect(conncetionString)
    .then(()=>console.log("Connected.."))
    .catch((error)=>console.log(error))
}

module.exports = ConnectDB