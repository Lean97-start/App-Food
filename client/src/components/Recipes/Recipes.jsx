import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { getRecipe } from '../../actions';
import RecipeCard from '../Recipes/RecipeCard.jsx';
import Pagination from '../Pagination/Pagination.jsx';
import NavBar from '../NavBar/NavBar.jsx';
import img from '../../assets/imag_ing_bkg.jpg'
import style from '../Recipes/Recipes.module.css'

export function Recipes(props){
    useEffect(()=>{props.getRecipe()},[]);
    const [stateOrder, setStateOrder] = useState()
    const [pageCurrent, setPageCurrent] = useState(1); //Lo voy a usar para que inicialmente inicie en 1 y le pueda cambiar el estado
    const [cantRecipePage, setCantRecipePage] = useState(9); //Este state se va a encargar de la cantidad de recetas a renderizar
    const lastRecipePage = cantRecipePage * pageCurrent;   //Multiplico la cantidad recetas a renderizar por la pagina en la que estoy. Esta multiplicacion me va a dar el ultimo valor que renderizaria. 
    const initialRecipe = lastRecipePage - cantRecipePage; //Al restarle, si le cambio el valor de cantidad de elementos a renderizar me seguira dando el numero de la card inicial. 
    let cantPages = (props.recipes)? Math.round((props.recipes.length)/cantRecipePage) : undefined;
    let renderizarRecipes = (props.recipes)? props.recipes.slice(initialRecipe, lastRecipePage) : [];

    function changePage(numberPage){ //Setteo la pagina a la cual quiero dirigirme
        setPageCurrent(numberPage);
    }

    function changeRenderRecipe(numberRender){ //Modifico la cantidad de cards a renderizar.
        setCantRecipePage(numberRender);
    }
    

    return(
        <div className={style.homeRecipes}>
            <img id={style.img} src={img} alt="" /><div id={style.gradient}/>
            <header className={style.header}>
                <NavBar setPageCurrent={setPageCurrent} setStateOrder={setStateOrder}/>
            </header>
            <Pagination cantPages={cantPages} changePage={changePage}/> 
            <h1 id={style.title_recipe}>Recetas</h1>
            <div className={style.cardsHome}>{!renderizarRecipes? <h3>"¡No hay recetas para mostrar, disculpe!"</h3> : renderizarRecipes.map(({id,name,image,type_diets}) => (
                            // Renderizo cada una de las recetas
                            <RecipeCard 
                                key = {id}
                                id = {id}
                                name = {name}
                                image = {image}
                                type_diets = {type_diets} 
                            /> 
                        )   
                    )
                }   
            </div>
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {recipes: state.recipes}
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