import React from "react";
import AddToCartButton from "./AddToCartButton";

const GroceryItem = ({ image, name, price }) => {
  return (
    <div
      className="grocery_card"
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        width: "250px",
        height: "350px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        padding: "16px",
        
        backgroundColor: "#f9f9f9",
       
      }}
     
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
          borderRadius: "4px",
          marginBottom: "12px",
          gap:"5px"
        }}
      />
      <h3
        style={{
          fontSize: "20px",
          fontWeight: "bold",
          color: "#333",
          marginBottom: "8px",
        }}
      >
        {name}
      </h3>
      <h5
        style={{
          fontSize: "16px",
          fontWeight: "500",
          color: "#555",
          marginBottom: "12px",
        }}
      >
        {price}
      </h5>
      <AddToCartButton data-cy="add-to-cart-btn" />
    </div>
  );
};

export default GroceryItem;
