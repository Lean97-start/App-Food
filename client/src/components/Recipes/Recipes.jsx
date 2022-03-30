import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { getRecipe } from '../../actions'


export function Recipes(props){
    // useEffect(()=>{
    //     props.getRecipe()
    // },[])

    console.log(props.recipes)
   
    return(
        <h3>HOLAA</h3>
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
[ ] Área donde se verá el listado de recetas. Deberá mostrar su:Imagen,Nombre, Tipo de dieta (vegetariano, vegano, apto celíaco, etc)
[ ] Botones/Opciones para filtrar por por tipo de dieta
[ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente las recetas por orden alfabético y por puntuación
[ ] Paginado para ir buscando y mostrando las siguientes recetas, 9 recetas por pagina, mostrando las primeros 9 en la primer pagina. */