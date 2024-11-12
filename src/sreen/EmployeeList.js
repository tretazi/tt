import React, { useState, useEffect } from 'react';

const EmployeeList = ({ employees }) => {
    return (
      <div>
        <h2>Liste des Employés</h2>
        <ul>
          {employees.map((employee) => (
            <li key={employee.id}>
              {employee.name} - Rôle: {employee.role}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const ActionHistory = ({ actions }) => {
    return (
      <div>
        <h2>Historique des Actions</h2>
        <ul>
          {actions.map((action) => (
            <li key={action.id}>
              {action.employee} a effectué l'action "{action.description}" le {action.date}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  export default EmployeeList ;