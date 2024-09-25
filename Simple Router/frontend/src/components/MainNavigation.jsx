import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import MainClasses from '../components/MainNavigation.module.css';
import Table from "./Table";
import Search from "./SearchBox";

export default function MainNavigation() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchError, setSearchError] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/search?email=${searchQuery}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      
    } catch (error) {
      setSearchError(error.message);
    }
  };

  return (
    <>
      <div className="sticky-top shadow">
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <ul className="navbar-nav">
            <li className="nav-item mx-2">
              <NavLink to='/' className="nav-link" end>HOME</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink to='/register' className="nav-link">REGISTRATION</NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink to='/edit' className="nav-link">EDIT</NavLink>
            </li>            
            <li className="nav-item mx-2">
              <NavLink to='/search' className="nav-link">SEARCH</NavLink>
            </li>            
          </ul>
        </nav>
      </div>
    </>
  );
}
