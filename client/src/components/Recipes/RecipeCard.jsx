import React from "react";

export default function RecipeCard({key, name, image, type_diets}) {
    return (
        <div className="cardHouse">
            <h3>{name}</h3>
            <img src={image} alt={name} />
            <br />
            {type_diets.map((diet) => (
                <li id={key}>
                    <span >{diet}</span>
                </li>
            ))}
        </div>
    );
}
