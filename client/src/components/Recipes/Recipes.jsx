import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import { getRecipe } from '../../actions';
import RecipeCard from '../Recipes/RecipeCard.jsx';


export function Recipes(props){
    useEffect(()=>{props.getRecipe()},[])

    
   
    return(
        <div className='homeRecipes'>
            <h1>Recipes</h1>
            <div className='cardsHome'>
                {!props.recipes? null: props.recipes.map(({id,name,image,type_diets}) => (
                            // Renderizo cada una de las recetas
                            <RecipeCard 
                                key={id}
                                name={name}
                                image={image}
                                type_diets={type_diets} 
                            /> 
                        )   
                    )
                }
            </div>
        </div>
    )


}
export const mapStateToProps = (state) => {
    return {recipes: state.recipes.data}
}
export const mapDispatchToProps = (dispatch) => {
    return {getRecipe: (obj_getRecipe) => dispatch(getRecipe(obj_getRecipe))}
}
export default connect(mapStateToProps, mapDispatchToProps)(Recipes);

/*
[ ] Input de búsqueda para encontrar recetas por nombre
[ ] Área donde se verá el listado de recetas. Deberá mostrar su:
    -   Imagen,
    -   Nombre,
    -   Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
[ ] Botones/Opciones para filtrar por por tipo de dieta
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
[ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina. */