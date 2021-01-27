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
            coordinates: [-123.1056424085242, 49.279598713222576]
        },
        price: 60,
        description: 'Full sized soccer field',
        location: 'Vancouver, BC',
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
        title: 'Ken Woods Field',
        geometry: {
            type: "Point",
            coordinates: [-123.24323178516185, 49.25839300995826]
        },
        price: 55,
        description: 'Full sized soccer field',
        location: 'Vancouver, BC',
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
        title: 'Warren Field',
        geometry: {
            type: "Point",
            coordinates: [-123.24245340178263, 49.25732410168523]
        },
        price: 25,
        description: 'Basketball court located beside kits beach',
        location: 'Vancouver, BC',
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
        title: 'Confederation Artificial Turf',
        geometry: {
            type: "Point",
            coordinates: [-123.08164338826114, 49.329613804300685]
        },
        price: 55,
        description: 'Full sized soccer field',
        location: 'North Vancouver, BC',
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
        title: 'Sunnybrook Park Sports Fields',
        geometry: {
            type: "Point",
            coordinates: [-79.35427547049723, 43.731565237595866]
        },
        price: 50,
        description: 'Full sized soccer field',
        location: 'Toronto, ON',
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
        title: 'Trillium Turf',
        geometry: {
            type: "Point",
            coordinates: [-123.09400677741513, 49.27459488484335]
        },
        price: 60,
        description: 'A turf field with bathrooms and a small playground',
        location: 'Vancouver, BC',
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
        title: 'Empire Field',
        geometry: {
            type: "Point",
            coordinates: [-123.03321360061757, 49.28331886232461]
        },
        price: 75,
        description: 'Soccer field in Hastings Park.',
        location: 'Vancouver, BC',
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
        title: 'South Memorial Turf',
        geometry: {
            type: "Point",
            coordinates: [-123.08711933129996, 49.23077038955458]
        },
        price: 40,
        description: 'Soccer field in Hastings Park.',
        location: 'Vancouver, BC',
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
        title: 'Hillcrest Mini Turf Field',
        geometry: {
            type: "Point",
            coordinates: [-123.1099588239115, 49.2453283229245]
        },
        price: 35,
        description: 'Small turf soccer field with free parking.',
        location: 'Vancouver, BC',
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
        title: 'Confederation Park Soccer Field',
        geometry: {
            type: "Point",
            coordinates: [-122.99989608527636, 49.28377326097194]
        },
        price: 85,
        description: 'Natural grass field with running track',
        location: 'Vancouver, BC',
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
        title: 'Heywood Field',
        geometry: {
            type: "Point",
            coordinates: [-123.09898287732359, 49.33026896907255]
        },
        price: 85,
        description: 'Large grass field in Murdo Frazer Park',
        location: 'North Vancouver, BC',
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
        title: 'Calgary Soccer Centre',
        geometry: {
            type: "Point",
            coordinates: [-113.96459771481872, 51.01139944528411]
        },
        price: 85,
        description: 'Over 20 Indoor and outdoor soccer fields for all ages',
        location: 'Calgary, AB',
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
        title: 'Frank McCool Athletic Park',
        geometry: {
            type: "Point",
            coordinates: [-114.04836846086262, 50.96039379283306]
        },
        price: 40,
        description: 'Soccer fields with several bleachers.',
        location: 'Calgary, AB',
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
        title: 'VIVO Soccer Fields',
        geometry: {
            type: "Point",
            coordinates: [-114.06434071081887, 51.17818573315342]
        },
        price: 20,
        description: 'Poorly maintained field, but still fun for the little ones',
        location: 'Calgary, AB',
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
        title: 'Shouldice Athletic Park',
        geometry: {
            type: "Point",
            coordinates: [-114.16566226470465, 51.08680214198414]
        },
        price: 45,
        description: 'This is a great facility for all sorts of sports. Football, soccer and baseball. Several fields and diamonds. Lots of parking.',
        location: 'Calgary, AB',
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
        title: 'Forest Lawn Athletic Park',
        geometry: {
            type: "Point",
            coordinates: [-113.94729381965571, 51.06326825354977]
        },
        price: 45,
        description: 'Good fields, but difficult to access',
        location: 'Calgary, AB',
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
        title: 'Cedarvale Park Sport Field',
        geometry: {
            type: "Point",
            coordinates: [-79.43427890777865, 43.7111336678769]
        },
        price: 50,
        description: 'It has everything tennis courts, baseball diamond, soccer fields, cricket field and a dog park.',
        location: 'Toronto, ON',
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
        title: 'Flemingdon Park Soccer field',
        geometry: {
            type: "Point",
            coordinates: [-79.33337990690114, 43.72392943832045]
        },
        price: 60,
        description: 'Very large natural grass field.',
        location: 'Toronto, ON',
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
        title: 'Toronto Soccerplex',
        geometry: {
            type: "Point",
            coordinates: [-79.32042376021359, 43.748071590179606,]
        },
        price: 60,
        description: 'Very good place for soccer. I and my mates come here almost every week. Parking lot is enough, the soccer field is clean.',
        location: 'Toronto, ON',
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