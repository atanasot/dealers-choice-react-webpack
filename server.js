const express = require('express')
const app = express()
const path = require('path')
const { syncAndSeed } = require("./db")

app.use('/dist', express.static(path.join(__dirname, 'dist'))) //getting the main.js that loads the script in the html

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))) //getting the html file

const port = process.env.PORT || 3000

const start = async() => {
    try {
        syncAndSeed()
        app.listen(port, ()=> console.log(`listening on port ${port}`))
    }
    catch (err) {
        console.log(err)
    }
    
}

start()
