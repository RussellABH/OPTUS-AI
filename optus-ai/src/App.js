import React  from 'react';
import Home from './Home';
import Rehab from './Rehab';
import About  from './About';
import Users from './Users';
import Error from './Error';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from  './components/Navbar';

function App() {
  return (
      <Router>
          <Navbar />
          <Routes>
              <Route exact path='/' element={<Home />} />
              <Route exact path='/rehab' element={<Rehab />} />
              <Route exact path='/users' element={<Users />} />
              <Route exact path='/about' element={<About />} />
              <Route path='*' element={<Error />} />
          </Routes>
      </Router>
  );
}

export default App;