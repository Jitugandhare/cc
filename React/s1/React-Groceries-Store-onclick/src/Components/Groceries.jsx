import { useState } from "react";
import GroceryItem from "./GroceryItem";
import LoadingIndicator from "./LoadingIndicator";

const Groceries = () => {
  const [gdata, setGdata] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false)


  const fetchData = () => {
    setLoading(true)

    fetch('https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-groceries').then((res) => res.json())
      .then((data) => {
        setGdata(data.data)
        // console.log(data.data)
        setLoading(false)
        setShow(true);
      })





  }


  return <div className="grocery_container"
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
    }}
  >
    <h1 style={{ textAlign: "center" }}>Groceries</h1>

    {!show && !loading && <button className="get-groceries-btn" onClick={fetchData} style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center", background: "blue", color: "white", border: "none", height: "40px", borderRadius: "2px"
    }} >Get Groceries</button>}
    {loading && <LoadingIndicator />}
    {show &&
      gdata.map((products) => (
        <div data-cy="grocery-items-container">
          <GroceryItem {...products} key={products.id} />
        </div>
      ))
    }
  </div>;
};

export default Groceries;
