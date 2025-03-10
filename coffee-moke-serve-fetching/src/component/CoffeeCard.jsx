import React from "react";

const CoffeeCard = ({ image, title, price, description, ingredients }) => {

  return <div>
    <img className='image' src={image} alt={title} />

    <h2 className="title">{title}</h2>
    <p className="price">{price} </p>
    <p className="description">{description}</p>
    <ul className="ingredients">
      {ingredients?.map((ingredient, index) => (
        <li key={index}>{ingredient}</li>
      ))}
    </ul>


  </div>;
};

export default CoffeeCard;
