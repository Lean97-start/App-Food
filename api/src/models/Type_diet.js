const {DataTypes} = require('Sequelize')

module.exports = (sequelize) => {
    sequelize.define('type_diet', {
        name: {
            type: DataTypes.STRING, //Nombre del tipo de dieta
            allowNull: true,
        }
    },{timestamps: false})
}