import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getTypesRecipes } from '../../actions';



export function Filter(props){
    useEffect(() => props.types_diets(),[])
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
            <select>
                <option value='A-Z'>Puntuacion</option>
            </select>
            <select>
                {!props.getTypesDiets? null : props.getTypesDiets.map(type => {
                    return(
                        <option key={type.id} value={type.id}>{type.name}</option>
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
    return{types_diets: () => dispatch(getTypesRecipes())}
}

export default connect(mapStateToProps, mapDispatchToProps)(Filter)