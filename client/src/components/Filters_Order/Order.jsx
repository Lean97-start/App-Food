import React from 'react';
import { connect } from 'react-redux';
import { getTypesRecipes } from '../../actions';



export function Filter(props){

    function handlerChangeOrder(){

    }
    function handlerChangeAlfabetic(){
        
    }


    return(
        <div className='allFilters'>
            <select>
                <option value='asc'>Ascendente</option>
                <option value='des'>Descendente</option>
            </select>
            <select>
                <option value='A-Z'>A-Z</option>
                <option value='Z-A'>Z-A</option>
            </select>
        </div>
    )
}
export function mapStateToProps(state){
    return{getTypesDiets: state.types_diets}
}
export function mapDispatchToProps(dispatch){
    return{types_diets: () => dispatch(getTypesRecipes())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)