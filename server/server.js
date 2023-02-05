const express = require('express')
const connectDB = require('../server/db/connect')
const app = express()
PORT = process.env.PORT || 5000


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