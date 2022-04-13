import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getRecipe } from "../../actions";
import RecipeCard from "../Recipes/RecipeCard.jsx";
import Pagination from "../Pagination/Pagination.jsx";
import NavBar from "../NavBar/NavBar.jsx";
import img from "../../assets/imag_ing_bkg.jpg";
import style from "../Recipes/Recipes.module.css";
import Filter from '../Filters_Order/Filter';
import Order from '../Filters_Order/Order';


export function Recipes(props) {

  
  let loading = false;
  useEffect(() => {
    props.getRecipe();
  }, []);
  const [stateOrder, setStateOrder] = useState();
  const [pageCurrent, setPageCurrent] = useState(1); //Lo voy a usar para que inicialmente inicie en 1 y le pueda cambiar el estado
  const [cantRecipePage, setCantRecipePage] = useState(9); //Este state se va a encargar de la cantidad de recetas a renderizar
  const [pagMostrar, setPagMostrar] = useState(5) //Lo uso para mostrar la cantidad de paginas por vez
  const lastRecipePage = cantRecipePage * pageCurrent; //Multiplico la cantidad recetas a renderizar por la pagina en la que estoy. Esta multiplicacion me va a dar el ultimo valor que renderizaria.
  const initialRecipe = lastRecipePage - cantRecipePage; //Al restarle, si le cambio el valor de cantidad de elementos a renderizar me seguira dando el numero de la card inicial.
  if(!props.recipes.msg){// Valida si hay un mensaje en respuesta negativa a una búsqueda por search
  var cantPages = props.recipes ? Math.ceil(props.recipes.length / cantRecipePage): undefined;
  var renderizarRecipes = props.recipes? props.recipes.slice(initialRecipe, lastRecipePage): []; //Separo las cards a renderizar del resto de todas las cards para mostrarlas en la pagina actual.
  }
  const [maxPageLimit, setMaxPageLimit] = useState(pagMostrar)
  const [minPageLimit, setMinPageLimit] = useState(0)
  
  function changePage(numberPage) {//Setteo la pagina a la cual quiero dirigirme
    setPageCurrent(numberPage);
  }

  function handlerPrevClick(){
    if((pageCurrent-1) % pagMostrar === 0){
      setMaxPageLimit(maxPageLimit - pagMostrar)
      setMinPageLimit(minPageLimit - pagMostrar)
    }
    //La validación si es el último la hago en el botón que está en paginación
    setPageCurrent(pageCurrent - 1); 
  }
  function handlerNextClick(){
    if(maxPageLimit < pageCurrent + 1){
       setMaxPageLimit(maxPageLimit + pagMostrar)
       setMinPageLimit(minPageLimit + pagMostrar)
    }
    //La validación si es el último la hago en el botón que está en paginación
    setPageCurrent(pageCurrent + 1);
  }

  function handlerNextPagMostrar(){
    if(cantPages > minPageLimit + pagMostrar){
      setMaxPageLimit(maxPageLimit + pagMostrar)
      setMinPageLimit(minPageLimit + pagMostrar)
      setPageCurrent(minPageLimit + pagMostrar +1);
   }
  }
  function handlerPrevPagMostrar(){
    if(0 <= minPageLimit - pagMostrar){
      setMaxPageLimit(maxPageLimit - pagMostrar)
      setMinPageLimit(minPageLimit - pagMostrar)
      setPageCurrent(minPageLimit - pagMostrar+1); 
    }
  }

  function returnNotFoundRecipe(){
    props.getRecipe();
  }

  if(props.recipes.length || props.allRecipes.length){loading = true;}


  return (
    <div className={style.homeRecipes}>
      <img id={style.img} src={img} alt="" />
      <div id={style.gradient} />
      <header className={style.header}>
        <NavBar/>
      </header>
      <div className={style.filters}>
        <Order setPageCurrent={setPageCurrent} setStateOrder={setStateOrder} setMinPageLimit={setMinPageLimit} setMaxPageLimit={setMaxPageLimit} pagMostrar={pagMostrar} />
        <Filter setPageCurrent={setPageCurrent} setMinPageLimit={setMinPageLimit} setMaxPageLimit={setMaxPageLimit} pagMostrar={pagMostrar}/>
      </div>
      <h1 id={style.title_recipe}>Recetas</h1>
      {(props.recipes.hasOwnProperty('msg'))?
      // Valida si hay un mensaje en respuesta negativa a una búsqueda por search
        <div>
          <h3 id={style.msg_sinRecetas}>{props.recipes.msg}</h3>
          <button id={style.button_notfoundRecipeBack} onClick={returnNotFoundRecipe}>Regresar</button>
        </div>:
        (cantPages < pageCurrent && loading && props.recipes.length)?(<h3 id={style.msg_sinRecetas}>No hay recetas para mostrar, disculpe</h3>):
          (!renderizarRecipes.length && !loading)?(<h3 id={style.msg_sinRecetas}>Cargando...</h3>):
            (!renderizarRecipes.length)?(<h3 id={style.msg_sinRecetas}>No hay recetas para mostrar</h3>):
              <div className={style.cardsHome}>
                {renderizarRecipes.map(({ id, name, image, type_diets }) => (
                  // Renderizo cada una de las recetas
                  <RecipeCard
                    key={id}
                    id={id}
                    name={name}
                    image={image}
                    type_diets={type_diets}
                    />
                ))}
              </div>
      }
      <Pagination
        cantPages={cantPages}
        pageCurrent={pageCurrent} 
        maxPageLimit={maxPageLimit}
        minPageLimit={minPageLimit}
        handlerPrevClick={handlerPrevClick}
        handlerNextClick={handlerNextClick}
        handlerNextPagMostrar={handlerNextPagMostrar}
        handlerPrevPagMostrar={handlerPrevPagMostrar}
        changePage={changePage} 
        />
    </div>
  );
}

export const mapStateToProps = (state) => {
  return { recipes: state.recipes, allRecipes: state.allRecipes };
};
export const mapDispatchToProps = (dispatch) => {
  return { getRecipe: (obj_getRecipe) => dispatch(getRecipe(obj_getRecipe)) };
};
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
