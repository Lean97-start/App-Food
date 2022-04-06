const { Router } = require('express');
const {Recipe, Type_diet} = require('../db.js'); //Los importo de db.js porque en ese archivo se le aplico la fn sequelize para que pueda interactuar con la BD
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
    
const router = Router();
const api = '1323a609c8b8420aba666bd2d26f2fb8';
// const api = '43';

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('index', { title: 'index' })
})

async function addType(array){
    await Promise.all(array.map(type => {Type_diet.findOrCreate({where: {name: type}})}))
}

function formatSettings(dataRecipe, fount){ //Funcion para darle formato tanto a lo que me viene de la BD como de la API

    if(fount === 'BD'){
        return {
            id: dataRecipe.id,
            name: dataRecipe.name,
            summary: dataRecipe.summary,
            score: dataRecipe.score,
            healthScore: dataRecipe.healthScore,
            step_by_step: dataRecipe.step_by_step,
            image: dataRecipe.image,
            readyInMinutes: dataRecipe.readyInMinutes,
            dishTypes: dataRecipe.dishTypes.split("-"),
            // ingredients: dateRecipe.extendedIngredients.map(ingredient => ingredient.original),
            type_diets: dataRecipe.type_diets.map(type_diet_name => type_diet_name.dataValues.name),
            recipeUser: dataRecipe.recipeUser
        }
    }else if(fount === 'API'){
        return {
            id: dataRecipe.id,
            name: dataRecipe.title,
            summary: dataRecipe.summary,
            score: dataRecipe.weightWatcherSmartPoints,
            healthScore: dataRecipe.healthScore,
            step_by_step: dataRecipe.instructions,
            image: dataRecipe.image,
            readyInMinutes: dataRecipe.readyInMinutes,
            dishTypes: dataRecipe.dishTypes,
            // ingredients: dateRecipe.extendedIngredients.map(ingredient => ingredient.original),
            type_diets: dataRecipe.diets
        }
    }   
}

router.get('/recipes', async (req, res) => { //FUNCIONA
    const name = req.query.name; //Obtengo el nombre de la receta que me viene por query.
    try{
        //Búsqueda en la BD
        const searchname_BD = await Recipe.findAll({include:[{model: Type_diet}]}); //Search a la base de datos de todas las recetas
        const infoBD = await searchname_BD.map(recipeBD => {
            return formatSettings(recipeBD.dataValues, 'BD');
        })
        //Búsqueda en la API
        const searchname_API = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api}&addRecipeInformation=true&number=100`);
        const infoAPI = await searchname_API.data.results.map(recipe => {
            addType(recipe.diets)
            return formatSettings(recipe, 'API');
        });

        //Realizo la el Json para mandar al front
        const recipes = infoAPI.concat(infoBD);
        if(!name) return res.status(200).json(recipes); //Si no me viene ningun nombre por query, que devuelva todas las recetas.
        const filterRecipe = recipes.filter(recipe => recipe.name.toUpperCase().includes(name.toUpperCase())); //Uppercase porque sino puede que no encuentre coincidencias.
        (filterRecipe.length > 0)? res.status(200).json(filterRecipe) : res.status(404).json({msg: "No se ha encontrado ninguna receta con ese nombre."});
    }catch(e){console.log(e)}
})

router.get("/recipes/:id", async (req, res) => { //FUNCIONA
    const id_rec = req.params.id; //Obtengo el id que me viene por params
    const regexAPI = /^([0-9])*$/;
    const regexBD = /[a-zA-Z0-9-]+$/  
    const error_response = () => res.status(404).json({ msg: "No se ha encontrado el ID de la receta" }) //Para no repetir la misma linea, la guardo en una constante como funcion asi la puedo invocar.
    let valor;
   
    if (regexAPI.test(id_rec)) {//Valida si lo que viene es un número que es el id que maneja la API
        try{
            valor = await axios(`https://api.spoonacular.com/recipes/${id_rec}/information?apiKey=${api}`);
            return res.status(200).json(formatSettings(valor.data, 'API'));
        }catch(e){return error_response()}
    
    } else if(regexBD.test(id_rec)){//Valida si lo que viene es alfanumérico que es el id que maneja la BD
        try{
            valor = await Recipe.findByPk(id_rec, {include: {model: Type_diet}});
            if(!valor) return error_response()
            return res.status(200).json(formatSettings(valor.dataValues, 'BD'));
        }catch(e){console.log(e)}
    }else{
        return error_response()
    }
});

router.get('/types', (req, res) =>{ //FUNCIONA
    const types_diet = ["omnivore", "pescatarian", "vegetarian", "vegan", "fruitarian", "paleolithic"];

    //Ejecuto esta función la cual me va a ejecutar por promesas la búsqueda a la BD, sino está el tipo de dieta, lo crea.
    addType(types_diet)
    //Busco todos los tipos de datos para devolverlo en formato Json.
    .then(type => Type_diet.findAll())
    //En caso de que no se cumpla la promesa, se ejecutara la parte reject.
    .then(response => {res.send(response)}, error => res.status(404).json({msg: "No se encontraron los tipos de dietas"}));

    //Podría hacerlo con Asyc Await:
    // try{
    //     //Por cada elemento del Array voy a buscar si ya existe o sino, lo voy a crear. Se va a ejecutar en una primera instancia.
    //     types_diet.forEach(type => {
    //            Type_diet.findOrCreate({where: {name: type}}) 
    //     })
    // }catch(e){console.log(e)}
    // const type_find = await Type_diet.findAll() //Me voy a traer todos los tipos que haya en la base de datos
    // res.send(type_find);

})



router.post('/recipe', async (req, res) =>{ //FUNCIONA
    function startCapitalLetter(word){ //Para poner la primer letra del nombre en mayuscula
        inicio = word.slice(0,1)
        resto = word.slice(1)
        inicio = inicio.toUpperCase();
        return  inicio.concat(resto);
    }
    let {name, summary, score, healthScore, step_by_step, image, readyInMinutes, dishTypes, type_diets} = req.body; 
    if(!name) return res.status(400).json({msg: "No ingreso ningun nombre para la receta"});
    if(!summary) return res.status(400).json({msg: "No ingreso ningun resumen para la receta"});
    if(!type_diets) return res.status(400).json({msg: "No selecciono ningun tipo de dieta para la receta"});
    let dishJoin = dishTypes;
    (!dishTypes)? dishTypes = "No tiene un platillo específico" : dishTypes = dishJoin.join('-');
    name = startCapitalLetter(name)
    summary = startCapitalLetter(summary)
    // console.log(type_diets)
    try{
        if(name && summary && type_diets.length){
            const recipe_created = await Recipe.create({name, summary, score, healthScore, step_by_step, image, readyInMinutes, dishTypes});
            await recipe_created.setType_diets(type_diets)//Me va a vincular el o los id/s  del tipo de dieta a la receta.
        } 
    }catch(e){
        return res.status(500).json({msg: "Ha ocurrido un error en la creación de la receta, inténtelo de nuevo"})
    }
    // return res.redirect(`/recipes/${recipe_created.id}`);
    return res.status(200).json({msg: "Receta creada correctamente."});
})

module.exports = router;
