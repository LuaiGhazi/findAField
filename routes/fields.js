const express = require('express')
const router = express.Router()
//Requiring our controllers file 
//that contains part of our routes 
const fields = require('../controllers/fields')
// Requiring our catchAsync for error-handling
const catchAsync = require('../utils/catchAsync')

//Requiring our field model 
const Field = require('../models/field');

//Multer adds a body object and a file or files object to the request object. 
//The body object contains the values of the text fields of the form, the 
//file or files object contains the files uploaded via the form.
const multer = require('multer')
const { storage } = require('../cloudinary')
const upload = multer({ storage })

//LogIn Middleware
const { isLoggedIn, isAuthor, validateField } = require('../middleware')

//Route to the all fields page
router.route('/')
    .get(catchAsync(fields.index))
    .post(isLoggedIn, upload.array('image'), validateField, catchAsync(fields.createField))

//Route to create new field 
router.get('/new', isLoggedIn, fields.renderNewForm)

router.route('/:id')
    //route to the fields specific page
    .get(catchAsync(fields.showField))
    //update field route
    .put(isLoggedIn, isAuthor, validateField, catchAsync(fields.updateField))
    //delete field route
    .delete(isLoggedIn, catchAsync(fields.deleteField))


//Route to edit specific page 
router.get('/:id/edit', isLoggedIn, isAuthor, catchAsync(fields.renderEditForm))



module.exports = router; 