const { Router } = require('express');
const {Recipe} = require ('../db.js');

const router = Router();

router.post('/', async (req, res) =>{ //FUNCIONA
    function startCapitalLetter(word){ //Para poner la primer letra del nombre en mayuscula
        inicio = word.slice(0,1)
        resto = word.slice(1)
        inicio = inicio.toUpperCase();
        return  inicio.concat(resto);
    }
    let {name, summary, score, healthScore, step_by_step, image, readyInMinutes, dishTypes, type_diets} = req.body; 
    if(!name) return res.status(400).json({msg: "No ingreso ningun nombre para la receta"});
    if(!summary) return res.status(400).json({msg: "No ingreso ningun resumen para la receta"});
    // if(!type_diets) return res.status(400).json({msg: "No selecciono ningun tipo de dieta para la receta"});
    let dishJoin = dishTypes;
    (!dishTypes)? dishTypes = "No tiene un platillo específico" : dishTypes = dishJoin.join('-');
    name = startCapitalLetter(name)
    summary = startCapitalLetter(summary)
    // console.log(type_diets)
    try{
        if(name && summary){
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