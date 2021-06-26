const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const ejs = require('ejs');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo')

const connectDB = require('./config/db');


// Load Config
dotenv.config({path: './config/config.env'});

// Passport Config
require('./config/passport')(passport);

// Connect db
connectDB();

const app = express();

// EJS
app.set('view engine','ejs');
app.set('views','./views');

// session Middleware  -> should be above passport middleware
app.use(session({
    secret: 'top secret hai',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({mongoUrl: process.env.MONGO_URI})
}))

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Static folder
app.use(express.static(path.join(__dirname)));

// Routes
app.use('/',require('./routes/index'));
app.use('/auth',require('./routes/auth'));

const port = process.env.PORT || 3000;

app.listen(port, function(err) {
    if (err) {
        console.log("Error in starting the server!!");
    } else {
        console.log(`Server started on port: ${port}`);
    }
})