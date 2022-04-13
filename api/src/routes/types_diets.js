const { Router } = require('express');
const {Type_diet} = require ('../db.js');
const router = Router();

async function addType(array){
    await Promise.all(array.map(type => {Type_diet.findOrCreate({where: {name: type}})}))
}

router.get('/', (req, res) =>{ //FUNCIONA
    const types_diet = ["omnivore", "pescatarian", "vegetarian", "vegan", "fruitarian", "paleolithic"];

    //Ejecuto esta función la cual me va a ejecutar por promesas la búsqueda a la BD, sino está el tipo de dieta, lo crea.
    addType(types_diet)
    //Busco todos los tipos de datos para devolverlo en formato Json.
    .then(type => Type_diet.findAll())
    //En caso de que no se cumpla la promesa, se ejecutara la parte reject.
    .then(response => {res.send(response)}, error => res.status(404).json({msg: "No se encontraron los tipos de dietas"}));
})


module.exports = router;