// const mongoose = require('mongoose')
// require('dotenv').config()

// const conncetionString = process.env.MONGODB_URL

// const ConnectDB = async () => {
//     mongoose.set('strictQuery', true)

//     await mongoose.connect(conncetionString)
//     .then(()=>console.log("Connected.."))
//     .catch((error)=>console.log(error))
// }

// module.exports = ConnectDB

const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

var mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL, { useNewUrlParser: true, useUnifiedTopology: true });

var connection = mongoose.connection;

connection.on("error", console.error.bind(console, "connection error:"));

connection.on("connected", () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;