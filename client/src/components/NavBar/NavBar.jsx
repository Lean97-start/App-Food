import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import Search from '../Search/Search';
import { getRecipe } from '../../actions';
import style from '../NavBar/NavBar.module.css';


export function NavBar(props){

    function handlerOnclick(e){
        props.getRecipe();
    }

    return(
        <nav className={style.navBar}>
            <NavLink id={style.navLink_Inicio} to='/recipes'><button id={style.button} onClick={handlerOnclick}>Inicio</button></NavLink>
            <NavLink id={style.navLink_Create} to='/createRecipe'><button id={style.button}>Crear Receta</button></NavLink>
            <div id={style.search}><Search/></div>
        </nav>
    )
}
export const mapDispatchToProps = (dispatch) => {
    return {getRecipe: () => dispatch(getRecipe())}
}

export default connect(null, mapDispatchToProps)(NavBar)
