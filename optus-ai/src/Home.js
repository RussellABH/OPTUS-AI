import React  from 'react';
import Fab from '@mui/material/Fab';
import './Home.css';
import BarChart from './Chart';
//import * as data1 from '../../analysis/2011_frequencies/january.json';
import * as data1 from './january.json';

const Home = () => {
  const [showViz1, setShowViz1] = React.useState(false);
  const [showViz2, setShowViz2] = React.useState(false);

  const handleViz1 = () => {
    setShowViz1(!showViz1);
  }
  const handleViz2 = () => {
    console.log(data1);
    setShowViz2(!showViz2);
  }
  const dataArray1 = Object.entries(data1).map(([word, frequency]) => ({ word, frequency }));
  return (
    <div className='background'>
      <header className="title">
        <p>OPTUS-AI</p>
        <p>OPiate Tracker Using Social Media Signals and AI</p>
      </header>
      <div className="buttons">
        <Fab onClick={handleViz1} variant="extended" size="large" aria-label="add" 
        style={{width: '200px', height: '50px', marginRight: '10px'}}> 
          Visualization 1
        </Fab>
        <Fab onClick={handleViz2} variant="extended" size="large" aria-label="add" 
        style={{width: '200px', height: '50px'}}>
          Visualization 2
        </Fab>
      </div>
      {showViz1 && <BarChart data={dataArray1} />} {/* Conditionally render the BarChart */}
    </div>
  )
} 

export default Home;