import React, { useState, useEffect } from 'react';

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
  
  export default ActionHistory ;