const express = require('express')
const {createImage} = require('./controller/tasks')
const connectDB = require('../server/db/connect')
const cors = require('cors')
const app = express()
PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

app.post("/api/v1/post", createImage)


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