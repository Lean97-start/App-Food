import React from 'react';

export default function Pagination(props){

    let pagesRenderizar = []
    if(props.cantPages) for(let i = 0; i <= props.cantPages; i++){
        pagesRenderizar.push(i+1) //Para que me renderize a partir de la pagina uno, sino al ser un arreglo toma desde el cero
    }

    return(
        <div className='buttonsPagination'>
            {typeof pagesRenderizar === 'string'? <h3>{pagesRenderizar}</h3> : 
                pagesRenderizar.map(pages => ( 
                    <button key={pages} onClick={() => props.changePage(pages)}>{pages}</button>
                ))
            }
        </div>
    )
}
