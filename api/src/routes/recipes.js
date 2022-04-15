const { Router } = require('express');
require('dotenv').config();
const {Recipe, Type_diet} = require('../db.js'); //Los importo de db.js porque en ese archivo se le aplico la fn sequelize para que pueda interactuar con la BD
const axios = require('axios');

const router = Router()
const api = process.env.API6;

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
            dishTypes: dataRecipe.dishTypes,
            type_diets: dataRecipe.type_diets.map(type_diet_name => type_diet_name.dataValues.name),
            recipeUser: dataRecipe.recipeUser,
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
            type_diets: dataRecipe.diets
        }
    }   
}

router.get('/', async (req, res) => { //FUNCIONA
    const name = req.query.name; //Obtengo el nombre de la receta que me viene por query.
    try{
        //Búsqueda en la BD
        const searchname_BD = await Recipe.findAll({include:[{model: Type_diet}]}); //Search a la base de datos de todas las recetas
        const infoBD = await searchname_BD.map(recipeBD => {
            return formatSettings(recipeBD.dataValues, 'BD');
        })
        let infoAPI;
        try{
            //Búsqueda en la API
            const searchname_API = await axios(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${api}`, {params: {number: 100 ,addRecipeInformation: true}});
            infoAPI = await searchname_API.data.results.map(recipe => {
                addType(recipe.diets)
                return formatSettings(recipe, 'API');
            });
        }catch(e){console.log(e)}

        //Realizo el Json para mandar al front
        let recipes;
        //Si no tengo consultas a la API, me trae mis recetas.
        (!infoAPI)? recipes = infoBD : recipes = infoAPI.concat(infoBD); 
        if(!name) return res.status(200).json(recipes); //Si no me viene ningun nombre por query, que devuelva todas las recetas.
        const filterRecipe = recipes.filter(recipe => recipe.name.toUpperCase().includes(name.toUpperCase())); //Uppercase porque sino puede que no encuentre coincidencias.
        (filterRecipe.length > 0)? res.status(200).json(filterRecipe) : res.json({msg: "No se ha encontrado ninguna receta con ese nombre."});
    }catch(e){console.log(e)}
})

router.get("/:id", async (req, res) => { //FUNCIONA
    const id_rec = req.params.id; //Obtengo el id que me viene por params
    const regexAPI = /^([0-9])*$/;
    const regexBD = /[a-zA-Z0-9-]+$/;  
    const error_response = () => res.json({ msg: "No se ha encontrado el ID de la receta" }) //Para no repetir la misma linea, la guardo en una constante como funcion asi la puedo invocar.
    let valor;
   
    if (regexAPI.test(id_rec)) {//Valida si lo que viene es un número que es el id que maneja la API
        try{
            valor = await axios(`https://api.spoonacular.com/recipes/${id_rec}/information?apiKey=${api}`);
            return res.status(200).json(formatSettings(valor.data, 'API'));
        }catch(e){return error_response()}
    
    } else if(regexBD.test(id_rec)){//Valida si lo que viene es alfanumérico que es el id que maneja la BD
        try{
            valor = await Recipe.findByPk(id_rec, {include: {model: Type_diet}});
            return res.status(200).json(formatSettings(valor.dataValues, 'BD'));
        }catch(e){return error_response()}
    }else{
        return error_response()
    }
});


module.exports = router;