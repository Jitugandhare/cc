import { useEffect, useState } from "react";
import CoffeeCard from "../component/CoffeeCard";

const Coffee = () => {
  const [coffee, setCoffee] = useState([]);
  const [loading,setLoading]=useState(false);

  const handleClick = async () => {
    try {
      setLoading(true)
      let res = await fetch(`http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}/coffee`);
      let data = await res.json();
      setCoffee(data)
      setLoading(false);

      console.log(data)
    } catch (error) {
      console.log(error)
    }

  }

 
if(loading){
  return <h1>Loading...</h1>
}
  return (
    <div className="wrapper">
      {/* Create Button `Get Coffee` here */}
      <button onClick={handleClick}>Get Coffee</button>
      <div className="coffee_container">
        {coffee?.map((item) => (
          <CoffeeCard key={item.id} {...item} />
        ))}

        {/* Populate coffee data inside CoffeeCard.jsx */}
      </div>
    </div>
  );
};

export default Coffee;
