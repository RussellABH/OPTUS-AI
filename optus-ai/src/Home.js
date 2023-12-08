import React, { useState } from 'react';
import './Home.css';
import Fab from '@mui/material/Fab';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import BarChart from './Chart';
import data1 from './january.json';
import BertTopicGraph from './components/BertTopicGraph';
import DistanceMap from './components/IntertopicDistanceMap';

const Home = () => {
  const [showTopicPerMonth, setShowTopicPerMonth] = React.useState(false);
  const [showDistanceMap, setShowDistanceMap] = React.useState(false);
  const [showBertTopicGraph, setShowBertTopicGraph] = React.useState(false);

  const [selectedMonth, setSelectedMonth] = useState('January');
  const [selectedYear, setSelectedYear] = useState(2011);
  
  // Transform the object data into an array of objects
  const dataArray1 = Object.entries(data1)
  .map(([word, frequency]) => ({ word, frequency }))
  .sort((a, b) => b.frequency - a.frequency);

  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020];

 
  const handleTopicPerMonth = () => {
    setShowBertTopicGraph(false);
    setShowDistanceMap(false);
    setShowTopicPerMonth(!showTopicPerMonth);
  };

  const handleBertTopicGraph = () => {
    setShowTopicPerMonth(false);
    setShowDistanceMap(false);
    setShowBertTopicGraph(!showBertTopicGraph);
  };

  const handleDistanceMap = () => {
    setShowBertTopicGraph(false);
    setShowTopicPerMonth(false);
    setShowDistanceMap(!showDistanceMap);
  };
  
  return (
    <div className='home-background'>
      <header className="home-title">
      <img src={'/images/OPTUS-AI-FINAL-white.svg'} alt="logo" style={{ width: '250px', height: 'auto', marginTop: '10px', marginBottom: '0px'}} />
        <p>OPiate Tracker Using Social Media Signals and AI</p>
      </header>
      <div className="buttons">
        {/* Visualization Buttons */}
        <Fab onClick={handleTopicPerMonth} variant="extended" size="large" aria-label="add" style={{margin: '5px', width: '250px', height: '50px' }}>
          Frequencies Per Month
        </Fab>
  
        <Fab onClick={handleBertTopicGraph} variant="extended" size="large" aria-label="add" style={{margin: '5px', width: '250px', height: '50px' }}>
          Topics Over Time
        </Fab>

        <Fab onClick={handleDistanceMap} variant="extended" size="large" aria-label="add" style={{ margin: '5px', width: '250px', height: '50px' }}>
          Intertopic Map
        </Fab>
      </div>
      {showTopicPerMonth && (
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
      {showTopicPerMonth && <BarChart data={dataArray1}/> }
      {showBertTopicGraph && <BertTopicGraph style={{margin: 'auto'}}/>}
      {showDistanceMap && <DistanceMap />}
    </div>
  );
}

export default Home;