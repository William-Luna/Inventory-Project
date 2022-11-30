const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const ejsMate = require('ejs-mate'); //extended ejs engine
const session = require('express-session'); //for storing authentication
const passport = require('passport'); //authentication middleware
const LocalStrategy = require('passport-local');
const User = require('./models/user');

const Item = require('./models/item');

const ExpressError = require('./utilities/ExpressError');

connect().catch(err => {
    console.log('MONGO CONNECTION FAILURE');
    console.log(err);
});

async function connect() {
    await mongoose.connect('mongodb://localhost:27017/nvntry');
    console.log("MONGO CONNECTION SUCCESS");
}

app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true })); //parse req.body
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

const sessionConfig = {
    secret: 'changesecretafterdevelopment',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7, //1 week
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}
app.use(session(sessionConfig));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate())); //auth method taken from passport 
passport.serializeUser(User.serializeUser()); //method from passport to store auth session
passport.deserializeUser(User.deserializeUser()); //method from passport to unstore auth session

app.use((req, res, next) => {
    res.locals.currentUser = req.user; //global variable to see if there is a user logged in
    next();
});

const itemRoutes = require('./routes/itemRoutes'); //all item routes
const userRoutes = require('./routes/userRoutes'); //all user routes

//Routes
app.use('/', userRoutes);
app.use('/items', itemRoutes);


app.get('/', (req, res) => {
    res.render('home');
})

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});

app.listen(3333, () => {
    console.log('Serving on Port 3333')
})