//Requiring express 
const express = require('express');
const app = express();
//The path module provides utilities for working with file and directory paths
const path = require('path');

//Requiring mongoose 
const mongoose = require('mongoose');

//Requiring our schema 
const Field = require('./models/field');



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


//'view engine', 'engine' sets the template engine - allows us to not require ejs 
// engines:  https://expressjs.com/en/resources/template-engines.html
app.set('view engine', 'ejs');
//The path.join() method joins all given path segments together
//using the platform-specific separator as a delimiter, 
//then normalizes the resulting path
app.set('views', path.join(__dirname, 'views'))


//Route to the home page 
app.get('/', (req, res) => {
    res.render('home')
})

//Route to the fields page
//Pass the fields vble (an object) through the render line
// so that the EJS page has access to that variable
app.get('/fields', async (req, res) => {
    const fields = await Field.find({})
    res.render('fields/index', { fields })
})

//Route to the field specific page 
app.get('/fields/:id', async (req, res) => {
    const field = await Field.findById(req.params.id)
    res.render('fields/show', { field })
})


// Setting the server we're listening to 
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
