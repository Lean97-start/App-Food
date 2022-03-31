import React, { useState } from 'react';
import {connect} from 'react-redux';
import { getRecipe } from '../../actions';

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
        <form onSubmit={(event) => {handleSubmit(event)}}>
            <label className='labelsearchName' htmlFor='inpName'>Buscar por nombre: </label>
            <input type='text' id='inpName' placeholder='Nombre...' value={state} onChange={handleChange}></input>
            <button type='submit'>Buscar</button>
        </form>
    )
}

export const mapDispatchToProps = (dispatch)=>{
    return {getRecipe: (valueType) => dispatch(getRecipe(valueType))}
}


export default connect(null, mapDispatchToProps)(Search)