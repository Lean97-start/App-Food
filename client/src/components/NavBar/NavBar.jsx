import React from 'react';
import { NavLink } from 'react-router-dom';
import {connect} from 'react-redux'
import Filter from '../Search/Filter';
import Search from '../Search/Search';
import { getRecipe } from '../../actions';
export  function NavBar(props){

    function handlerOnclick(e){
        props.getRecipe();
    }

    return(
        <nav className='navBar'>
            <div className='nav_inicio'>
                <NavLink to='/recipes'><button onClick={handlerOnclick}><h3>Inicio</h3></button></NavLink>
            </div>
            <div className='nav_createRecipe'>
                <NavLink to='/createRecipe'><button><h3>Crear Receta</h3></button></NavLink>
            </div>
            <Search/>
            <Filter/>
        </nav>
    )
}
export const mapDispatchToProps = (dispatch) => {
    return {getRecipe: () => dispatch(getRecipe())}
}

export default connect(null, mapDispatchToProps)(NavBar)
