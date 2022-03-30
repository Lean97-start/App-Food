import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar(){
    return(
        <nav className='navBar'>
            <div className='nav_inicio'>
                <NavLink to='/recipes'><h3>Inicio</h3></NavLink>
            </div>
            <div className='nav_createRecipe'>
                <NavLink to='/createRecipe'><h3>Crear Receta</h3></NavLink>
            </div>

        </nav>
    )
}
