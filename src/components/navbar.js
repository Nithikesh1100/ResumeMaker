import React, { useState, useContext, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/authContext'; // Adjust the path as per your project structure
import { auth } from '../config_db/firebase'; 
import '../styles/nav.css';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/');  
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <nav className="navbar">
        <div className='detailsNresume'>
          {isAuthenticated ? (
            <>
              <NavLink to="/details" activeClassName="active-link" exact >
                Details
              </NavLink>
              <NavLink to="/resume" activeClassName="active-link">
                Resume
              </NavLink>
            </>
          ) : (
            <></>
          )}
        </div>
        <button className="navbar-toggler" onClick={toggleDropdown}>☰</button>
        {dropdownOpen && (
          <div className="dropdown-menu" ref={dropdownRef}>
            {isAuthenticated ? (
              <span onClick={handleLogout} style={{ cursor: 'pointer' }}>
                Logout
              </span>
            ) : (
              <>
                <NavLink to="/signin" activeClassName="active-link">
                  Sign In
                </NavLink>
                <NavLink to="/signup" activeClassName="active-link">
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
