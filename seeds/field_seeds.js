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
        geometry: {
            type: "Point",
            coordinates: [-113.1331, 47.0202]
        },
        price: 60,
        description: 'Full sized soccer field',
        location: 'Downtown Vancouver',
        author: '600e0a773f7a130629f9f2ca',
        images: [{
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/ipdatxcgi0t2sdt6jknk.jpg',
            filename: 'find-a-field/ipdatxcgi0t2sdt6jknk'
        },
        {
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/wesu2g1cfptjkk188rde.jpg',
            filename: 'find-a-field/wesu2g1cfptjkk188rde'
        }]
    },
    {
        title: 'UBC Rec',
        geometry: {
            type: "Point",
            coordinates: [-113.1331, 47.0202]
        },
        price: 55,
        description: 'Full sized soccer field',
        location: 'UBC',
        author: '600e0a773f7a130629f9f2ca',
        images: [{
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/ipdatxcgi0t2sdt6jknk.jpg',
            filename: 'find-a-field/ipdatxcgi0t2sdt6jknk'
        },
        {
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/wesu2g1cfptjkk188rde.jpg',
            filename: 'find-a-field/wesu2g1cfptjkk188rde'
        }]
    },
    {
        title: 'Kits Beach Basketball',
        geometry: {
            type: "Point",
            coordinates: [-113.1331, 47.0202]
        },
        price: 25,
        description: 'Basketball court located beside kits beach',
        location: 'Kitsilano Beach',
        author: '600e0a773f7a130629f9f2ca',
        images: [{
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/ipdatxcgi0t2sdt6jknk.jpg',
            filename: 'find-a-field/ipdatxcgi0t2sdt6jknk'
        },
        {
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/wesu2g1cfptjkk188rde.jpg',
            filename: 'find-a-field/wesu2g1cfptjkk188rde'
        }]
    },
    {
        title: 'North Van Fields ',
        geometry: {
            type: "Point",
            coordinates: [-113.1331, 47.0202]
        },
        price: 50,
        description: 'Full sized soccer field',
        location: 'Lonsdale',
        author: '600e0a773f7a130629f9f2ca',
        images: [{
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/ipdatxcgi0t2sdt6jknk.jpg',
            filename: 'find-a-field/ipdatxcgi0t2sdt6jknk'
        },
        {
            url: 'https://res.cloudinary.com/dho74nw77/image/upload/v1611612816/find-a-field/wesu2g1cfptjkk188rde.jpg',
            filename: 'find-a-field/wesu2g1cfptjkk188rde'
        }]
    }
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