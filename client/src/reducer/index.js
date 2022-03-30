import { GET_RECIPES, GET_TYPES_DIETS } from "../actions";

const initialValues = {
    recipes: [],
    types_diets: [],
    recipe: {}
}

const rootReducer = (state = initialValues, {type, payload}) => {
    switch(type){
        case GET_TYPES_DIETS: 
            //Me traigo todos los tipos de dieta posible
            return {...state, diets: payload.diets};

        case GET_RECIPES: 
            //Valido si lo que me viene es un ID y le paso solo la receta que pedí
            //Si fuese que pase por query, me trae lo que pedi, y si no le pido por query me traería todo 
            return (payload.type_passed === 'id')?  
            {...state, recipe: payload.recipes}:
            {...state, recipes: payload.recipes}

        default: 
            return state;
    }
}

export default rootReducer;