import './App.css';
import useFetch from "./custom-hooks/useFetch"

function App() {
  const { data, loading, error } = useFetch("https://fakestoreapi.com/products")

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <div className="App">
      <h1>Hello</h1>

      {data.map((item) => (
        <div key={item.id}>
          <h6 key={item.id}>{item.title}</h6>
          <img src={item.image} />
          <p>{item.price}</p>

        </div>
      ))}



    </div>
  );
}

export default App;
