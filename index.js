const express = require('express');
const app = express();
const path = require('path');

const ExpressError = require('./utilities/ExpressError');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req,res) => {
    res.render('home');
})

app.get('/inventory', (req,res) => {
    res.send('Inventory Page');
})

app.get('/add', (req,res) => {
    res.send('Add get');
})

app.post('/add', (req,res) => {
    res.send('Add Post');
})

app.delete('/')

app.all('*', (req, res, next) => {
    next(new ExpressError('Page Not Found', 404))
});


app.listen(3333, ()=> {
console.log ('Serving on Port 3333')
})