import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/user-dashboard">User Dashboard</Link>
        <Link to="/admin-dashboard">Admin Dashboard</Link>
      </nav>
    </header>
  );
};

export default Header;
