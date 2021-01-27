//Requiring our field model 
const Field = require('../models/field');

// Requiring it so that we can delete images from cloudinary
const { cloudinary } = require('../cloudinary')

// Requiring mapbox 
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding")
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken })

//Pass the fields vble (an object) through the render line
// so that the EJS page has access to that variable
module.exports.index = async (req, res) => {
    const fields = await Field.find({});
    res.render('fields/index', { fields })
}


module.exports.renderNewForm = (req, res) => {
    res.render('fields/new')
}

module.exports.createField = async (req, res) => {
    const geoData = await geocoder.forwardGeocode({
        query: req.body.field.location,
        limit: 1
    }).send()
    const field = new Field(req.body.field);
    //after we create the field we're adding the geoData to it
    field.geometry = geoData.body.features[0].geometry;
    //mapping over the array that can now be accessed through req.files due to multzer 
    //and take the path and filename
    //We then add the info to field.images
    field.images = req.files.map(f => ({ url: f.path, filename: f.filename }))
    // Storing the id of the user that created the new field 
    field.author = req.user._id;
    await field.save();
    console.log(field)
    req.flash('success', 'Successfuly made a new field!')
    res.redirect(`/fields/${field._id}`)
}

module.exports.showField = async (req, res) => {
    //Populating reviews and authors because they're in their own collection 
    //and have a one to many relationship with fields 
    //Using a nested populate so that we can populate a review 
    //and then on each review populate the author
    const field = await Field.findById(req.params.id).populate({
        path: 'reviews',
        populate: {
            path: 'author'
        }
        //and then separately we populate the author of the field  
    }).populate('author');
    //flash message if a person tried to access a specific field page 
    //that doesn't exist / no longer exists
    if (!field) {
        req.flash('error', 'Cannot find that field!');
        return res.redirect('/fields');
    }
    res.render('fields/show', { field })
}

module.exports.renderEditForm = async (req, res) => {
    const { id } = req.params
    const field = await Field.findById(id);
    if (!field) {
        req.flash('error', 'Cannot find that field')
        res.redirect(`/fields/${field._id}`)
    }
    res.render('fields/edit', { field })
}

module.exports.updateField = async (req, res) => {
    const { id } = req.params
    const field = await Field.findByIdAndUpdate(id, { ...req.body.field })
    //mapping over the array that can now be accessed through req.files due to multzer 
    //and take the path and filename
    //We then push the info to field.images
    // Spread will pass the imgs in as separate arguments into the array
    const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    field.images.push(...imgs);
    await field.save();
    if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await field.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
    req.flash('success', 'Successfuly updated field!')
    res.redirect(`/fields/${field._id}`)
}

module.exports.deleteField = async (req, res) => {
    const { id } = req.params;
    await Field.findByIdAndDelete(id);
    req.flash('success', 'Successfully deleted field')
    res.redirect('/fields')
}