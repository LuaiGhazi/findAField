const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require('./review')


//Created this image schema so that we can control the
//size of the images being displayed on our app 
const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const fieldSchema = new Schema({
    title: String,
    images: [ImageSchema],
    geometry: { //docs: https://mongoosejs.com/docs/geojson.html
        type: {
            type: String,
            enum: ['Point'], // 'location.type' must be 'Point'
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    price: Number,
    description: String,
    location: String,
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
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