//Requiring our field model 
const Field = require('../models/field');

//Requiring our reviews model 
const Review = require('../models/review');

module.exports.createReview = async (req, res) => {
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
}

module.exports.deleteReview = async (req, res) => {
    const { id, reviewId } = req.params;
    await Field.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
    await Review.findByIdAndDelete(reviewId);
    req.flash('success', 'Successfully deleted review')
    res.redirect(`/fields/${id}`);
}

