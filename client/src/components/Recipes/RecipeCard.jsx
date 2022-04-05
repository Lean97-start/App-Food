import React from "react";
import { Link } from "react-router-dom";
import style from '../Recipes/RecipeCard.module.css';

export default function RecipeCard({id,name, image, type_diets}) {
    return (
        <div className={style.cardHouse}>
            <Link id={style.card} to={`/recipes/${id}`}>
                <h3>{name}</h3>
                <img src={image} alt={name} />
                <br />
            </Link>
            {type_diets.map((diet) => (
                <li key={diet} id={style.diet}>{diet}</li>
            ))}
            
        </div>
    );
}
