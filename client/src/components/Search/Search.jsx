import React, { useState } from 'react';
import {connect} from 'react-redux';
import { getRecipe } from '../../actions';
import style from '../Search/Search.module.css';

export function Search(props){

    const [state, setState] = useState("");

    function handleChange(event){
        setState(event.target.value);
    }
    function handleSubmit(datos){
        datos.preventDefault();
        props.getRecipe({data: `?name=${state}`, type_passed: 'query'});
        setState("");
    }
    return(
        <form className={style.container} onSubmit={(event) => {handleSubmit(event)}}>
            <label id={style.label} className='labelsearchName' htmlFor='inpName'>Buscar por nombre: </label>
            <input id={style.inpName} type='text' placeholder='Nombre...' value={state} onChange={handleChange}></input>
            <button id={style.button_submit} type='submit'>Buscar</button>
        </form>
    )
}

export const mapDispatchToProps = (dispatch)=>{
    return {getRecipe: (valueType) => dispatch(getRecipe(valueType))}
}


export default connect(null, mapDispatchToProps)(Search)