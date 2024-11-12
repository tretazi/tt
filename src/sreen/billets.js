import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importer Bootstrap
import '../sreen/bi.css'; // Importation du CSS personnalisé

const billet = () => {
  const [tickets, setTickets] = useState([]);
  const [payments, setPayments] = useState([]);

  // Vérifier un billet
  const verifyTicket = (barcode) => {
    const ticket = tickets.find(ticket => ticket.barcode === barcode);
    return ticket ? ticket.isValid : false;
  };

  // Réimprimer un billet
  const reprintTicket = (id) => {
    const ticket = tickets.find(ticket => ticket.id === id);
    if (ticket) {
      console.log("Reimpression du billet:", ticket);
    }
  };

  // Suivre les paiements
  const updatePaymentStatus = (id, newStatus) => {
    setPayments(payments.map(payment => 
      payment.id === id ? { ...payment, status: newStatus } : payment
    ));
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <h1 className="text-center custom-title">Gestion des Billets et Paiements</h1>

        {/* Vérification des billets */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <TicketVerification verifyTicket={verifyTicket} />
          </div>
        </div>

        {/* Réimpression des billets */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <TicketReprint reprintTicket={reprintTicket} />
          </div>
        </div>

        {/* Suivi des paiements */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <PaymentTracking payments={payments} updatePaymentStatus={updatePaymentStatus} />
          </div>
        </div>
      </div>
    </div>
  );
};

const TicketVerification = ({ verifyTicket }) => {
  const [barcode, setBarcode] = useState('');
  const [isValid, setIsValid] = useState(null);

  const handleVerify = () => {
    setIsValid(verifyTicket(barcode));
  };

  return (
    <div>
      <h2>Vérification des Billets</h2>
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="Code-barres du billet"
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
      />
      <button className="btn btn-primary w-100 custom-btn" onClick={handleVerify}>
        Vérifier
      </button>
      {isValid !== null && (
        <p className={`mt-3 ${isValid ? 'text-success' : 'text-danger'}`}>
          {isValid ? "Billet valide" : "Billet invalide"}
        </p>
      )}
    </div>
  );
};

const TicketReprint = ({ reprintTicket }) => {
  const [ticketId, setTicketId] = useState('');

  const handleReprint = () => {
    reprintTicket(ticketId);
  };

  return (
    <div>
      <h2>Réimpression des Billets</h2>
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="ID du billet"
        value={ticketId}
        onChange={(e) => setTicketId(e.target.value)}
      />
      <button className="btn btn-primary w-100 custom-btn" onClick={handleReprint}>
        Réimprimer
      </button>
    </div>
  );
};

const PaymentTracking = ({ payments, updatePaymentStatus }) => {
  const [paymentId, setPaymentId] = useState('');
  const [newStatus, setNewStatus] = useState('');

  const handleStatusUpdate = () => {
    updatePaymentStatus(paymentId, newStatus);
    setPaymentId('');
    setNewStatus('');
  };

  return (
    <div>
      <h2>Suivi des Paiements</h2>
      <input
        type="text"
        className="form-control mb-3 custom-input"
        placeholder="ID du paiement"
        value={paymentId}
        onChange={(e) => setPaymentId(e.target.value)}
      />
      <select
        className="form-control mb-3 custom-input"
        value={newStatus}
        onChange={(e) => setNewStatus(e.target.value)}
      >
        <option value="">Sélectionner le statut</option>
        <option value="réussi">Réussi</option>
        <option value="en attente">En attente</option>
        <option value="annulé">Annulé</option>
      </select>
      <button className="btn btn-primary w-100 custom-btn" onClick={handleStatusUpdate}>
        Mettre à jour
      </button>
    </div>
  );
};

export default billet;
