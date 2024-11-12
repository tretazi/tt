import React, { useState, useEffect } from 'react';

const EmployeeForm = ({ addEmployee }) => {
    const [employeeData, setEmployeeData] = useState({
      name: '',
      role: 'agent',
      password: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setEmployeeData({ ...employeeData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      addEmployee(employeeData);
      setEmployeeData({ name: '', role: 'agent', password: '' });
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Ajouter un Employé</h2>
        <input
          type="text"
          name="name"
          placeholder="Nom de l'employé"
          value={employeeData.name}
          onChange={handleChange}
          required
        />
        <select name="role" value={employeeData.role} onChange={handleChange}>
          <option value="admin">Admin</option>
          <option value="agent">Agent</option>
        </select>
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={employeeData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Ajouter</button>
      </form>
    );
  };

  export default EmployeeForm ;