import React from 'react';
import style from './Pagination.module.css'

export default function Pagination(props){

    const {pageCurrent, maxPageLimit, minPageLimit} = props

    let pagesRenderizar = []
    if(props.cantPages) for(let i = 0; i <= props.cantPages; i++){
        pagesRenderizar.push(i+1) //Inicia en 1 para que me renderize a partir de la pagina uno, sino al ser un arreglo toma desde el cero
    }
    return(
        <div className={style.buttonsPagination}>
            {pagesRenderizar.length?<button id={style.button_Next_Prev} onClick={() => props.handlerPrevClick()} disabled={pageCurrent === pagesRenderizar[0]}>Anterior</button> : null}
            
            {(1 <= minPageLimit && pagesRenderizar.length)? <button onClick={() => props.handlerPrevPagMostrar()}>...</button>:null}
            {pagesRenderizar.map(pages => ( 
                (pages <= maxPageLimit && pages > minPageLimit)?
                <button id={pages === pageCurrent? style.active : null} key={pages} onClick={() => props.changePage(pages)}>{pages}</button>
                : null
                ))}
            {(pagesRenderizar.length > maxPageLimit)? <button onClick={() => props.handlerNextPagMostrar()}>...</button>:null}
            {pagesRenderizar.length?<button id={style.button_Next_Prev} onClick={() => props.handlerNextClick()} disabled={pageCurrent === pagesRenderizar.length}>Siguiente</button>: null}
        </div>
    )
}
