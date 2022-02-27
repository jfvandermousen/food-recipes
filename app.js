const express = require('express')
const { sendFile } = require('express/lib/response')
const app = express()
const morgan =require('morgan')


// register view engines

app.set('view engine', 'ejs');

const port = 3000

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })


  //middleware  & static files

app.use(express.static('public'))
app.use(morgan('tiny'));

const latestRecipes = [
    {id: 1,title:'Vegetables Noodle soup', srcImg:"/images/potage_aux_nouilles_et_legumes_.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 2,title:'Pastilla', srcImg:"/images/pastilla.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 3,title:'Tajine', srcImg:"/images/tajine.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
]

const popularRecipes =[
    {id: 4,title:'Donuts', srcImg:"/images/donuts.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 5,title:'Noodle soup', srcImg:"/images/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 6,title:'Wok', srcImg:"/images/wok_paprika.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
]

const recipes = [
    {id: 1,title:'Vegetables Noodle soup', srcImg:"/images/potage_aux_nouilles_et_legumes_.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 2,title:'Pastilla', srcImg:"/images/pastilla.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 3,title:'Tajine', srcImg:"/images/tajine.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 4,title:'Donuts', srcImg:"/images/donuts.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 5,title:'Noodle soup', srcImg:"/images/noodles_soup.png",cooker:"Marina", time:25,difficulty:"Medium"},
    {id: 6,title:'Wok', srcImg:"/images/wok_paprika.jpg",cooker:"Marina", time:25,difficulty:"Medium"},
]


app.get('/', (req, res) => {

  res.render('index', { title: 'Home',latestRecipes,popularRecipes});
})

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
    res.status(404).render('404', { title: '404'})
});