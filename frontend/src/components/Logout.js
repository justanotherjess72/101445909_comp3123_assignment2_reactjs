import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const history = useNavigate();

  useEffect(() => {
    // Remove the token from local storage or cookies
    localStorage.removeItem('authToken');
    // Redirect the user to the login page
    history.push('/login');
  }, [history]);

  return <div>Logging out...</div>;
};

export default Logout;
