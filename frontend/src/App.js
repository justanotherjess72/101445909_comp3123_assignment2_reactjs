import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import EmployeeList from './components/EmployeeList';
import AddEmployee from './components/AddEmployee';
import EmployeeDetails from './components/EmployeeDetails';
import UpdateEmployee from './components/UpdateEmployee';

const SignoutButton = () => {
  const handleSignout = () => {
    localStorage.removeItem('authToken'); // Remove the authToken from localStorage
    window.location.href = '/login'; // Redirect to login page after signout
  };

  return (
    <button onClick={handleSignout} style={signoutButtonStyle}>
      Sign Out
    </button>
  );
};

const signoutButtonStyle = {
  position: 'absolute',
  top: '10px',
  right: '10px',
  padding: '10px 15px',
  backgroundColor: '#f44336',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

const App = () => {
  const isAuthenticated = !!localStorage.getItem('authToken');

  return (
    <Router>
      <Routes>
        {/* Redirect to login if user is not authenticated */}
        <Route path="/login" element={isAuthenticated ? <Navigate to="/" /> : <Login />} />

        {/* After login, show signout button */}
        <Route path="/" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/employee-list" element={isAuthenticated ? <EmployeeList /> : <Navigate to="/login" />} />
        <Route path="/add-employee" element={isAuthenticated ? <AddEmployee /> : <Navigate to="/login" />} />
        <Route path="/employees/:eid" element={isAuthenticated ? <EmployeeDetails /> : <Navigate to="/login" />} />
        <Route path="/employees/update/:id" element={<UpdateEmployee />} />

        {/* Logout route to sign out */}
        <Route path="/logout" element={<Logout />} />
      </Routes>

      
      {/* Show signout button on all pages except the login page */}
      {/*isAuthenticated && (
        <div style={{ position: 'relative', height: '100%' }}>
          <SignoutButton />
        </div>
      )*/}
    </Router>
  );
};

export default App;
