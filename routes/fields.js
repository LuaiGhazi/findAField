const express = require('express')
const router = express.Router()

// Requiring our catchAsync for error-handling
const catchAsync = require('../utils/catchAsync')

//Requiring our field model 
const Field = require('../models/field');


//LogIn Middleware
const { isLoggedIn, isAuthor, validateField } = require('../middleware')

//Route to the fields page
//Pass the fields vble (an object) through the render line
// so that the EJS page has access to that variable
router.get('/', (async (req, res) => {
    const fields = await Field.find({});
    res.render('fields/index', { fields })
}))

//Route to create new field 
router.get('/new', isLoggedIn, (req, res) => {
    res.render('fields/new')
})

router.post('/', isLoggedIn, validateField, catchAsync(async (req, res) => {
    const field = new Field(req.body.field);
    // Storing the id of the user that created the new field 
    field.author = req.user._id;
    await field.save();
    req.flash('success', 'Successfuly made a new field!')
    res.redirect(`/fields/${field._id}`)
}))

//Route to the field specific page 
router.get('/:id', catchAsync(async (req, res) => {
    //Populating reviews and authors because they're in their own collection 
    //and have a one to many relationship with fields 
    //Using a nested populate so that we can populate a review 
    //and then on each review populate the author
    const field = await Field.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
        //and then separately we populate the author of the field  
    }).populate('author');
    //flash message if a person tried to access a specific field page 
    //that doesn't exist / no longer exists
    if (!field) {
        req.flash('error', 'Cannot find that field!');
        return res.redirect('/fields');
    }
    res.render('fields/show', { field })
}))

//Route to edit specific page 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(async (req, res) => {
    const { id } = req.params
    const field = await Field.findById(id);
    if (!field) {
        req.flash('error', 'Cannot find that campground')
        res.redirect(`/fields/${field._id}`)
    }
    res.render('fields/edit', { field })
}))

router.put('/:id', isLoggedIn, isAuthor, validateField, catchAsync(async (req, res) => {
    const { id } = req.params
    const field = await Field.findByIdAndUpdate(id, { ...req.body.field })
    req.flash('success', 'Successfuly updated field!')
    res.redirect(`/fields/${field._id}`)
}))

//Delete a field 
router.delete('/:id', isLoggedIn, catchAsync(async (req, res) => {
    const { id } = req.params;
    await Field.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted field')
    res.redirect('/fields')
}))

module.exports = router; 