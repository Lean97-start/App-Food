import React, {useEffect, useState}from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom';
import { getTypesRecipes , postRecipe} from '../../actions';
import style from '../Recipes/CreateRecipe.module.css';
import img from '../../assets/img_bkg_create.jpg'
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
        }else{
            stateError.errorSubmit && alert(stateError.errorSubmit);
            props.postRecipe(state)
            setState({ name:"", summary: "", score:0, healthScore: 0, step_by_step:"", image:"", readyInMinutes: 0, dishTypes: null, type_diets: [],})
        }
        
    }
    return(
        <div>
            <img id={style.img} src={img} alt="" />
            <header>
                <nav className={style.navBar}>
                    <Link id={style.Link_button} to={'/recipes'}><button id={style.button}>Volver</button></Link>
                </nav>
            </header>
            <div className={style.container}>
                <div className={style.container_marco}>

                    <h1 id={style.h1}>Creación de receta</h1>
                    {stateError.errorSubmit && alert(stateError.errorSubmit)}

                    <form className={style.form} onSubmit={(e) => handlerSubmit(e)}>
                        <div id={style.grid_div}>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputName">Nombre: </label>
                                <input value={state.name} id={style.input} name='name' type="text" onChange={handlerChange} placeholder='Nombre...'/>
                                {stateError.name && <p className={style.danger}>{stateError.name}</p>}
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputSummary">Resumen del plato: </label>
                                <input value={state.summary} id={style.input} name='summary' type="text" onChange={handlerChange} placeholder='Resumen del plato...'/>
                                {stateError.summary && <p className={style.danger}>{stateError.summary}</p>}
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputreadyInMinutes">Tiempo de cocción: </label>
                                <input value={state.readyInMinutes} id={style.input} name='readyInMinutes' type="text" onChange={handlerChange} placeholder='Tiempo de cocción...'/>
                                {stateError.readyInMinutes && <p className={style.danger}>{stateError.readyInMinutes}</p>}
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputPuntuacion">Puntuación: </label>
                                <input value={state.score} id={style.input} name='score' type="text" onChange={handlerChange}/>
                                {stateError.score && <p className={style.danger}>{stateError.score}</p>}
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputImg">Imagen url: </label>
                                <input value={state.image} id={style.input} name='image' type="text" onChange={handlerChange}/>
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputComidaSaludable">Nivel de "comida saludable": </label>
                                <input value={state.healthScore} id={style.input} name='healthScore' type="text" onChange={handlerChange}/>
                                {stateError.healthScore && <p className={style.danger}>{stateError.healthScore}</p>}
                            </div>

                        </div>

                        <div id={style.grid_campos}>

                            <div id={style.div_container}>
                                <label id={style.label} htmlFor="inputPasos">Paso a paso (Instrucciones): </label>
                                <textarea value={state.step_by_step} id={style.input} name='step_by_step' cols="30" rows="6" onChange={handlerChange} placeholder='Ingrese los pasos de la receta' />
                            </div>

                            <div id={style.div_container}>
                                <label id={style.label}>Tipos de dietas: </label>
                                {stateError.check && <p className={style.danger}>{stateError.check}</p>}

                                <div className={style.diets_list}>
                                    {props.getTypesDiets && props.getTypesDiets.map(type_diet => (
                                        <div key={type_diet.id}><label id={style.label_check}><input name={type_diet.name} onChange={(e) => checked(e)} type="checkbox" value={type_diet.id}/>{type_diet.name}</label></div>
                                    ))}
                                </div>

                            </div>

                        </div>
                        <button id={style.button_submit} type='submit'>Enviar</button>
                    </form>
                    <div id={style.button_div}>
                    </div>
                </div>
            </div>    
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
    return {
        getTypesDiets: state.types_diets,
        statePost: state.statePost
    }
}
export function mapDispatchToProps(dispatch){
    return {
        getTypesRecipes: () => dispatch(getTypesRecipes()),
        postRecipe: (datas) => dispatch(postRecipe(datas))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateRecipe);




