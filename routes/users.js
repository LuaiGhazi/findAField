const express = require('express');
const router = express.Router();
const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
const User = require('../models/user');
const users = require('../controllers/users')


router.route('/register')
    .get(users.renderRegister)
    .post(catchAsync(users.register));

router.route('/login')
    .get(users.renderLogin)
    .post(passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), users.login)

router.get('/logout', users.logout)

module.exports = router;


//We can use the passport.authenticate method. We're telling it to authenticate using the local strategy 
//Flashes a failure message if there's a failure and redirects back to the login page if there is a failure
router.post('/login', passport.authenticate('local', { failureFlash: true, failureRedirect: '/login' }), (req, res) => {
    req.flash('success', 'Welcome back!');
    //if they hit a page that requires an account
    //while they are not logged in we'll store the 
    //url they tried to access otherwise we'll direct
    //them to the '/fields' page if they were just trying to 
    //log in  
    const redirectUrl = req.session.returnTo || '/fields';
    //We don't want to hold on to this variable 
    //so we delete it once we're done using it
    delete req.session.returnTo;
    res.redirect(redirectUrl);
})

router.get('/logout', (req, res) => {
    //Calling req.logout will log the user out! 
    req.logout();
    req.flash('success', "Goodbye!");
    res.redirect('/fields');
})

module.exports = router;