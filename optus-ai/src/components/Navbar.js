import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import Logo from '../OPTUS-AI.png'
import './Navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
        <img  style={{ width: "25%", height: "25%" }} src={Logo} alt="OPTUS-AI Logo"/>
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
              <NavLink to="/about">About Us</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar