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
//https://api.spoonacular.com/recipes/complexSearch?apiKey=e8da7bb1c4224ba7859cbc1a5b3b5bc0&addRecipeInformation=true
router.get('/recipes', async (req, res) => {
    const name = req.query.name; //Obtengo el nombre de la receta que me viene por query.
    // if(!name){
    //     const recipesBD = await Recipe.findAll({where: {name}}); //Me fijo si tengo ese name en la base de datos y de estar me devuelve un arreglo.
    //     // const recipesAPI = await fetch('')
        
    // }
})

router.get("/recipes/:id", async (req, res) => {
    const id_rec = req.params.id; //Obtengo el id que me viene por params
    const regexAPI = /^([0-9])*$/;
    const regexBD = /[a-zA-Z0-9-]+$/  

    let valor;
    if (regexAPI.test(id_rec)) {valor = await axios(`https://api.spoonacular.com/recipes/${id_rec}/information?apiKey=e8da7bb1c4224ba7859cbc1a5b3b5bc0`);
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
    } else if(regexBD.test(id_rec)){
      valor = await Recipe.findByPk(id_rec, { include: Type_diet });
      return res.send(valor);
    }else{
        return res.status(404).json({ msg: "No se ha encontrado el ID de la receta" })
    }
  });

router.get('/types', async (req, res) =>{ //FUNCIONA
    const types_diet = ["omnivore", "pescetarian", "ovo vegetarian", "lacto vegetarian", "vegan", "fruitarian", "paleo"];

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
        await recipe_created.setType_diets(id_type_diet)
    }catch(e){
        return res.status(500).json({msg: "Ha ocurrido un error en la creación de la receta, inténtelo de nuevo"})
    }
    // return res.redirect(`/recipes/${recipe_created.id}`);
    return res.status(200).json({msg: "debe redireccionarme a la pág de la receta que se creo."});
})

module.exports = router;
