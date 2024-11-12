import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import '../sreen/vo.css'; // Importation du CSS personnalisé

const Voy = () => {
  const [voyages, setVoyages] = useState([]);
  const [selectedVoyage, setSelectedVoyage] = useState(null);

  // Ajouter un voyage
  const addVoyage = (voyage) => {
    setVoyages([...voyages, { ...voyage, id: Date.now(), statut: 'programmé' }]);
  };

  // Modifier un voyage existant
  const updateVoyage = (updatedVoyage) => {
    setVoyages(voyages.map(voyage => (voyage.id === updatedVoyage.id ? updatedVoyage : voyage)));
  };

  // Annuler un voyage
  const cancelVoyage = (id) => {
    setVoyages(voyages.map(voyage => 
      voyage.id === id ? { ...voyage, statut: 'annulé' } : voyage
    ));
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <h1 className="text-center custom-title">Gestion des Voyages</h1>

        {/* Formulaire pour ajouter ou modifier un voyage */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <VoyageForm addVoyage={addVoyage} selectedVoyage={selectedVoyage} updateVoyage={updateVoyage} />
          </div>
        </div>

        {/* Liste des voyages */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <VoyageList voyages={voyages} setSelectedVoyage={setSelectedVoyage} cancelVoyage={cancelVoyage} />
          </div>
        </div>
      </div>
    </div>
  );
};

const VoyageForm = ({ addVoyage, selectedVoyage, updateVoyage }) => {
  const [voyageData, setVoyageData] = useState({
    destination: '',
    date: '',
    heureDepart: '',
    totalPlaces: '',
    placesDisponibles: ''
  });

  useEffect(() => {
    if (selectedVoyage) setVoyageData(selectedVoyage);
  }, [selectedVoyage]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setVoyageData({ ...voyageData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedVoyage) {
      updateVoyage(voyageData);
    } else {
      addVoyage(voyageData);
    }
    setVoyageData({ destination: '', date: '', heureDepart: '', totalPlaces: '', placesDisponibles: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="form-control mb-3 custom-input" name="destination" placeholder="Destination" value={voyageData.destination} onChange={handleChange} required />
      <input type="date" className="form-control mb-3 custom-input" name="date" value={voyageData.date} onChange={handleChange} required />
      <input type="time" className="form-control mb-3 custom-input" name="heureDepart" value={voyageData.heureDepart} onChange={handleChange} required />
      <input type="number" className="form-control mb-3 custom-input" name="totalPlaces" placeholder="Total de places" value={voyageData.totalPlaces} onChange={handleChange} required />
      <input type="number" className="form-control mb-3 custom-input" name="placesDisponibles" placeholder="Places disponibles" value={voyageData.placesDisponibles} onChange={handleChange} required />
      <button type="submit" className="btn btn-primary w-100 custom-btn">{selectedVoyage ? 'Mettre à jour' : 'Ajouter'}</button>
    </form>
  );
};

const VoyageList = ({ voyages, setSelectedVoyage, cancelVoyage }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredVoyages = voyages.filter(voyage =>
    voyage.destination.toLowerCase().includes(searchTerm.toLowerCase()) ||
    voyage.date.includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="Rechercher par destination ou date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredVoyages.map(voyage => (
          <li key={voyage.id} className="mb-3">
            <div className="voyage-item" onClick={() => setSelectedVoyage(voyage)}>
              <strong>{voyage.destination}</strong> - {voyage.date} - {voyage.heureDepart}
            </div>
            {voyage.statut === 'programmé' && (
              <button className="btn btn-danger mt-2 w-100 custom-btn" onClick={() => cancelVoyage(voyage.id)}>Annuler</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Voy;
