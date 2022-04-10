import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {changeOrder, changeAlphabetical} from '../../actions';
import style from './Order.module.css';


export function Order(props){

    const default_score = "sinOrden"
    function handlerChangeOrder(e){
        e.preventDefault()
        props.changeOrder(e.target.value)
        props.setPageCurrent(1)
        props.setStateOrder(e.target.value)
        props.setMinPageLimit(0);
        props.setMaxPageLimit(props.pagMostrar)
    }
    function handlerChangeAlphabetical(e){
        props.changeAlphabetical(e.target.value)
        props.setPageCurrent(1)
        props.setStateOrder(e.target.value)
        props.setMinPageLimit(0);
        props.setMaxPageLimit(props.pagMostrar)
    }


    return(
        <div className={style.allFilters}>
            <p>Ordenar por puntuación: </p>
            <select defaultValue={default_score} id={style.score} onChange={handlerChangeOrder}>
                <option value="sinOrden" disabled hidden>Sin Orden</option>
                <option value='asc'>Puntuación mayor a menor</option>
                <option value='des'>Puntuación menor a mayor</option>
            </select>

            <p>Ornenar por alfabéticamente: </p>
            <select defaultValue={"sinOrden"} id={style.alphabetical} onChange={handlerChangeAlphabetical}>
                <option value='sinOrden' disabled hidden>Sin Orden</option>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
        </div>
    )
}

export function mapDispatchToProps(dispatch){
    return{
        changeOrder: (order) => dispatch(changeOrder(order)),
        changeAlphabetical: (orderAlf) => dispatch(changeAlphabetical(orderAlf))
    }
}

export default connect(null, mapDispatchToProps)(Order)