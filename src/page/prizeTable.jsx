import React, { useState } from "react";
import axios from "axios";

const ApiCallExample = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = () => {
    setLoading(true);
    setError(null);

    axios
      .get("http://localhost:3000/gifts") // Replace this URL with your API endpoint
      .then((response) => {
        setLoading(false);
        // Select a random item from the response data
        const randomIndex = Math.floor(Math.random() * response.data.length);
        const randomItem = response.data[randomIndex];
        setData(randomItem);
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message);
      });
  };

  return (
    <div>
      <button onClick={fetchData}>Call API</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>Lucky User</h2>
          <table>
            <thead>
              <tr>
                <th>Phần Thưởng</th>
              </tr>
            </thead>
            <tbody>
              <tr key={data._id}>
                <td>{data.name}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ApiCallExample;
