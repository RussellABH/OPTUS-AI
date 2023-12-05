import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <NavLink to="/">
            <img
              src="/images/OPTUS-AI.png"
              style={{ width: '25%', height: '25%' }}
              alt="OPTUS-AI Logo"
            />
          </NavLink>
        </div>
        <div className="nav-elements">
          <ul>
            <li>
              <NavLink to="/">Data Visualizations</NavLink>
            </li>
            <li>
              <NavLink to="/rehab">Rehab Centers</NavLink>
            </li>
            <li>
              <NavLink to="/users">User Analysis</NavLink>
            </li>
            <li>
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar