const express = require('express')
const app = express()
const path = require('path')
const { syncAndSeed, models: {Num} } = require("./db")

app.use('/dist', express.static(path.join(__dirname, 'dist'))) //getting the main.js that loads the script in the html

app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html'))) //getting the html file

app.get('/api/numbers' , async(req, res, next) => {
    try {
        res.send(await Num.findAll())
    } catch (err) {
        next(err)
    }
    
}) 

app.post('/api/numbers', async(req, res, next) => {
    try {
        const newNumber = await Num.generateRandom()
        res.sendStatus(201)
    } catch (err) {
        next(err)
    }
})

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
