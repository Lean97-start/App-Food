import React from 'react'
import { connect } from 'react-redux'

export function CreateRecipe(props){
    return(
        <form>
            <label htmlFor="inputName">Nombre:</label>
            <input id='inputName' type="text" placeholder='Nombre...'/>
            <label htmlFor="inputSummary">Resumen del plato: </label>
            <input id='inputSummary' type="text" placeholder='Resumen del plato...'/>
            <label htmlFor="input">Puntuación: </label>
            <input id='input' type="text" />
            <label htmlFor="input">Nivel de "comida saludable": </label>
            <input id='input' type="text" />
            <label htmlFor="input">Paso a paso (Instrucciones):</label>
            <input id='input' type="text" />
        </form>
    )
}
/*
[ ] Un formulario controlado con JavaScript con los siguientes campos:
    -Nombre
    -Resumen del plato
    -Puntuación
    -Nivel de "comida saludable"
    -Paso a paso
[ ] Posibilidad de seleccionar/agregar uno o más tipos de dietas
[ ] Botón/Opción para crear una nueva receta */
export function mapDispatchToProps(dispatch){
    return {}
}

export default connect(null, mapDispatchToProps)(CreateRecipe);