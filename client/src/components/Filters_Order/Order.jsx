import React from 'react';
import { connect } from 'react-redux';
import {changeOrder, changeAlphabetical, getRecipe} from '../../actions';
import style from './Order.module.css';


export function Order(props){

    const default_score = "sinOrden"
    function handlerChangeOrder(e){
        e.preventDefault();
        props.changeOrder(e.target.value);
        props.setPageCurrent(1);
        props.setStateOrder(e.target.value);
        props.setMinPageLimit(0);
        props.setMaxPageLimit(props.pagMostrar);
        resetOrderAlpha();
    }
    function handlerChangeAlphabetical(e){
        props.changeAlphabetical(e.target.value);
        props.setPageCurrent(1);
        props.setStateOrder(e.target.value);
        props.setMinPageLimit(0);
        props.setMaxPageLimit(props.pagMostrar);
        resetOrderScore();
    }
    
    function resetOrderScore(){
        var score = document.getElementById('orderScore')
        for (var i = 0, l = score.length; i < l; i++) {
            score[i].selected = score[i].defaultSelected;
        }
    }
    function resetOrderAlpha(){
        var alpha = document.getElementById('orderAlpha')
        for (var i = 0, l = alpha.length; i < l; i++) {
            alpha[i].selected = alpha[i].defaultSelected;
        }
    }
    
    function reset() {
        resetOrderAlpha();
        resetOrderScore();
        props.getRecipe();
    }
    

    return(
        <div className={style.allFilters}>
            <p>Ordenar por puntuación: </p>
            <select id='orderScore' defaultValue={default_score} className={style.score} onChange={handlerChangeOrder}>
                <option value="sinOrden" disabled hidden>Sin Orden</option>
                <option value='asc'>Puntuación mayor a menor</option>
                <option value='des'>Puntuación menor a mayor</option>
            </select>

            <p>Ordenar por alfabéticamente: </p>
            <select id='orderAlpha' defaultValue={default_score} className={style.alphabetical} onChange={handlerChangeAlphabetical}>
                <option value='sinOrden' disabled hidden>Sin Orden</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>

            <div id={style.navLink_Create}><button onClick={reset} id={style.button}>Restaurar orden</button></div>

        </div>
    )
}

export function mapDispatchToProps(dispatch){
    return{
        changeOrder: (order) => dispatch(changeOrder(order)),
        changeAlphabetical: (orderAlf) => dispatch(changeAlphabetical(orderAlf)),
        getRecipe: () => dispatch(getRecipe())
    }
}

export default connect(null, mapDispatchToProps)(Order)