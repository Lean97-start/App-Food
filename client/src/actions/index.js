import axios from 'axios'
const local = 'http://localhost:3001/';
export const GET_RECIPES = 'GET_RECIPES',
 GET_TYPES_DIETS = 'GET_TYPES_DIETS';

export function getTypesRecipes(){
    return function(dispatch){ //Con esta function creator, me traigo todos los tipos de recetas.
        return axios.get(`${local}types`)
        .then(response => dispatch({type: GET_TYPES_DIETS, payload: response}))
        .catch(e => console.log(e))
    }
}

export function getRecipe(payload){
    //Por payload me voy a traer, si no se le pasa ningun query, ni id, todas las recetas
    //Si me trae una query, se lo paso a la url y me trae todas las coincidencias con el nombre
    //Si solo le paso el id, me va a traer la receta indicada.
    console.log("Llego")
    return function(dispatch){
        console.log(payload)
        if(payload.recipes){
            return axios.get(`http://localhost:3001/recipes/`)
            .then(recipes => dispatch({type: GET_RECIPES, payload: {recipes: recipes, type_passed: null}}))
            .catch(e => console.log(e))}
        else{    
            return axios.get(`${local}recipes/${payload.recipes}`)
            .then(recipes => dispatch({type: GET_RECIPES, payload: {recipes, type_passed: payload.type_passed}}))
            .catch(e => console.log(e))}
    }

}

export function postRecipe(){

}