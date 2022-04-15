import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTypesRecipes, filterTypesDiets, filterScore, filterCreated} from '../../actions';
import style from './Filter.module.css';


export function Filter(props){
    // useEffect(() => props.types_diets(),[props.filterTypesDiets, props.filterScore]); //Ver esto
    useEffect(() => props.types_diets(),[]);

    function handlerTypesDiets(e){ //Este handler va a tomar el cambio de una opción.
        props.filterTypesDiets(e.target.value)
        props.setPageCurrent(1)
        props.setMinPageLimit(0)
        props.setMaxPageLimit(props.pagMostrar)
        resetScore()
        resetCreated()
    }
    function handlerScore(e){
        props.filterScore(e.target.value)
        props.setPageCurrent(1)
        props.setMinPageLimit(0)
        props.setMaxPageLimit(props.pagMostrar)
        resetTypesDiets()
        resetCreated()
    }
    function handlerCreated(e){
        props.filterCreated(e.target.value)
        props.setPageCurrent(1)
        props.setMinPageLimit(0)
        props.setMaxPageLimit(props.pagMostrar)
        resetScore()
        resetTypesDiets()
    }

    function resetTypesDiets(){
        var score = document.getElementById('resetTypesDiets')
        for (var i = 0, l = score.length; i < l; i++) {
            score[i].selected = score[i].defaultSelected;
        }
    }
    function resetScore(){
        var score = document.getElementById('resetScore')
        for (var i = 0, l = score.length; i < l; i++) {
            score[i].selected = score[i].defaultSelected;
        }
    }
    function resetCreated(){
        var score = document.getElementById('resetCreated')
        for (var i = 0, l = score.length; i < l; i++) {
            score[i].selected = score[i].defaultSelected;
        }
    }

    return(
        <div className={style.allFilters}>
            {/* Selección de score */}
            <p>Score:</p>
            <select defaultValue={'All'} className={style.score} id="resetScore" onChange={handlerScore}>
                <option value='All'>All</option>
                <option value='alto'>Alto</option>
                <option value='medio'>Medio</option>
                <option value='bajo'>Bajo</option>
            </select>

            {/* Selección de receta */}
            <p>Mostrar recetas:</p>
            <select defaultValue={'All'} className={style.recipe} id="resetCreated" onChange={handlerCreated}>
                <option value='All'>All</option>
                <option value='API'>API</option>
                <option value='My_recipes'>My recipes</option>
            </select>

            {/* Selección de Diets */}
            <p>Tipo de dieta:</p>
            <select defaultValue={"All"} className={style.diets} id="resetTypesDiets" onChange={handlerTypesDiets}>
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