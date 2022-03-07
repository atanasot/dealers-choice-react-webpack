const Sequlize = require('sequelize')
const { STRING } = Sequlize
const sequelize = new Sequlize(process.env.DATABASE_URL || "postgres://localhost/generate_random_db")

// Model
const Num = sequelize.define('number', {
    name: {
        type: STRING
    }
})

Num.generateRandom = function() {
    const random = Math.ceil(Math.random() * 100) //generates a random num between 1 and 100
    const name = `Number ${random}`
    return this.create({name})
}

const syncAndSeed = async() => {
    try {
        await sequelize.sync( {force: true} )
        await Promise.all([Num.generateRandom(), Num.generateRandom(), Num.generateRandom()])
        console.log('connected to db')
    } catch (err) {
        console.log(err)
    }
    
}

module.exports = {
    syncAndSeed,
    Num
}