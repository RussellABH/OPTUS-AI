import React, { useState, useEffect } from 'react';

function RehabTiles({ limit }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async (lat, long, limit) => {
      try {
        const response = await fetch(`http://127.0.0.1:8000/nearest_rehab?lat=${lat}&lng=${long}&limit=${limit}`);
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchData(latitude, longitude, limit);
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, [limit]);

  return (
    <div className="rehab-tiles-container">
      {data.map((item) => (
        <div className="rehab-card" key={item.id}>
          <h2>{item.name}</h2>
          <p><strong>Address:</strong> {item.address}</p>
          <p><strong>Rating:</strong> {item.rating || 'Not available'}</p>
          <p><strong>Phone Number:</strong> {item.phone_number || 'Not available'}</p>
          <div>
            <strong>Reviews:</strong>
            <ul>
              {item.reviews && Array.isArray(item.reviews) && item.reviews.map((review) => (
                <li key={review.id}>
                  {/* Render review content here */}
                  {review.text}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RehabTiles;
