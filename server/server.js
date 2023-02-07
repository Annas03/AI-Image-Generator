const express = require('express')
const {createImage, shareImage, getImage, downloadImage} = require('./controller/tasks')
const connectDB = require('../server/db/connect')
const cors = require('cors')
const app = express()
PORT = process.env.PORT || 5000

app.use(express.json({limit: '50mb'}));
app.use(cors())

app.post("/api/v1/post", createImage)
app.post("/api/v1/share", shareImage)
app.get("/api/v1/get", getImage)
app.post("/api/v1/download", downloadImage)

const start = async () => {
    try {
        await connectDB()
        app.listen(PORT, ()=>{
            console.log("server is listning...")
        })
    } catch (error) {
        console.log("Error in Connecting to DB")
    }
}

start()