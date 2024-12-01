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

  return (
    <div>
      <h2>Employee List</h2>

      {/* Add New Employee Button */}
      <button onClick={() => window.location.href = '/add-employee'}>Add New Employee</button>

      <ul>
        {employees.map((employee) => (
          <li key={employee._id}>
            {/* Display first name and last name */}
            <span>{employee.first_name} {employee.last_name}</span>

            {/* "See More Details" button */}
            <Link to={`/employees/${employee._id}`}>
              <button>See More Details</button>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EmployeeList;
