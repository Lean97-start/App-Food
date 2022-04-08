const { Router } = require('express');

// Importar todos los routers;

const recipes = require('./recipes.js');
const recipe = require('./recipe.js');
const types_diets = require('./types_diets.js');
    
const router = Router();

// Configurar los routers

router.use('/recipe', recipe);
router.use('/recipes', recipes);
router.use('/types', types_diets);

module.exports = router;


