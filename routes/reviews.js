const express = require('express')

//Set mergeParams to true here 
//the id is now contained in: 'app.use(id, reviews)' and we need
// to set this to true in order to have access to the id
const router = express.Router({ mergeParams: true })

//Requiring our field schema 
const Field = require('../models/field');

//Requiring the review model 
const Review = require('../models/review')

const catchAsync = require('../utils/catchAsync')

//For errors that we don't throw 
const ExpressError = require('../utils/ExpressError')


//Requiring joi schemas for Server Side validation 
const { reviewSchema } = require('../schemas.js')

//Middleware for server side validation
const validateReview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        const msg = error.details.map(el => el.message).join(',')
        throw new ExpressError(msg, 400)
    } else {
        next();
    }
}

//Posting Reviews
router.post('/', validateReview, catchAsync(async (req, res) => {
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
router.delete('/:reviewId', catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Field.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    res.redirect(`/fields/${id}`);
}))

module.exports = router
