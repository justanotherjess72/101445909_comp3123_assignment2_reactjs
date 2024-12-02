import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/employee-list.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/employees');
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employee list:', error);
      }
    };
    fetchEmployees();
  }, []);

  const handleDeleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${id}`);
      // After deleting, refresh the employee list
      setEmployees(employees.filter(employee => employee._id !== id));
    } catch (error) {
      console.error('Error deleting employee:', error);
    }
  };

  const handleSignOut = () => {
    // Sign out logic (could be clearing tokens, redirecting to login, etc.)
    console.log('Signed out');
  };

  return (
    <div>
      {/* Sign-out button */}
      <button className="signout-btn" onClick={handleSignOut}>Sign Out</button>

      <h2>Employee List</h2>

      {/* Add New Employee Button */}
      <button onClick={() => window.location.href = '/add-employee'}>Add New Employee</button>

      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {/* Display first name and last name */}
            <span className="employee-name">{employee.first_name} {employee.last_name}</span>

            {/* "See More Details" button */}
            <Link to={`/employees/${employee._id}`}>
              <button className="details-btn">See More Details</button>
            </Link>

            {/* "Update Info" button */}
            <Link to={`/employees/update/${employee._id}`}>
              <button className="update-btn">Update Info</button>
            </Link>

            {/* "Delete Employee" button */}
            <button className="delete-btn" onClick={() => handleDeleteEmployee(employee._id)}>Delete Employee</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
