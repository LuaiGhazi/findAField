const passport = require('passport');
const catchAsync = require('../utils/catchAsync');
// const users = require('../controllers/users')

const express = require('express');
const router = express.Router();
const User = require('../models/user');


// Register Page 

router.get('/register', (req, res) => {
    res.render('users/register');
});


router.post('/register', catchAsync(async (req, res, next) => {
    try {
        //Destructuring what we want from req.bdoy
        const { email, username, password } = req.body;
        //Pass e-mail and username into a new object called user 
        const user = new User({ email, username });
        //Call user.register to take the new user and 
        //store the hashed password and the salt 
        //on the new user 
        const registeredUser = await User.register(user, password);
        //To login the 'registeredUser' automaticaly
        //after they register
        //Docs: http://www.passportjs.org/docs/login/
        req.login(registeredUser, err => {
            if (err) return next(err);
            req.flash('success', 'Welcome to Find a Field!');
            res.redirect('/fields');
        })
    } catch (e) {
        //If there is an error (such as username is taken)
        //then flash the error message
        req.flash('error', e.message);
        //Redirect us back to the register page
        res.redirect('register');
    }
}));


//login page 
router.get('/login', (req, res) => {
    res.render('users/login');
})

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