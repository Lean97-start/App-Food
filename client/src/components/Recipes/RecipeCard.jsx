import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({name, image, type_diets}) {
    return (
        <div className="cardHouse">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <br />
            {type_diets.map((diet) => (
                <li>
                    <span>{diet}</span>
                </li>
            ))}
        </div>
    );
}
