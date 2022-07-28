// seed js is going to be the file we run whenever we want to seed our database
// we'll create a bunch of pets at once!

// we're changing it so that it will only delete pets without an owner!

const mongoose = require('mongoose')
const Pet = require('./pet')
const db = require('../../config/db')

const startPets = [
    { name: 'Sparky', type: 'dog', age: 2, adoptable: true},
    { name: 'Leroy', type: 'dog', age: 10, adoptable: true},
    { name: 'Biscuits', type: 'cat', age: 3, adoptable: true},
    { name: 'Hulk Hogan', type: 'hamster', age: 1, adoptable: true}
]

// first, we need to connect to the database
mongoose.connect(db, {
    useNewUrlParser: true
})
    .then(() => {
        // first we remove all of the pets
        // here we can add something to make sure that we only delete pets without an owner
        Pet.deleteMany( {owner: null} )
            .then(deletedPets => {
                console.log('Here are the deleted pets: \n', deletedPets);
                // the next step is to use our startPets array to create our seeded pets
                Pet.create(startPets)
                    .then(newPets => {
                        console.log('Here are the new pets: \n', newPets);
                        mongoose.connection.close();
                    })
                    .catch(error => {
                        console.log(error);
                        mongoose.connection.close();
                    })
            })
            .catch(error => {
                console.log(error);
                mongoose.connection.close();
            })
    })
    .catch(error => {
        console.log(error);
        mongoose.connection.close();
    })