import { GET_RECIPES, GET_TYPES_DIETS , FILTER_TYPES_DIETS, FILTER_SCORE, CREATE_RECIPE, FILTER_CREATED, ORDER_SCORE, ORDER_ALPHABETICAL} from "../actions";

const initialValues = {
    recipes: [],
    types_diets: [],
    recipe: {},
    allRecipes : []
}
// let AllRecipes = [];
const rootReducer = (state = initialValues, {type, payload}) => {

     //Lo uso de respaldo para filtrar los tipos de dietas.

    switch(type){
        case GET_TYPES_DIETS: 
            //Me traigo todos los tipos de dieta posible
            return {...state, types_diets: payload.data};

        case GET_RECIPES: 
            //Valido si lo que me viene es un ID y le paso solo la receta que pedí
            //Si fuese que pase por query, me trae lo que pedi, y si no le pido por query me traería todo
            if(!state.allRecipes.length) state.allRecipes = payload.recipes.data;
            return (payload.type_passed === 'id')?  
            {...state, recipe: payload.recipes}:
            {...state, recipes: payload.recipes.data}

        case CREATE_RECIPE:
            return state;  
            // return state;

        case FILTER_TYPES_DIETS:
            //Si me viene cualquier tipo de dieta, me la va a filtrar las distintas recetas que tengan esa dieta, caso contrario, muestra todo. 
            if(payload === 'All'){ return {...state, recipes: state.allRecipes}}
            else{ return {...state, recipes: state.allRecipes.filter(recipe => {return recipe.type_diets.includes(payload)})}}
        
        case FILTER_CREATED:
            
            if(payload === 'All'){ return {...state, recipes: state.allRecipes}}
            else if(payload === "API"){return {...state, recipes: state.allRecipes.filter(recipe => recipe.recipeUser !== true)}}
            else {return {...state, recipes: state.allRecipes.filter(recipe => recipe.recipeUser === true)}}

            
        case FILTER_SCORE:
            
            if(payload === 'bajo'){return {...state, recipes: state.allRecipes.filter(recipe => recipe.score <= 10)}}
            else if(payload === 'medio'){return {...state, recipes: state.allRecipes.filter(recipe => (recipe.score <= 20 && recipe.score >= 10))}}
            else if(payload === 'alto'){return {...state, recipes: state.allRecipes.filter(recipe =>  recipe.score >= 30)}}
            else{return {...state, recipes: state.allRecipes}}
        
        case ORDER_SCORE:
            
            let arrayOrderScore = [];
            if(payload === 'des'){
                arrayOrderScore = state.recipes.sort((a,b) => {
                    if(a.score > b.score) return 1
                    else if(a.score < b.score) return -1
                    else return 0
                })
            }else if(payload === 'asc'){
                arrayOrderScore = state.recipes.sort((a,b) => {
                    if(a.score > b.score) return -1
                    else if(a.score < b.score) return 1
                    else return 0
                })
            }
            return {...state, recipes: arrayOrderScore}

        case ORDER_ALPHABETICAL:
            let arrayOrderAlphabetical = [];
            if(payload === 'A-Z'){
                arrayOrderAlphabetical = state.recipes.sort((a,b) => {
                    if(a.name > b.name) return 1
                    else if(a.name < b.name) return -1
                    else return 0
                })
            }else if(payload === 'Z-A'){
                arrayOrderAlphabetical = state.recipes.sort((a,b) => {
                    if(a.name > b.name) return -1
                    else if(a.name < b.name) return 1
                    else return 0
                })
            }
            return {...state, recipes: arrayOrderAlphabetical}

        default: 
            return state;
    }
}

export default rootReducer;