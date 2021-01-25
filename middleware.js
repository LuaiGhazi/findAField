const ExpressError = require('./utils/ExpressError');
const Field = require('./models/field');
const Review = require('./models/review');

//Requiring joi schema for Server Side validation 
const { fieldSchema, reviewSchema } = require('./schemas.js');


module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        //Storing the path the user tried to access while logged out 
        //so that we can redirect back to it once they log in
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first');
        return res.redirect('/login');
    }
    next();
}

//Middleware for server side validation
module.exports.validateField = (req, res, next) => {
    const { error } = fieldSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

module.exports.isAuthor = async (req, res, next) => {
    const { id } = req.params
    const field = await Field.findById(id);
    if (!field.author.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that')
        return res.redirect(`/fields/${field._id}`)
    }
    next()
}

//Middleware for server side validation
module.exports.isReviewAuthor = async (req, res, next) => {
    const { id, reviewId } = req.params;
    const review = await Review.findById(reviewId);
    if (!review.author.equals(req.user._id)) {
        req.flash('error', 'You do not have access')
        return res.redirect(`/fields/${id}`)
    }
    next();
}

module.exports.validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body)
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

