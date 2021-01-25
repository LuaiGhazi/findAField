const express = require('express')

//Set mergeParams to true here 
//the id is now contained in: 'app.use(id, reviews)' and we need
// to set this to true in order to have access to the id
const router = express.Router({ mergeParams: true })

const catchAsync = require('../utils/catchAsync')

const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')

const reviews = require('../controllers/reviews')

//Posting Reviews
router.post('/', isLoggedIn, validateReview, catchAsync(reviews.createReview))

//Deleting Reviews 
router.delete('/:reviewId', isLoggedIn, isReviewAuthor, catchAsync(reviews.deleteReview))

module.exports = router
