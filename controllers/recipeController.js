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

const recipe_create_get = async(req,res) => {
  res.render('create', { title: 'Add new recipe'});
}

const recipe_create_post = (req,res) => {

  let imageUploadFile;
  let uploadPath;

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  } else {
    imageUploadFile = req.files.imageUpload;
    newImageName = imageUploadFile.name;
    uploadPath = require('path').resolve('./') + '/public/images/'+ newImageName;
 
    imageUploadFile.mv(uploadPath, function(err){
      if(err) return res.status(500).send(err);
    })


  }




    const recipe = new Recipe({
      title: req.body.title,
      cooker: req.body.cooker,
      time: req.body.time,
      difficulty: req.body.difficulty,
      description: req.body.description,
      srcImg: newImageName,
    });



    recipe.save()
      .then((result) => {
        console.log(recipe.srcImg)
        res.redirect('/recipes');
      })
      .catch((err)=> {
        console.log(err)
        res.redirect('/recipes');
      })
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
    recipe_create_get,
    recipe_create_post,
    recipe_details,
    recipe_delete,
}