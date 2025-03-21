import React, { useEffect, useState } from "react";

function App() {
  const [employee, setEmployee] = useState([]);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState([]);


  const fetchData = async (page) => {
    try {
      const res = await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-employees?limit=12&page=${page}`);


      const data = await res.json();
      setEmployee(data.data);
      getPage(Math.ceil(data.totalPages))
      console.log(data.data)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData(page)
  }, [page])


  function getPage(limit) {
    let newData = [];
    newData.push(
      <button
        key="prev-key"
        onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        disabled={page === 1}
      >
        Previous
      </button>
    );

    for (let i = 1; i <= limit; i++) {
      if (i === page) {
        newData.push(
          <button
            key={i + "key"}
            onClick={() => setPage(i)}
            disabled
          >
            {i}
          </button>
        )
      } else {
        newData.push(
          <button
            key={i + "key"}
            onClick={() => setPage(i)}
          >
            {i}
          </button>
        )
      }
    }

    newData.push(
      <button
        key="next-key"
        onClick={() => setPage((prev) => Math.min(prev + 1, limit))}
        disabled={page === limit}
      >
        Next
      </button>
    );
    setPagination(newData)
  }
  return (
    <div className="App" >
      <h1 style={{ display: "flex", justifyContent: 'center' }}>Employees Dashboard</h1>
      <div className="employee" style={{ display: "flex", margin: 'auto', justifyContent: 'center', alignItems: "center", width: '500px' }}>
        <table border="1px">
          <thead>
            <tr>
              <th>S.no</th>
              <th>Name</th>
              <th>Department</th>
              <th>Image</th>
              <th>Gender</th>
              <th>Salary</th>
            </tr>
          </thead>
          <tbody>
            {/* map through the data*/}
            {employee?.map((item) =>
              <tr key={item.id}>
                <td>{item.id}</td>
                <td className="employee-card-name">{item.name}</td>
                <td className="employee-card-department">{item.department}</td>
                <td className="employee-card-image"> <img src={item.image} alt={item.name} style={{ width: "7vh" }} />
                </td>
                <td className="employee-card-gender">{item.gender} </td>
                <td className="employee-card-salary">{item.salary} </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {/* add your pagination here */}
      <div style={{ display: "flex", margin: "auto", justifyContent: "center", padding: '20px' }} >
        {pagination}
      </div>
      {/* {[].map((item) => { })} */}
    </div>
  );
}

export default App;
