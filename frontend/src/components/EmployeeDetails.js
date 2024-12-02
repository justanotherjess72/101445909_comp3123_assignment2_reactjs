import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../styles/employee-details.css';

const EmployeeDetails = () => {
  const { id } = useParams();  // Get employee ID from URL parameters
  const [employee, setEmployee] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Fetch employee details by ID
    const fetchEmployee = async () => {
      
        const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
        setEmployee(response.data);
      
    };

    fetchEmployee();
  }, [id]);  



  if (!employee) {
    return <p>Loading...</p>;
  }

  return (
    <div className="employee-details">
      <h2>Employee Details</h2>
      <p><strong>First Name:</strong> {employee.first_name}</p>
      <p><strong>Last Name:</strong> {employee.last_name}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Position:</strong> {employee.position}</p>
      <p><strong>Salary:</strong> {employee.salary}</p>
      <p><strong>Date of Joining:</strong> {employee.date_of_joining}</p>
      <p><strong>Department:</strong> {employee.department}</p>
    </div>
  );
};

export default EmployeeDetails;
