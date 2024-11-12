import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap CSS
import '../sreen/Em.css'; // Importation du fichier CSS personnalisé
import EmployeeForm from '../sreen/EmployeeForm';
import EmployeeList from '../sreen/EmployeeList';
import ActionHistory from '../sreen/ActionHistory';
import DepartureTimeConfig from '../sreen/DepartureTimeConfig';

const Employes = () => {
  const [employees, setEmployees] = useState([]);
  const [actions, setActions] = useState([]);
  const [departureTimes, setDepartureTimes] = useState([]);

  // Ajouter ou modifier un employé
  const addEmployee = (employee) => {
    setEmployees([...employees, { ...employee, id: Date.now() }]);
  };

  // Ajouter une action à l'historique
  const addAction = (action) => {
    setActions([...actions, { ...action, id: Date.now() }]);
  };

  // Mettre à jour l'horaire de départ
  const updateDepartureTime = (newTime) => {
    setDepartureTimes([...departureTimes, { ...newTime, id: Date.now() }]);
  };

  return (
    <div className="app-background">
      <div className="container mt-5">
        <h1 className="text-center mb-4 custom-title">Gestion des Employés</h1>

        {/* Formulaire d'ajout d'employé */}
        <div className="card mb-4 custom-card">
          <div className="card-body">
            <EmployeeForm addEmployee={addEmployee} />
          </div>
        </div>

        {/* Liste des employés */}
        <div className="card mb-4 custom-card">
          <div className="card-body">
            <EmployeeList employees={employees} />
          </div>
        </div>

        {/* Historique des actions */}
        <div className="card mb-4 custom-card">
          <div className="card-body">
            <ActionHistory actions={actions} />
          </div>
        </div>

        {/* Configuration des horaires de départ */}
        <div className="card mb-4 custom-card">
          <div className="card-body">
            <DepartureTimeConfig updateDepartureTime={updateDepartureTime} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employes;
