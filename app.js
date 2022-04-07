const express = require('express');
const { use } = require('express/lib/application');
const mongoose = require('mongoose');
const morgan = require('morgan');
require('dotenv').config();
const Recipe = require('./models/recipe');

const app = express();
const port = 5000

//Mongo DB connection

const dbURI = `mongodb+srv://jf:${process.env.MONGO_DB_PASSWORD}@recipes.dujns.mongodb.net/recipesblog?retryWrites=true&w=majority`;

 mongoose.connect(dbURI)
 .then(() => app.listen(port), console.log('Connected'))
  .catch(error => console.log(error));

// register view engines

app.set('view engine', 'ejs');



app.use(express.static('public'))
app.use(morgan('dev'));

app.get('/add-recipe',(req,res) => {
  const recipe = new Recipe({
    title:'Pastilla',
    srcImg :'/images/potage_aux_nouilles_et_legumes_.jpg',
    cooker:'Marina',
    time:45,
    difficulty: 'Medium',
    tags: 'latest',
    description: 'Boil 1/2Liter of water, put the noodles 3minutes....'
  });
  recipe.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });
})


const latestRecipes = [
     {id: 1,title:'Vegetables Noodle soup', srcImg:"/images/potage_aux_nouilles_et_legumes_.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
      {id: 2,title:'Pastilla', srcImg:"/images/pastilla.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
      {id: 3,title:'Tajine', srcImg:"/images/tajine.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
]

const popularRecipes =[
    {id: 3,title:"noodles_soup.png",srcImg:"/images/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 6,title:'Wok', srcImg:"/images/wok_paprika.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
]


const recipes = latestRecipes.concat(popularRecipes);


app.get('/', (req, res) => {

  res.render('index', { title: 'Home',latestRecipes,popularRecipes});
});


app.get('/all-recipes', (req, res) => {

  Recipe.find()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  });
});
app.get('/single-recipe', (req, res) => {

  Recipe.findById('624ef580024456634175d0b6')
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err)
  });
});



// single recipe
app.get('/recipe/:id', (req, res) => {
    // find the recipe in the `recipes` array
    const recipe = recipes.filter((recipe) => {
      return recipe.id == req.params.id
    })[0]
    // render the `recipe` template with the post content
    res.render('recipe', {
        title: recipe.title,
        recipe
    })
  })

app.get('/about', (req, res) => {
    res.render('about', { title: 'About'});
  })

app.get('/recipes/create', (req, res) => {
    res.render('create', { title: 'Create'});
  })

app.get('/contact', (req, res) => {
    res.render('contact', { title: 'Contact'});
})

//404 page
app.use((req,res)=> {
    res.status(404).render('404', { title: '404'});
});