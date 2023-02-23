require('dotenv').config()
const express = require('express')
const {createImage, shareImage, getImage, signUp, login} = require('../functions/controller/tasks')
const serverless = require('serverless-http')
const dbConfig = require("../functions/db/connect");
const cors = require('cors')
const app = express()

app.use(cors())


PORT = process.env.PORT || 5000
const BASE_URL = require("../config/index")

app.use(express.json({limit: '50mb'}));

app.listen(PORT, ()=>{
    console.log("server is listning...")
})

app.post(`${BASE_URL}/signup`, signUp)
app.post(`${BASE_URL}/login`, login)
app.post(`${BASE_URL}/post`, createImage)
app.post(`${BASE_URL}/share`, shareImage)
app.get(`${BASE_URL}/get`, getImage)
app.get(`${BASE_URL}/`, (req, res) => {
    res.send("Server is Running...")
})

const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
