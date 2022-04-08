import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getRecipe } from '../../actions';
import NavBar from '../NavBar/NavBar.jsx'
import style from '../Recipes/RecipeDetail.module.css';
import img from '../../assets/img_bkg_Detail.jpg';
import img_empty from '../../assets/img_sinFotoCreate.jpg';

export function RecipeDetail(props){
    const {id} = props.match.params;
    useEffect(() => props.recipe_id({data: `/${id}`, type_passed: 'id'}),[]);

    function htmlToTextPlane(textHtml){ //Con la expresion regular parseo el textoHTML a texto plano.
        return (textHtml)? textHtml.replace(/(<([^>]+)>)/ig, '') : null;
    }



    let rec = props.getRecipe;
    return(
        <div id={style.body} className='RecipeDetail'>
            <img id={style.img_back} src={img} alt="" />
            <header>
                <nav id={style.navBar}>
                    <Link to={'/recipes'}><button id={style.button_back}>Volver</button></Link>
                </nav>
            </header>
            {(!rec)? <h2 className='cargando_msg'>Cargando...</h2>:
                <div id={style.container}>
                    <div id={style.table_detail}>
                        <div id={style.grid_Present}>
                            {rec.image?
                                <img id={style.img_recipe} src={rec.image} alt={rec.name} />:
                                <img id={style.img_recipe} src={img_empty} alt={img_empty} />
                            }
                            <div id={style.titulado}>
                                <span id={style.name}>{rec.name}</span>
                                <span id={style.readyInMinutes}>Listo en: {rec.readyInMinutes} minutos</span>
                                <span id={style.healthy}>Nivel de comida saludable: {rec.healthScore}</span>
                                <span id={style.score}>Puntaje: {rec.score}</span>
                            </div>
                        </div>
                        <div className={style.summary_div}>
                                <p id={style.title_summary}>Resumen: </p>
                                <p id={style.summary}>{htmlToTextPlane(rec.summary)}</p>
                            <div id={style.diets_RecipeDetail}>
                                <p>Tipo de dieta</p>
                                <div id={style.elements_diet_dish}>
                                    {rec.type_diets.map(diet => (
                                        <li key={diet}>{diet}</li>
                                        ))}
                                </div>
                                <hr/>
                                <p>Tipo de plato</p>
                                <div id={style.elements_diet_dish}>
                                    {rec.dishTypes.map((dish) =>(
                                        <li key={dish}>{dish}</li>
                                    ))}
                                </div>
                            </div>
                            <div className={style.steps_div}>
                                {/* {rec.step_by_step.map(steps =>( */}
                                    <p id={style.title_step}>Pasos: </p>
                                    <p id={style.steps}>{htmlToTextPlane(rec.step_by_step)}</p>
                                {/* ))} */}
                            </div> 
                        </div>
                    </div>
                </div>
            }
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