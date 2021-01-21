const mongoose = require('mongoose');

// Accessing the Field model
const Field = require('../models/field');


mongoose.connect('mongodb://localhost:27017/find-a-field', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
})

// Info we're putting into our DB
seedFields = [
    {
        title: 'Chinatown Field',
        price: '$60',
        description: 'Full sized soccer field',
        location: 'Downtown Vancouver'
    },
    {
        title: 'UBC Rec',
        price: '$55',
        description: 'Full sized soccer field',
        location: 'UBC'
    },
    {
        title: 'Kits Beach Basketball',
        price: '$25',
        description: 'Basketball court located beside kits beach',
        location: 'Kitsilano Beach'
    },
    {
        title: 'North Van Fields ',
        price: '$50',
        description: 'Full sized soccer field',
        location: 'Lonsdale'
    },
]

// Fix this so that we empty 
// database before inserting: Field.deleteMany({})

Field.insertMany(seedFields)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })