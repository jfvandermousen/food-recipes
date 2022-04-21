const express = require('express');
const recipeController =  require('../controllers/recipeController');
const router = express.Router();





router.post('/create',recipeController.recipe_create_post);

router.get('/create', recipeController.recipe_create_get);
  
router.get('/recipe/:id', recipeController.recipe_details);
  
router.delete('/recipe/:id', recipeController.recipe_delete);

router.get('/recipes', recipeController.recipe_index);
  
  
module.exports = router;
  