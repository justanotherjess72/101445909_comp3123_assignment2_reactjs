import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';  // Import useNavigate hook
//import '../styles/add-employee.css';

const AddEmployee = () => {
  const [employee, setEmployee] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    salary: '',
    date_of_joining: '',
    department: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();  // Declare navigate function

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee({
      ...employee,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/employees', employee);
      console.log('Employee added:', response.data);
      // Navigate back to the employee list page
      navigate('/employee-list');  // Redirect to employee list page
    } catch (error) {
      setError('Error adding employee. Please try again.');
      console.error('Error adding employee:', error);
    }
  };

  return (
    <div className="container">
      <h2>Add New Employee</h2>
      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="first_name"
            value={employee.first_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="last_name"
            value={employee.last_name}
            onChange={handleChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={employee.email}
            onChange={handleChange}
          />
        </label>

        <label>
          Position:
          <input
            type="text"
            name="position"
            value={employee.position}
            onChange={handleChange}
          />
        </label>

        <label>
          Salary:
          <input
            type="number"
            name="salary"
            value={employee.salary}
            onChange={handleChange}
          />
        </label>

        <label>
          Date of Joining:
          <input
            type="date"
            name="date_of_joining"
            value={employee.date_of_joining}
            onChange={handleChange}
          />
        </label>

        <label>
          Department:
          <input
            type="text"
            name="department"
            value={employee.department}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Add Employee</button>
      </form>
    </div>
  );
};

export default AddEmployee;
