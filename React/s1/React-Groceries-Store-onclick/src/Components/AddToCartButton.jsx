import { useState } from "react";
import QuantityButton from "./QuantityButton";

const AddToCartButton = () => {
  const [count, setCount] = useState(0);
  const [quantity, setQuantity] = useState(false);

  const handleQuantity = () => {
    setCount(count + 1)
    setQuantity(true)
  }
  return <>
    {!quantity && <button data-cy="add-to-cart-btn" onClick={handleQuantity} style={{background:"blue" ,color:"white",border:"none", height:"40px",borderRadius:"2px"} }>Add to Cart</button>}
    {quantity && <QuantityButton quantity={1} />}
  </>;
};

export default AddToCartButton;
