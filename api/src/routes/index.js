const { Router } = require('express');
const {Recipe, Type_diet} = require('../db.js'); //Los importo de db.js porque en ese archivo se le aplico la fn sequelize para que pueda interactuar con la BD
const axios = require('axios');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
    
const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/', (req, res) => {
    res.send('index', { title: 'index' })
})

async function addType(array){
    await Promise.all(array.map(type => {Type_diet.findOrCreate({where: {name: type}})}))
}



router.get('/recipes', async (req, res) => { //FUNCIONA
    //Voy a buscar por el name a la base de datos. Luego busco en los 100 resultados que me salen y los concateno al ser un array. Despues de eso, agarro y uso un filter para buscar que contengan ese name. 
    const name = req.query.name; //Obtengo el nombre de la receta que me viene por query.
    try{
        const searchname_BD = await Recipe.findAll({include:[{model: Type_diet}]});
        const searchname_API = await axios('https://api.spoonacular.com/recipes/complexSearch?apiKey=1323a609c8b8420aba666bd2d26f2fb8&addRecipeInformation=true&number=100');
        const infoAPI = await searchname_API.data.results.map(recipe => {
            addType(recipe.diets)
            return {
                id: recipe.id,
                name: recipe.title,
                summary: recipe.summary,
                readyInMinutes: recipe.readyInMinutes,
                score: recipe.weightWatcherSmartPoints,
                healthScore: recipe.healthScore,
                dishTypes: recipe.dishTypes,
                step_by_step: recipe.instructions,
                image: recipe.image,
                type_diets: recipe.diets
            }
        });
        const recipes = infoAPI.concat(searchname_BD);
        const filterRecipe = recipes.filter(recipe => recipe.name.includes(name));
        (filterRecipe.length > 0)? res.status(200).json(filterRecipe) : res.status(404).json({msg: "No se ha encontrado ninguna receta con ese nombre."});
    }catch(e){console.log(e)}
})




router.get("/recipes/:id", async (req, res) => { //FUNCIONA
    const id_rec = req.params.id; //Obtengo el id que me viene por params
    const regexAPI = /^([0-9])*$/;
    const regexBD = /[a-zA-Z0-9-]+$/  
    const error_response = () => res.status(404).json({ msg: "No se ha encontrado el ID de la receta" }) //Para no repetir la misma linea, la guardo en una constante como funcion asi la puedo invocar.
    let valor;
    if (regexAPI.test(id_rec)) {
        try{
        valor = await axios(`https://api.spoonacular.com/recipes/${id_rec}/information?apiKey=1323a609c8b8420aba666bd2d26f2fb8`);
        let rec = valor.data;
        
        return res.json({
            id: rec.id,
            name: rec.title,
            summary: rec.summary,
            readyInMinutes: rec.readyInMinutes,
            score: rec.weightWatcherSmartPoints,
            healthScore: rec.healthScore,
            dishTypes: rec.dishTypes,
            step_by_step: rec.instructions,
            image: rec.image,
            type_diets: rec.diets,
        });
        }catch(e){return error_response()}
    } else if(regexBD.test(id_rec)){
        try{
        valor = await Recipe.findByPk(id_rec, {include: {model: Type_diet, attributes: ['name'], through: {attributes: []}}});
        //through me garantiza que solo me va a traer esos atributos que le pongo en attributes.
        if(!valor) return error_response()
        return res.send(valor);
        }catch(e){console.log(error_response())}
    }else{
        return error_response()
    }
  });





router.get('/types', async (req, res) =>{ //FUNCIONA
    const types_diet = ["omnivore", "pescetarian", "vegetarian", "vegan", "fruitarian", "paleo"];

    //Ejecuto un map en el cual me va a ejecutar por promesas la búsqueda a la BD, sino está el tipo de dieta, lo crea.
    await Promise.all(types_diet.map(type => {Type_diet.findOrCreate({where: {name: type}})}))
    //Busco todos los tipos de datos para devolverlo en formato Json.
    .then(type => Type_diet.findAll())
    //En caso de que no se cumpla la promesa, se ejecutara la parte reject.
    .then(response => {res.send(response)}, error => res.status(404).json({msg: "No se encontraron los tipos de dietas"}))
    .catch(e=> console.log(e))

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
    const {name, summary, score, healthScore, step_by_step, image, readyInMinutes, id_type_diet} = req.body; 
    if(!name) return res.status(400).json({msg: "No ingreso ningun nombre para la receta"});
    if(!summary) return res.status(400).json({msg: "No ingreso ningun resumen para la receta"});
    if(!id_type_diet) return res.status(400).json({msg: "No selecciono ningun tipo de dieta para la receta"});
    try{
        const recipe_created = await Recipe.create({name, summary, score, healthScore, step_by_step, image, readyInMinutes});
        await recipe_created.setType_diets(id_type_diet) //Me va a vincular el o los id/s  del tipo de dieta a la receta.
    }catch(e){
        return res.status(500).json({msg: "Ha ocurrido un error en la creación de la receta, inténtelo de nuevo"})
    }
    // return res.redirect(`/recipes/${recipe_created.id}`);
    return res.status(200).json({msg: "debe redireccionarme a la pág de la receta que se creo."});
})

module.exports = router;
