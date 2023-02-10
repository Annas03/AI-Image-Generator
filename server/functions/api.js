const express = require('express')
const {createImage, shareImage, getImage} = require('../functions/controller/tasks')
const serverless = require('serverless-http')
const dbConfig = require("../functions/db/connect");
const cors = require('cors')
const app = express()
PORT = process.env.PORT || 5000

app.use(express.json({limit: '50mb'}));
app.use(cors())

app.listen(PORT, ()=>{
    console.log("server is listning...")
})

app.post("/.netlify/functions/api/post", createImage)
app.post("/.netlify/functions/api/share", shareImage)
app.get("/.netlify/functions/api/get", getImage)
app.get("/.netlify/functions/api/", (req, res) => {
    res.send("Server is Running...")
})


// const start = async () => {
//     try {
//         await connectDB()
//         app.listen(PORT, ()=>{
//             console.log("server is listning...")
//         })
//     } catch (error) {
//         console.log("Error in Connecting to DB")
//     }
// }

// start()
const handler = serverless(app);
module.exports.handler = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
