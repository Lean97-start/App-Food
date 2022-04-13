const { Router } = require('express');
const { Recipe } = require ('../db.js');
const { Op } = require("sequelize");

const router = Router();

router.post('/', async (req, res) =>{ //FUNCIONA
    //Función para poner la primer letra del nombre en mayúscula
    function startCapitalLetter(word){ 
        inicio = word.slice(0,1)
        resto = word.slice(1)
        inicio = inicio.toUpperCase();
        return  inicio.concat(resto);
    }

    let {name, summary, score, healthScore, step_by_step, image, readyInMinutes, dishTypes, type_diets} = req.body; 

    //VALIDACIONES
    if(!name) return res.status(400).json({msg: "No ingreso ningun nombre para la receta"});
    if(!summary) return res.status(400).json({msg: "No ingreso ningun resumen para la receta"});
    // if(!type_diets) return res.status(400).json({msg: "No selecciono ningun tipo de dieta para la receta"});
    (!dishTypes)? dishTypes = "No tiene un platillo específico" : dishTypes 
    if(!score){score = null}
    if(!healthScore){healthScore = null}
    if(!readyInMinutes){readyInMinutes = null}

    name = startCapitalLetter(name.trim())
    summary = startCapitalLetter(summary.trim())
    
    try{
        if(name && summary){
            const recipe_created = await Recipe.create({name, summary, score, healthScore, step_by_step, image, readyInMinutes, dishTypes});
            await recipe_created.setType_diets(type_diets)//Me va a vincular el o los id/s  del tipo de dieta a la receta.
        } 
    }catch(e){
        return res.status(500).json({msg: "Ha ocurrido un error en la creación de la receta, inténtelo de nuevo"})
    }
    
    // const searchname_BD = await Recipe.findAll({attributes: ['id'] ,where:{ [Op.and]: [{name}, {summary}, {step_by_step}]}});
    // console.log(searchname_BD[0].dataValues.id)
    // return res.status(200).json({msg: "Receta creada correctamente." , id: searchname_BD[0].dataValues.id});
    return res.status(200).json({msg: "Receta creada correctamente."})
})

module.exports = router;