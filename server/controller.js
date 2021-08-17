const houses = require('./db.json');

let globalID = 4

module.exports = {
    getHouse: (req, res) => {
        res.status(200).send(houses)
    },
    createHouse: (req, res) => {
        let {address, price, imageURL} = req.body
        let newHouse = {
            id: globalID,
            address,
            price: +price,
            imageURL
        }
        houses.push(newHouse)
        res.status(200).send(houses)
        globalID++
    },
    updateHouse: (req, res) => {
        let {id} = req.params
        let {type} = req.body
        let index = houses.findIndex(elem => elem.id === +id)

        if (houses[index].price === 5000000 && type === 'plus'){
            res.status(400).send('Your house cannot exceed 5 million dollars.')
        }else if (houses[index].price === 0 && type === 'minus'){
            res.status(400).send('Your house cannot go below 0 dollars.')
        }else if (type === 'plus') {
            houses[index].price += 10000
            res.status(200).send(houses)
        }else if (type === 'minus') {
            houses[index].price -= 10000
            res.status(200).send(houses)
        }else {
            res.status(500).send('Something went wrong entirely LOL')
        }
    },
    deleteHouse: (req, res) => {
        let index = houses.findIndex(elem => elem.id === +req.params.id)
        houses.splice(index, 1)
        res.status(200).send(houses)
    }



}