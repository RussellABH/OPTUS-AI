import React  from 'react';
import Home from './Home';
import Rehab from './Rehab';
import About  from './About';
import Users from './Users';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from  './components/Navbar';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/rehab' element={<Rehab />} />
              <Route path='/users' element={<Users />} />
              <Route path='/about' element={<About />} />
          </Routes>
      </Router>
  );
}

export default App;