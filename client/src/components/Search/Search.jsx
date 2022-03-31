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
        props.getRecipe(state);
        setState("");
    }

    return(
        <form onSubmit={(event) => {handleSubmit(event)}}>
            <label className='labelsearchName' htmlFor='inpName'>Buscar por nombre: </label>
            <input type='text' id='inpName' placeholder='Nombre...' onChange={handleChange}></input>
            <button type='submit'>Buscar</button>
        </form>
    )
}

export const mapStateToProps = (state)=>{
    return {recipesSearch: state.recipes}
}
export const mapDispatchToProps = (dispatch)=>{
    return {getRecipe: (valueType) => dispatch(getRecipe(valueType))}
}


export default connect(mapStateToProps, mapDispatchToProps)(Search)