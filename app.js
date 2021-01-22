//Requiring express 
//Allows us to build web apps 
const express = require('express');
const app = express();

//The path module provides utilities for working with file and directory paths
const path = require('path');

//Requiring mongoose so we can interact with MongoDB
//using JS 
const mongoose = require('mongoose');

//Requiring our field schema 
const Field = require('./models/field');

//Requiring method-override so that we can PATCH and PUT 
//the info that is inputted into forms
const methodOverride = require('method-override');

//Requiring ejs-mate so that we can use boilerplates and partials 
const ejsMate = require('ejs-mate');

//Requiring joi schemas for Server Side validation 
const { fieldSchema, reviewSchema } = require('./schemas.js')


//Requiring the review model 
const Review = require('./models/review')

// Requiring our catchAsync for error-handling
const catchAsync = require('./utils/catchAsync')

//For errors that we don't throw 
const ExpressError = require('./utils/ExpressError')

//Routes for the field pages 
const fields = require('./routes/fields')

//Routes for the review pages 
const reviews = require('./routes/reviews')

//Conncting to the mongoDB named find-a-field
//27107 is the default port 
mongoose.connect('mongodb://localhost:27017/find-a-field', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


const db = mongoose.connection;
// To log errors to the console
db.on('error', console.error.bind(console, 'connection error:'));
// Callback to be executed when the given event is generated. 
// Function will be called when the connection to mongodb is open
db.once('open', () => {
    console.log('Database connected');
})

// use ejs-locals for all ejs templates
app.engine('ejs', ejsMate)
//'view engine', 'engine' sets the template engine - allows us to not have 
//to require ejs at start of file 
// engines:  https://expressjs.com/en/resources/template-engines.html
app.set('view engine', 'ejs');
//The path.join() method joins all given path segments together
//using the platform-specific separator as a delimiter, 
//then normalizes the resulting path
app.set('views', path.join(__dirname, 'views'))

//Allows us to parse the body
//ex: parsing the info from body of post requests 
app.use(express.urlencoded({ extended: true }))

//'_method' is the query string that we're using 
app.use(methodOverride('_method'))

//Telling express to serve our 'public' directory 
app.use(express.static(path.join(__dirname, 'public')))


//Routes for the fields and reviews pages 
app.use('/fields', fields)
app.use('/fields/:id/reviews', reviews)


//Route to the home page 
app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//For Errors we didn't throw 
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err })
})

// Setting the server we're listening to 
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
