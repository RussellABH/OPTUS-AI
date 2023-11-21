import React, { useState } from 'react';
import Fab from '@mui/material/Fab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import './Home.css';
import BarChart from './Chart';
//import * as data1 from '../../analysis/2011_frequencies/january.json';
import data1 from './january.json';
import BertTopicGraph from './BertTopicGraph';

const Home = () => {
  const [showViz1, setShowViz1] = React.useState(false);
  const [showViz2, setShowViz2] = React.useState(false);
  const [showBertTopicGraph, setShowBertTopicGraph] = React.useState(false);

  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState(2011);
  
  // Transform the object data into an array of objects
  const dataArray1 = Object.entries(data1)
  .map(([word, frequency]) => ({ word, frequency }))
  .sort((a, b) => b.frequency - a.frequency);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

 
  const handleViz1 = () => {
    setShowBertTopicGraph(false);
    setShowViz2(false);
    setShowViz1(!showViz1);
  };

  const handleViz2 = () => {
    setShowBertTopicGraph(false);
    setShowViz1(false);
    setShowViz2(!showViz2);
  };

  const handleBertTopicGraph = () => {
    setShowViz1(false);
    setShowViz2(false);
    setShowBertTopicGraph(!showBertTopicGraph);
  };
  
  return (
    <div className='background'>
      <header className="title">
        <p>OPTUS-AI</p>
        <p>OPiate Tracker Using Social Media Signals and AI</p>
      </header>
      <div className="buttons">
        {/* Visualization Buttons */}
        <Fab onClick={handleViz1} variant="extended" size="large" aria-label="add" style={{margin: '5px', width: '200px', height: '50px' }}>
          Visualization 1
        </Fab>
  
        <Fab onClick={handleViz2} variant="extended" size="large" aria-label="add" style={{margin: '5px', width: '200px', height: '50px' }}>
          Visualization 2
        </Fab>

        <Fab onClick={handleBertTopicGraph} variant="extended" size="large" aria-label="add" style={{ margin: '5px', width: '200px', height: '50px' }}>
          Topics Over Time
        </Fab>
      </div>
      {showViz1 && (
        <div className="dropdowns">
          {/* Month Dropdown */}
          <Select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            style={{ margin: '10px', color: 'black', backgroundColor: '#e0e0e0', borderRadius: '10px'}}
          >
            {months.map((month) => (
              <MenuItem key={month} value={month}>
                {month}
              </MenuItem>
            ))}
          </Select>
  
          {/* Year Dropdown */}
          <Select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ margin: '10px', color: 'black', backgroundColor: '#e0e0e0', borderRadius: '10px'}}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </div>
      )}
      {showViz1 && <BarChart data={dataArray1} />} 
      {showBertTopicGraph && <BertTopicGraph />}
    </div>
  );
}

export default Home;
/* Pass the data based on selectedMonth and selectedYear */