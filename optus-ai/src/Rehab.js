import React, { useState, useEffect } from 'react';
import './Rehab.css';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import RehabTiles from './components/RehabTiles.js';

const Rehab = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [limit, setLimit] = useState(3); // Default limit
  
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  return (
    <div className='rehab-background'>
      <h1 className="rehab-title">Rehab Centers</h1>
      <Paper style={{ borderRadius: 100, padding: '20px', width: 250, margin: '0 auto'}}>
        <div className="limit-dropdown">
          <p>Show results limit:</p>
          <Select id="limit" value={limit} onChange={handleLimitChange}>
            {[...Array(50).keys()].map((value) => (
              <MenuItem key={value + 1} value={value + 1}>
                {value + 1}
              </MenuItem>
            ))}
          </Select>
        </div>
      </Paper>
      <br></br> 
      <RehabTiles limit={limit} />
    </div>
  );
}
export default Rehab;