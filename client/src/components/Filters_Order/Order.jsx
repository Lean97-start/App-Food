import React from 'react';
import { useEffect } from 'react';
import { connect } from 'react-redux';
import {changeOrder, changeAlphabetical} from '../../actions';



export function Order(props){

    function handlerChangeOrder(e){
        e.preventDefault()
        props.changeOrder(e.target.value)
        props.setPageCurrent(1)
        props.setStateOrder(e.target.value)
    }
    function handlerChangeAlphabetical(e){
        props.changeAlphabetical(e.target.value)
        props.setPageCurrent(1)
        props.setStateOrder(e.target.value)
    }


    return(
        <div className='allFilters'>
            <select onChange={handlerChangeOrder}>
                <option value='sinOrden'>Sin Orden</option>
                <option value='asc'>Puntuación Ascendente</option>
                <option value='des'>Puntuación Descendente</option>
            </select>
            <select onChange={handlerChangeAlphabetical}>
                <option value='sinOrden'>Sin Orden</option>
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