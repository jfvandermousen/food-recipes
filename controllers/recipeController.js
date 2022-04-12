const Recipe = require('../models/recipe');

const recipe_index = (req, res) => {
    Recipe.find().sort({createdAt : -1})
    .then((result) => {
      res.render('index',{title:'Home',recipes: result})
    })
    .catch((err) => {
      console.log(err);
    })
}

const recipe_details = (req, res) => {
    const id = req.params.id;
    Recipe.findById(id)
    .then(result => {
      res.render('recipe', {recipe : result, title: 'Recipe details'});
    })
    .catch((err) => {
        res.status(404).render('404', { title: '404'});
    })
}


const recipe_create_post = (req,res) => {
    const recipe = new Recipe(req.body);
    recipe.save()
      .then((result) => {
        console.log(req.body)
        res.redirect('/recipes');
      })
      .catch((err)=> {
        console.log(err)
      })
}


const recipe_create_get = (req,res) => {
    res.render('create', { title: 'Add new recipe'});
}

const recipe_delete = (req,res) => {
    const id = req.params.id;
    Recipe.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect : '/recipes'})
      })
      .catch(err => {
        console.log(err)
      })
}


module.exports = {
    recipe_index,
    recipe_create_post,
    recipe_create_get,
    recipe_details,
    recipe_delete,
}