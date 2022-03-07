
const chai = require('chai')
const expect = chai.expect
// within describe blocks we put our tests
//mocha doest have expectations thats why we use chai
describe('the sky', () => {
    it('is blue', () => {
        const sky = 'blue'
        expect(sky).to.equal('blue')
    })
})

describe('Number', ()=> {
    describe('generateRandom', () => {
        it('generates a random number', () => {

        })
    })
})