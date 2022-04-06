import React from "react";
import { Link } from "react-router-dom";
import style from '../Recipes/RecipeCard.module.css';
import img_empty from '../../assets/img_sinFotoCreate.jpg'

export default function RecipeCard({id,name, image, type_diets}) {
    return (
        <div className={style.cardHouse}>
            <Link id={style.card} to={`/recipes/${id}`}>
                <div id={style.img_div}>
                    {image?
                        <img id={style.image} src={image} alt={name} />:
                        <img id={style.image} src={img_empty} alt={name} />
                    }
                </div>
                <div id={style.name_div}>
                    <h3 id={style.name}>{name}</h3>
                </div>
            </Link>
            <div id={style.diets_div}>
                <p id={style.p}>Tipo de dieta</p>
                <div id={style.diets}>
                    {type_diets.map((diet) => (
                        <span key={diet} id={style.diet}><li>{diet}</li></span>
                    ))}
                </div>
            </div>
            
        </div>
    );
}
