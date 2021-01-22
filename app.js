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

//Conncting to the mongoDB named find-a-field
//27107 is the default port 
mongoose.connect('mongodb://localhost:27017/find-a-field', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
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

//Middleware for server side validation
const validateField = (req, res, next) => {
    const { error } = fieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}


const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}



//Route to the home page 
app.get('/', (req, res) => {
    res.render('home')
})

//Route to the fields page
//Pass the fields vble (an object) through the render line
// so that the EJS page has access to that variable
app.get('/fields', catchAsync(async (req, res) => {
    const fields = await Field.find({});
    res.render('fields/index', { fields })
}))

//Route to create new field 
app.get('/fields/new', catchAsync(async (req, res) => {
    const field = await Field.findById(req.params.id);
    res.render('fields/new', { field })
}))

app.post('/fields', validateField, catchAsync(async (req, res) => {
    const field = new Field(req.body.field);
    await field.save();
    res.redirect(`/fields/${field._id}`)
}))

//Route to the field specific page 
app.get('/fields/:id', catchAsync(async (req, res) => {
    //Populating reviews because they're in their own collection 
    //and have a one to many relationship
    const field = await Field.findById(req.params.id).populate('reviews');
    res.render('fields/show', { field })
}))

//Route to edit specific page 
app.get('/fields/:id/edit', catchAsync(async (req, res) => {
    const field = await Field.findById(req.params.id);
    res.render('fields/edit', { field })
}))

app.put('/fields/:id/', validateField, catchAsync(async (req, res) => {
    const { id } = req.params
    const field = await Field.findByIdAndUpdate(id, { ...req.body.field })
    res.redirect(`/fields/${field._id}`)
}))

//Delete a field 
app.delete('/fields/:id/', catchAsync(async (req, res) => {
    const { id } = req.params;
    await Field.findByIdAndDelete(id);
    res.redirect('/fields')
}))

//Posting Reviews
app.post('/fields/:id/reviews', validateReview, catchAsync(async (req, res) => {
    // res.send('You made it')
    const field = await Field.findById(req.params.id);
    const review = new Review(req.body.review);
    //Reviews in the field schema are an array
    //so we just push into it 
    field.reviews.push(review);
    await review.save();
    await field.save();
    res.redirect(`/fields/${field._id}`)
}))

//Deleting Reviews 
app.delete('/fields/:id/reviews/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Field.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/fields/${id}`);
}))



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
