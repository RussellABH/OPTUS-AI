import React  from 'react';
import './Rehab.css';
import Paper  from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

const Rehab = () => {
  return (
    <div>
      <header className="title">
        <p>Rehab Centers</p>
      </header>
      <Paper style={{ borderRadius: 100, padding: '20px', width: 1300, margin: '0 auto', marginTop: '10px' }}>
        <header className="search">
          <p>I am seeking help for </p>
          <Select id="addiction" defaultValue={1}>
            <MenuItem value={1}>Heroin Addiction</MenuItem>
          </Select>
          <p> in </p>
          <TextField id="location" label="location" variant="outlined" defaultValue="New York"/>
          <IconButton aria-label="search" color="primary">
            <SearchIcon />
          </IconButton>
        </header>
      </Paper>
    </div>
  )
}

export default Rehab;