import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipe } from '../../actions';
import NavBar from '../NavBar/NavBar.jsx'

export function RecipeDetail(props){
    const {id} = props.match.params;
    useEffect(() => props.recipe_id({data: `/${id}`, type_passed: 'id'}),[]);

    let rec = props.getRecipe;
    return(
        <div className='RecipeDetail'>
            <nav>
                <Link to={'/recipes'}><button>Volver</button></Link>
            </nav>
            {(!rec)? <h2 className='cargando_msg'>Cargando...</h2>:
                <div>
                    <img src={rec.image} alt={rec.name} />
                    <h2>{rec.name}</h2>
                    
                    <p>Listo en: {rec.readyInMinutes} minutos</p>
                    <div className='diets_RecipeDetail'>
                        <p>Tipo de dieta: </p>
                        {rec.type_diets.map(diet => (
                            <li key={diet}>{diet}</li>
                        ))}
                    </div>
                    <span>Nivel de comida saludable: {rec.healthScore}</span>
                    <br />
                    <span>Puntaje: {rec.score}</span>
                    <div className='diets_RecipeDetail'>
                        <p>Plato para: </p>
                        {rec.dishTypes.map((dish) =>(
                            <li key={dish}>{dish}</li>
                        ))}
                     </div>
                     <h4>{rec.summary}</h4>
                    <div className='pasoDetailRecipe'>
                        {/* {rec.step_by_step.map(steps =>( */}
                            <p>Pasos: </p>
                            <p>{rec.step_by_step}</p>
                        {/* ))} */}
                    </div>
            </div>}
        </div>
    )
}
/*



step_by_step: "fasjkdgfjlashdfasdf"

*/
function mapStateToProps(state){
    return {getRecipe: state.recipe.data}
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