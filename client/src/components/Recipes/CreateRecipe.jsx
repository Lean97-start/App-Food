import React, {useEffect, useState}from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getTypesRecipes } from '../../actions';

export function CreateRecipe(props){

    useEffect(() => {props.getTypesRecipes()},[])
    const [stateError, setErrorState] = useState({})
    const [state, setState] = useState({
        name:"",
        summary: "",
        score:0,
        healthScore: 0,
        step_by_step:"",
        image:"",
        readyInMinutes: 0, 
        dishTypes: null, 
        type_diets: [],
    })

    function handlerChange(e){
        setErrorState(validateForm({...state, [e.target.name]: e.target.value}));
        setState({...state, [e.target.name]: e.target.value});
    }

    function checked(e){
        let array_types = state.type_diets; //Arreglo aux para poder sincronizar los datos y settearlos despues de verificar.
        if(e.target.checked){
            let aux = array_types.includes(e.target.value);
            if(!aux){array_types.push(e.target.value)}
        }else{
            array_types = array_types.filter(check => check !== e.target.value)
        } 
        setState({...state, type_diets: array_types})
    }
    
    function handlerSubmit(e){
        e.preventDefault();
        setErrorState(validateForm({...state, [e.target.name]: e.target.value}));
        if(!state.type_diets.length){setErrorState({...stateError, check: "Debe seleccionar al menos un tipo de dieta"})}
        if(stateError.name || stateError.summary || stateError.score || stateError.healthScore || stateError.readyInMinutes || stateError.check){
            setErrorState({...stateError, errorSubmit: "Campos con errores"});
        }
        stateError.errorSubmit && alert(stateError.errorSubmit);

    }
    return(
        <div>
            <nav className='navBar'>
                <Link to={'/recipes'}><button>Volver</button></Link>
            </nav>
            <h1>Creación de receta</h1>
            <form onSubmit={(e) => handlerSubmit(e)}>
                {stateError.errorSubmit && <p className='danger'>{stateError.errorSubmit}</p>}
                <div>
                    {stateError.name && <p className='danger'>{stateError.name}</p>}
                    <label htmlFor="inputName">Nombre: </label>
                    <input id='inputName' name='name' type="text" onChange={handlerChange} placeholder='Nombre...'/>
                </div>
                <div>
                    {stateError.summary && <p className='danger'>{stateError.summary}</p>}
                    <label htmlFor="inputSummary">Resumen del plato: </label>
                    <input id='inputSummary' name='summary' type="text" onChange={handlerChange} placeholder='Resumen del plato...'/>
                </div>
                <div>
                    {stateError.readyInMinutes && <p className='danger'>{stateError.readyInMinutes}</p>}
                    <label htmlFor="inputreadyInMinutes">Tiempo de cocción: </label>
                    <input id='inputreadyInMinutes' name='readyInMinutes' type="text" onChange={handlerChange} placeholder='Tiempo de cocción...'/>
                </div>
                <div>
                    {stateError.score && <p className='danger'>{stateError.score}</p>}
                    <label htmlFor="inputPuntuacion">Puntuación: </label>
                    <input id='inputPuntuacion' name='score' type="text" onChange={handlerChange}/>
                </div>
                <div>
                    <label htmlFor="inputImg">Imagen url: </label>
                    <input id='inputImg' name='image' type="text" onChange={handlerChange}/>
                </div>
                <div>
                    {stateError.healthScore && <p className='danger'>{stateError.healthScore}</p>}
                    <label htmlFor="inputComidaSaludable">Nivel de "comida saludable": </label>
                    <input id='inputComidaSaludable' name='healthScore' type="text" onChange={handlerChange}/>
                </div>
                <div>
                    {stateError.check && <p className='danger'>{stateError.check}</p>}
                    <label>Tipos de dietas: </label>
                    <div>
                        {props.getTypesDiets && props.getTypesDiets.map(type_diet => (
                            <label key={type_diet.id}><input name={type_diet.name} onChange={(e) => checked(e)} type="checkbox" value={type_diet.id}/>{type_diet.name}</label>
                        ))}
                    </div>
                </div>
                <div>
                    <label htmlFor="inputPasos">Paso a paso (Instrucciones): </label>
                    <textarea id='inputPasos' name='step_by_step' cols="30" rows="6" onChange={handlerChange} placeholder='Ingrese los pasos de la receta' />
                </div>
                <button type='submit'>Enviar</button>
            </form>
        </div>
    )
}

export function validateForm(data){
    let errors ={}; //Objeto para settear los errores.

    if(data.name === ""){errors.name = "No ha ingresado ningún nombre para la receta"}
    else if(!/^[A-Za-z0-9\s]+$/g.test(data.name)){errors.name = "No debe contener ningún cáracter especial"} //No debe contener caracteres especiales y debe contener letras
    else if(Number.isInteger(parseInt(data.name[0]))){errors.name = "No debe comenzar con números"}
    
    if(data.summary === ""){errors.summary = "No ha ingresado ningún resumen para la receta"}
    else if(!/^[A-Za-z0-9\s]+$/g.test(data.summary)){errors.summary = "No debe contener ningún cáracter especial"} //debe contener caracteres alfanumericos y no solamente números
    else if(Number.isInteger(parseInt(data.summary[0]))){errors.summary = "No debe comenzar con números"}
    
    if(!/^([0-9])*$/.test(data.score)){errors.score = "Puntuación solo acepta números"}//debe contener caracteres letras, solamente números
    
    if(!/^([0-9])*$/.test(data.healthScore)){errors.healthScore = "Comida saludable solo acepta números"}//debe contener caracteres letras, solamente números
    
    if(!/^([0-9])*$/.test(data.readyInMinutes)){errors.readyInMinutes = "Tiempo de cocción solo acepta números"}//debe contener caracteres letras, solamente números
    
    
    return errors;
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
export function mapStateToProps(state){
    return {getTypesDiets: state.types_diets}
}
export function mapDispatchToProps(dispatch){
    return {getTypesRecipes: () => dispatch(getTypesRecipes())}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);