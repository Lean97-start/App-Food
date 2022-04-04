import { GET_RECIPES, GET_TYPES_DIETS , FILTER_TYPES_DIETS, FILTER_SCORE, CREATE_RECIPE, FILTER_CREATED} from "../actions";

const initialValues = {
    recipes: [],
    types_diets: [],
    recipe: {},
    statePost: {}
}
let AllRecipes = [];
const rootReducer = (state = initialValues, {type, payload}) => {

     //Lo uso de respaldo para filtrar los tipos de dietas.

    switch(type){
        case GET_TYPES_DIETS: 
            //Me traigo todos los tipos de dieta posible
            return {...state, types_diets: payload.data};

        case GET_RECIPES: 
            //Valido si lo que me viene es un ID y le paso solo la receta que pedí
            //Si fuese que pase por query, me trae lo que pedi, y si no le pido por query me traería todo
            AllRecipes = payload.recipes.data;
            return (payload.type_passed === 'id')?  
            {...state, recipe: payload.recipes}:
            {...state, recipes: payload.recipes.data}

        case CREATE_RECIPE:
            console.log(payload)
            return {...state, statePost: {msg: payload.msg, result: payload.result}};  

        case FILTER_TYPES_DIETS:
            //Si me viene cualquier tipo de dieta, me la va a filtrar las distintas recetas que tengan esa dieta, caso contrario, muestra todo. 
            if(payload === 'All'){ return {...state, recipes: AllRecipes}}
            else{ return {...state, recipes: AllRecipes.filter(recipe => {return recipe.type_diets.includes(payload)})}}
        case FILTER_CREATED:
            
            if(payload === 'All'){ return {...state, recipes: AllRecipes}}
            else if(payload === "API"){return {...state, recipes: AllRecipes.filter(recipe => recipe.recipeUser !== true)}}
            else {return {...state, recipes: AllRecipes.filter(recipe => recipe.recipeUser === true)}}

            
        case FILTER_SCORE:
            // let scores_total = AllRecipes.reduce((a,b) => {return (a.score > b.score)? a : b}, 0);
            // let bajo = scores_total.score * (1/3)
            // let medio = scores_total.score * (2/3)
            
            if(payload === 'bajo'){return {...state, recipes: AllRecipes.filter(recipe => recipe.score <= 10)}}
            else if(payload === 'medio'){return {...state, recipes: AllRecipes.filter(recipe => (recipe.score <= 20 && recipe.score >= 10))}}
            else if(payload === 'alto'){return {...state, recipes: AllRecipes.filter(recipe =>  recipe.score >= 30)}}
            else{return {...state, recipes: AllRecipes}}
            
        default: 
            return state;
    }
}

export default rootReducer;