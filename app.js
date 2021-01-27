
// If we're in development require the env package 
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

//Requiring express 
//Allows us to build web apps 
const express = require('express');
const app = express();

//The path module provides utilities for working with file and directory paths
const path = require('path');

//Requiring mongoose so we can interact with MongoDB
//using JS 
const mongoose = require('mongoose');

//Requiring our field schema 
const Field = require('./models/field');

//Requiring method-override so that we can PATCH and PUT 
//the info that is inputted into forms
const methodOverride = require('method-override');

//Requiring ejs-mate so that we can use boilerplates and partials 
const ejsMate = require('ejs-mate');

//Requiring joi schemas for Server Side validation 
const { fieldSchema, reviewSchema } = require('./schemas.js')


//Requiring the review model 
const Review = require('./models/review')

// Requiring our catchAsync for error-handling
const catchAsync = require('./utils/catchAsync')

//For errors that we don't throw 
const ExpressError = require('./utils/ExpressError')


//Requiring session so we can set up our cookies 
const session = require('express-session')

//Requiring flash so that we can flash messages 
const flash = require('connect-flash')

//Requiring passport so that we can do username and passwords 
const passport = require('passport')
const LocalStrategy = require('passport-local')

//Requiring mongo-sanitize and helmet for security  
const mongoSanitize = require('express-mongo-sanitize')
const helmet = require('helmet')

//Requiring the user schema/model 
const User = require('./models/user')

//Routes for the user pages 
const userRoutes = require('./routes/users')

//Routes for the field pages 
const fieldRoutes = require('./routes/fields')

//Routes for the review pages 
const reviewRoutes = require('./routes/reviews')

const MongoDBStore = require('connect-mongo')(session)


//In development conncting to the mongoDB named find-a-field
//27107 is the default port 
const dbUrl = process.env.DB_URL || 'mongodb://localhost:27017/find-a-field'

mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


const db = mongoose.connection;
// To log errors to the console
db.on('error', console.error.bind(console, 'connection error:'));
// Callback to be executed when the given event is generated. 
// Function will be called when the connection to mongodb is open
db.once('open', () => {
    console.log('Database connected');
})

// use ejs-locals for all ejs templates
app.engine('ejs', ejsMate)
//'view engine', 'engine' sets the template engine - allows us to not have 
//to require ejs at start of file 
// engines:  https://expressjs.com/en/resources/template-engines.html
app.set('view engine', 'ejs');
//The path.join() method joins all given path segments together
//using the platform-specific separator as a delimiter, 
//then normalizes the resulting path
app.set('views', path.join(__dirname, 'views'))


//Allows us to parse the body
//ex: parsing the info from body of post requests 
app.use(express.urlencoded({ extended: true }))

//'_method' is the query string that we're using 
app.use(methodOverride('_method'))

//Telling express to serve our 'public' directory 
app.use(express.static(path.join(__dirname, 'public')))

//Basic Mongo Security 
app.use(mongoSanitize())


const secret = process.env.SECRET || 'thisshouldbeabettersecret!'
const store = new MongoDBStore({
    url: dbUrl,
    secret,
    //lazy update
    touchAfter: 24 * 60 * 60
});

store.on('error', function (e) {
    console.log('SESSION STORE ERROR', e)
})

//This muyst go before 
//the route handlers" app.use(routes, filename)
const sessionConfig = {
    store,
    name: 'session',
    secret,
    resave: false,
    saveUninitalized: true,
    //Setting an expiration date for the cook 
    //Date.now() is in millisecond. We set it to expire in a week. 
    cookie: {
        //Why we use http only: https://owasp.org/www-community/HttpOnly
        httpOnly: true,
        // secure: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}


app.use(session(sessionConfig))
app.use(flash());

app.use(helmet())

const scriptSrcUrls = [
    "https://stackpath.bootstrapcdn.com/",
    "https://api.tiles.mapbox.com/",
    "https://api.mapbox.com/",
    "https://kit.fontawesome.com/",
    "https://cdnjs.cloudflare.com/",
    "https://cdn.jsdelivr.net",
    "https://cdn.jsdelivr.net"
];
const styleSrcUrls = [
    "https://kit-free.fontawesome.com/",
    "https://stackpath.bootstrapcdn.com/",
    "https://api.mapbox.com/",
    "https://api.tiles.mapbox.com/",
    "https://fonts.googleapis.com/",
    "https://use.fontawesome.com/",
    'https://cdn.jsdelivr.net'
];
const connectSrcUrls = [
    "https://api.mapbox.com/",
    "https://a.tiles.mapbox.com/",
    "https://b.tiles.mapbox.com/",
    "https://events.mapbox.com/",
    ''
];

const fontSrcUrls = [];
app.use(
    helmet.contentSecurityPolicy({
        directives: {
            defaultSrc: [],
            connectSrc: ["'self'", ...connectSrcUrls],
            scriptSrc: ["'unsafe-inline'", "'self'", ...scriptSrcUrls],
            styleSrc: ["'self'", "'unsafe-inline'", ...styleSrcUrls],
            workerSrc: ["'self'", "blob:"],
            objectSrc: [],
            imgSrc: [
                "'self'",
                "blob:",
                "data:",
                "https://res.cloudinary.com/dho74nw77/", //Cloudinary account details go here 
                "https://images.unsplash.com/",
                'https://source.unsplash.com/'
            ],
            fontSrc: ["'self'", ...fontSrcUrls],
        },
    })
);


//Configuring passport/possport-local
//Middleware is required to initialize Passport. 
// If your application uses persistent login sessions,
// passport.session() middleware must also be used.
//If passport.session() is enabled, be sure to use session() before 
//passport.session() to ensure that the login session is restored in the correct or
// docs: http://www.passportjs.org/docs/configure/
app.use(passport.initialize())
app.use(passport.session())

//Telling passport that we want it to use the LocalStrategy we've downloaded and requried 
//The authentication method for localStrategy is going to be located in our model titled 'User' 
//and it is called 'authenticate'
//We didn't create ths method, its already built-in with passport local mongoose (see docs)
passport.use(new LocalStrategy(User.authenticate()))


//Two methods that are already built in with passport local mongoose 
//How to store and un-store a user in a session 
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


//This middleware comes before the route handlers 
//We'll have access to it in all our templates without 
//having to specifically pass it through
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
})


// app.get('/fakeUser', async (req, res) => {
//     const user = new User({ email: 'luai@mail.com', username: 'luaiiiii' })
//     const newUser = await User.register(user, 'chicken')
//     res.send(newUser)
// })



//The route handlers 
//Routes for the fields and reviews pages 
app.use('/', userRoutes)
app.use('/fields', fieldRoutes)
app.use('/fields/:id/reviews', reviewRoutes)

//Route to the home pagnodee 
app.get('/', (req, res) => {
    res.render('home')
})


app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
})

//For Errors we didn't throw 
app.use((err, req, res, next) => {
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong!'
    res.status(statusCode).render('error', { err })
})

// Setting the server we're listening to 
app.listen(3000, () => {
    console.log('Serving on port 3000')
})
