//Requiring joi for Server Side validation 
const Joi = require('joi');

module.exports.fieldSchema = Joi.object({
    //Setting the server side requirements for any POST 
    //field has to be an object 
    field: Joi.object({
        // contains the key title and it is a string and is required
        title: Joi.string().required(),
        // contains the key price and it is a number and is required
        price: Joi.number().required().min(0),
        // image: Joi.string().required(),
        // image: Joi.string().required(),
        location: Joi.string().required(),
        description: Joi.string().required()
    }).required()
    // deleteImages: Joi.array()
});

module.exports.reviewSchema = Joi.object({
    review: Joi.object({
        rating: Joi.number().required().min(1).max(5),
        body: Joi.string().required()
    }).required()
})