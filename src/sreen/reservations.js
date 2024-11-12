import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import '../sreen/re.css'; // Importation du CSS personnalisé

const Res = () => {
  const [reservations, setReservations] = useState([]);
  const [selectedReservation, setSelectedReservation] = useState(null);

  // Ajouter une réservation
  const addReservation = (reservation) => {
    setReservations([...reservations, { ...reservation, id: Date.now(), statut: 'en attente' }]);
  };

  // Confirmer une réservation
  const confirmReservation = (id) => {
    setReservations(reservations.map(reservation => 
      reservation.id === id ? { ...reservation, statut: 'confirmée' } : reservation
    ));
  };

  // Annuler une réservation
  const cancelReservation = (id) => {
    setReservations(reservations.filter(reservation => reservation.id !== id));
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <h1 className="text-center custom-title">Gestion des Réservations</h1>

        {/* Formulaire pour ajouter une réservation */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <ReservationForm addReservation={addReservation} />
          </div>
        </div>

        {/* Liste des réservations */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <ReservationList
              reservations={reservations}
              setSelectedReservation={setSelectedReservation}
              confirmReservation={confirmReservation}
              cancelReservation={cancelReservation}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

const ReservationForm = ({ addReservation }) => {
  const [reservationData, setReservationData] = useState({
    client: '',
    dateDepart: '',
    nombrePlaces: '',
    classe: 'Classic'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReservationData({ ...reservationData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addReservation(reservationData);
    setReservationData({ client: '', dateDepart: '', nombrePlaces: '', classe: 'Classic' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" className="form-control mb-3 custom-input" name="client" placeholder="Nom du client" value={reservationData.client} onChange={handleChange} required />
      <input type="date" className="form-control mb-3 custom-input" name="dateDepart" value={reservationData.dateDepart} onChange={handleChange} required />
      <input type="number" className="form-control mb-3 custom-input" name="nombrePlaces" placeholder="Nombre de places" value={reservationData.nombrePlaces} onChange={handleChange} required />
      <select className="form-control mb-3 custom-input" name="classe" value={reservationData.classe} onChange={handleChange}>
        <option value="VIP">VIP</option>
        <option value="Classic">Classic</option>
      </select>
      <button type="submit" className="btn btn-primary w-100 custom-btn">Réserver</button>
    </form>
  );
};

const ReservationList = ({ reservations, setSelectedReservation, confirmReservation, cancelReservation }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReservations = reservations.filter(reservation =>
    reservation.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
    reservation.dateDepart.includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="Rechercher par client ou date"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul>
        {filteredReservations.map(reservation => (
          <li key={reservation.id} className="mb-3">
            <div className="reservation-item" onClick={() => setSelectedReservation(reservation)}>
              Client: {reservation.client} - Date: {reservation.dateDepart} - Places: {reservation.nombrePlaces} - Classe: {reservation.classe} - Statut: {reservation.statut}
            </div>
            {reservation.statut === 'en attente' && (
              <button className="btn btn-success mt-2 w-100 custom-btn" onClick={() => confirmReservation(reservation.id)}>Confirmer</button>
            )}
            <button className="btn btn-danger mt-2 w-100 custom-btn" onClick={() => cancelReservation(reservation.id)}>Annuler</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Res;
