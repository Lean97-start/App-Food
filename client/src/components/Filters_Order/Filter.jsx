import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTypesRecipes, filterTypesDiets, filterScore, filterCreated} from '../../actions';



export function Filter(props){
    // useEffect(() => props.types_diets(),[props.filterTypesDiets, props.filterScore]); //Ver esto
    useEffect(() => props.types_diets(),[props.filterTypesDiets, props.filterScore, props.filterCreated]); //VER ESTO!!

    function handlerTypesDiets(e){ //Este handler va a tomar el cambio de una opción.
        props.filterTypesDiets(e.target.value)
    }
    function handlerScore(e){
        props.filterScore(e.target.value)
    }
    function handlerCreated(e){
        props.filterCreated(e.target.value)
    }

    // console.log("Filter: "+ props.rec)
    return(
        <div className='allFilters'>
            {/* Selección de score */}
            <p>Score:</p>

            <select onChange={handlerScore}>
                <option value='All'>All</option>
                <option value='alto'>Alto</option>
                <option value='medio'>Medio</option>
                <option value='bajo'>Bajo</option>
            </select>

            <p>Mostrar recetas:</p>
            <select onChange={handlerCreated}>
                <option value='All'>All</option>
                <option value='API'>API</option>
                <option value='My_recipes'>My recipes</option>
            </select>

            {/* Selección de Diets */}
            <p>Tipo de dieta:</p>
            <select onChange={handlerTypesDiets}>
                <option key={"All"} value={"All"}>All</option>
                {!props.getTypesDiets? null : props.getTypesDiets.map(type => {
                    return(
                        <option key={type.id} value={type.name}>{type.name}</option>
                    )
                })}
            </select>
        </div>
    )
}
export function mapStateToProps(state){
    return{getTypesDiets: state.types_diets}
}
export function mapDispatchToProps(dispatch){
    return{
        types_diets: () => dispatch(getTypesRecipes()),
        filterTypesDiets: (value_diet) => dispatch(filterTypesDiets(value_diet)),
        filterScore: (value_score) => dispatch(filterScore(value_score)),
        filterCreated: (value_created) => dispatch(filterCreated(value_created))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)