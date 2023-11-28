import React  from 'react';
import './Rehab.css';
import Paper  from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const Rehab = () => {
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error.message);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }, []); // Empty dependency array to run the effect only once

  return (
    <div className='background'>
      <header className="title">
        <p>Rehab Centers</p>
      </header>
      <Paper style={{ borderRadius: 100, padding: '20px', width: 850, margin: '0 auto'}}>
        <div className="search">
          <p>I am seeking help for</p>
          <Select id="addiction" defaultValue={1} style={{marginLeft: '10px', marginRight: '10px'}}>
            <MenuItem value={1}>Heroin Addiction</MenuItem>
          </Select>
          <p>in</p>
          <TextField id="location" label="Location" variant="outlined" defaultValue="New York" style={{marginLeft: '10px', marginRight: '10px'}}/>
          <IconButton aria-label="search" color="primary" size='large'>
            <SearchIcon style={{fontSize: '35px'}}/>
          </IconButton>
        </div>
      </Paper>
    </div>
  )
}

export default Rehab;