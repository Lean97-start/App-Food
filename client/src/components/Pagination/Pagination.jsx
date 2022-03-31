import React, { useState } from 'react';
import { connect } from 'react-redux';

export default function Pagination(props){

    const [pageCurrent, setPageCurrent] = useState(1); //Lo voy a usar para que inicialmente inicie en 1 y le pueda cambiar el estado
    const [cantRecipePage, setCantRecipePage] = useState(9); //Este state se va a encargar de la cantidad de recetas a renderizar
    const [cantPage, setCantPage] = useState(0)         //Me va a servir para guardar el estado de la cantidad de paginas que tengo
    const finalRecipePage = cantRecipePage * pageCurrent;   //Multiplico la cantidad recetas a renderizar por la pagina en la que estoy. Esta multiplicacion me va a dar el ultimo valor que renderizaria. 
    const initialRecipe = finalRecipePage - cantRecipePage; //Al restarle, si le cambio el valor de cantidad de elementos a renderizar me seguira dando el numero de la card inicial. 
    let cantPages = Math.ceil((props.recipes.length)/cantRecipePage)
    let PagesRenderizar = []

    for(let i = 0; i <= cantPages; i++){
        
    }
    
    return(
        <div>
            {/* {!props.recipes? null: props.recipes.map(({id,name,image,type_diets}) => (
                            // Renderizo cada una de las recetas
                            <RecipeCard 
                                key={id}
                                name={name}
                                image={image}
                                type_diets={type_diets} 
                            /> 
                        )   
                    )
                } */}
        </div>
    )
}
