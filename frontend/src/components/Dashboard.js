import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div>
      <h1>Welcome to the Dashboard</h1>
      <p>This is a simple dashboard page where users can view their profile and activities.</p>

      <h3>Quick Links:</h3>
      <ul>
        <li>
          <Link to="/profile">View Profile</Link>
        </li>
        <li>
          <Link to="/settings">Account Settings</Link>
        </li>
        <li>
          <Link to="/logout">Logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Dashboard;
