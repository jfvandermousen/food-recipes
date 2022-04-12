const express = require('express');
const { use } = require('express/lib/application');
const { render } = require('express/lib/response');
const mongoose = require('mongoose');
const morgan = require('morgan');

const recipeRoutes = require('./routes/recipeRoutes');

require('dotenv').config();

const app = express();
const port = 5000

//Mongo DB connection

const dbURI = `mongodb+srv://jf:${process.env.MONGO_DB_PASSWORD}@recipes.dujns.mongodb.net/recipesblog?retryWrites=true&w=majority`;

 mongoose.connect(dbURI)
 .then(() => app.listen(port), console.log('Connected'))
  .catch(error => console.log(error));

// register view engines

app.set('view engine', 'ejs');

// Middleware

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}));
app.use(morgan('dev'));

app.use(recipeRoutes);

app.get('/', (req, res) => {
  res.redirect('/recipes');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
  })


/*app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact'});
})
*/
//404 page
app.use((req,res)=> {
    res.status(404).render('404', { title: '404'});
});