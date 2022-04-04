import React from "react";
import { Link } from "react-router-dom";

export default function RecipeCard({id,name, image, type_diets}) {
    return (
        <div className="cardHouse">
            <Link to={`/recipes/${id}`}>
                <h3>{name}</h3>
                <img src={image} alt={name} />
                <br />
            </Link>
            {type_diets.map((diet) => (
                <li key={diet} id={diet}>{diet}</li>
            ))}
            
        </div>
    );
}
