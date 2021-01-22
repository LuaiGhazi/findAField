const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')


const fieldSchema = new Schema({
    title: String,
    image: String,
    price: Number,
    description: String,
    location: String,
    //One to many relationship between field and review 
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

//When a field is deleted, we want all the reviews associated with it
//to be deleted as well 
//Only runs when we use the findByIdAndDelete(id) 
//In the delete block of code for reviews, if you change it to remove
//this block of code will NOT run 
fieldSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports = mongoose.model('Field', fieldSchema)