import { useState } from "react";

const QuantityButton = () => {
  const [quantity, setQuantity] = useState(1);

  const handleInc = () => {
    setQuantity(quantity + 1)
  }
  const handleDec = () => {
    setQuantity(quantity - 1)
  }

  return <>
    <div className="quantity_container" style={{display:"flex",alignItems:"center",gap:'5px',margin:"auto",justifyContent:"center"}}>
      <button data-cy="inc_btn" onClick={handleInc} style={{ background: "blue", color: "white", border: "none", height: "30px", borderRadius: "2px" }}>+</button>
      <p className="quantity">{quantity}</p>
      <button data-cy="dec_btn" onClick={handleDec} disabled={quantity === 0} style={{ background: "blue", color: "white", border: "none", height: "30px", borderRadius: "2px" }}>-</button>

    </div>
  </>;
};

export default QuantityButton;
