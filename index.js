const express = require('express');
const mongoose = require('mongoose');
const app = express();
const path = require('path');
const ejsMate = require('ejs-mate'); //extended ejs engine
const methodOverride = require('method-override'); //for usage of patch and delete http verbs

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

const itemRoutes = require('./routes/itemRoutes'); //all item routes

//Routes
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