// Require express.
const express = require('express');
const port = 5000;
const app = express();

const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const db = require('./config/mongoose');

// Require connect-flash.
const flash = require('connect-flash');
const flashMiddleware = require('./config/flashMiddleware');

// Used for session cookies.
const session = require("express-session");
const passport = require('passport');
const passportLocal = require('./config/passport_local');

const MongoStore = require('connect-mongo');



// Layouts for ejs.
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended:false}));

// Set up the view engine.
app.set('view engine', 'ejs');
app.set('views', './views');
app.use(express.static('./assets')); 

// Mongo store is used to store the session cookie.
app.use(session({
    name: 'habitTracker',
    secret: "lG65CG9VpGeAp4Dz",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: MongoStore.create(
        {
            mongoUrl:'mongodb+srv://deepeshb24:lG65CG9VpGeAp4Dz@habittracker.lptlutl.mongodb.net/?retryWrites=true&w=majority&appName=habitTracker',
            autoRemover : 'disabled'
        },
        function(err){
            console.log("Error in the mongo-store!");
        }
    ),
}));


// Using passport
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

// Flash middleware
app.use(flash());
app.use(flashMiddleware.setFlash);

// Use express router.
app.use('/', require('./routes'));

// Directing the app in the given port.
app.listen(port, function(err) {
    if(err) {
        console.log('Error', err);
        return;
    }
    console.log('Server is running on port: ', port);

});