import React, { useEffect, useState } from 'react';

const CenteredData = () => {
  const apiUrl = process.env.NEXT_PUBLIC_HOMEPAGE_BODY;
  const authToken = process.env.NEXT_PUBLIC_TOKEN;

  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl, {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const responseData = await response.json();

        // Set the data in state
        if (responseData.data) {
          setData(responseData.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="centered-content">
        
   
      <ul>
        {data.map((item) => (
          <li key={item.id}>
            <h1>{item.attributes.Name}</h1></li>
        ))}
      </ul>
    </div>
  );
};

export default CenteredData;
