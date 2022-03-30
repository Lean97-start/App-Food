const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('recipe', {
    //Por el problema de que se llegue a pisar con el ID de la API, me conviene crear un ID en mi BD con UUID.
    id:{
      type: DataTypes.UUID, //Con UUID me va a crear un número alfanumerico. Sequelize me provee este DataType
      defaultValue: DataTypes.UUIDV4, //Para que me lo ponga de defecto el ID
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    summary: { //Resumen del plato
      type: DataTypes.TEXT,
      allowNull: false
    },
    score: { //Puntaje
      type: DataTypes.FLOAT
    },
    healthScore: { //nivel de "comida saludable"
      type: DataTypes.FLOAT
    },
    step_by_step: { //Paso a paso de la receta
      type: DataTypes.TEXT //No se cuantos pasos puede ocupar la receta, por lo cual, le asigno un text para que el usuario escriba tanto como quiera.
    },
    image: {
      type: DataTypes.STRING //Es un string el cual tiene la dirección de la foto.
    },
    readyInMinutes: {
      type: DataTypes.INTEGER //Tiempo en el que tarda en estar listo.
    },
    dishTypes: {
      type: DataTypes.INTEGER //Tipo de plato de la receta
    },
    inBD: { //Verifico si está en la BD la receta.
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false
    }

  },{timestamps: false});
};
