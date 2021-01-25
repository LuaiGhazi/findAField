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


const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')


//Posting Reviews
router.post('/', isLoggedIn, validateReview, catchAsync(async (req, res) => {
    // res.send('You made it')
    const field = await Field.findById(req.params.id);
    const review = new Review(req.body.review);
    //Associating a review with the author of the review
    review.author = req.user._id
    //Reviews in the field schema are an array
    //so we just push into it 
    field.reviews.push(review);
    await review.save();
    await field.save();
    req.flash('success', 'Thank you for your feedback!')
    res.redirect(`/fields/${field._id}`)
}))

//Deleting Reviews 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(async (req, res) => {
    const { id, reviewId } = req.params;
    await Field.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/fields/${id}`);
}))

module.exports = router
