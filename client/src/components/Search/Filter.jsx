import React from 'react';

export default function Filter(props){
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