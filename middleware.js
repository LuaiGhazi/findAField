module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //Storing the path the user  tried to access while logged out 
        //so that we can redirect back to it once they log in
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}