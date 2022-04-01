import React from 'react';
import { connect } from 'react-redux';
import { getRecipe } from '../../actions';


export function RecipeDetail(props){
    const {id} = props.params;
    
    return(
        <div className='RecipeDetail'>
            <img src="" alt="" />
            <h2>sd</h2>
            <p></p>
            <div className='diets_RecipeDetail'>

            </div>
            <p></p>
            <div className='pasoDetailRecipe'>

            </div>
        </div>
    )
}

function mapStateToProps(state){
    return {getRecipe: state.recipe}
}
function mapDispatchToProps(dispatch){
    return {recipe_id: (obj_recipe) => dispatch(getRecipe(obj_recipe))}
}

export default connect(mapStateToProps, mapDispatchToProps)(RecipeDetail)





// [ ] Los campos mostrados en la ruta principal para cada receta (imagen, nombre, tipo de plato y tipo de dieta)
// [ ] Resumen del plato
// [ ] Puntuación
// [ ] Nivel de "comida saludable"
// [ ] Paso a paso