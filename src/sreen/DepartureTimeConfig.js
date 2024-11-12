import React, { useState, useEffect } from 'react';

const DepartureTimeConfig = ({ updateDepartureTime }) => {
    const [departureTime, setDepartureTime] = useState('');
  
    const handleChange = (e) => {
      setDepartureTime(e.target.value);
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      updateDepartureTime({ time: departureTime });
      setDepartureTime('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <h2>Configurer les Horaires de Départ</h2>
        <input
          type="time"
          value={departureTime}
          onChange={handleChange}
          required
        />
        <button type="submit">Mettre à jour l'heure de départ</button>
      </form>
    );
  };

  export default DepartureTimeConfig ;