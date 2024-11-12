import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import '../sreen/cl.css'; // Importation du fichier CSS personnalisé

const Client = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);

  // Ajouter un client
  const addClient = (client) => {
    setClients([...clients, { ...client, id: Date.now() }]);
  };

  // Mettre à jour un client existant
  const updateClient = (updatedClient) => {
    setClients(clients.map(client => (client.id === updatedClient.id ? updatedClient : client)));
  };

  return (
    <div className="app-container">
      <div className="container mt-5">
        <h1 className="text-center custom-title">Gestion des Clients</h1>

        {/* Formulaire d'ajout ou de mise à jour du client */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <ClientForm addClient={addClient} selectedClient={selectedClient} updateClient={updateClient} />
          </div>
        </div>

        {/* Liste des clients */}
        <div className="card shadow-sm mb-4 custom-card">
          <div className="card-body">
            <ClientList clients={clients} setSelectedClient={setSelectedClient} />
          </div>
        </div>
      </div>
    </div>
  );
};

const ClientForm = ({ addClient, selectedClient, updateClient }) => {
  const [clientData, setClientData] = useState({
    nom: '',
    prenom: '',
    CNI: '',
    telephone: ''
  });

  useEffect(() => {
    if (selectedClient) setClientData(selectedClient);
  }, [selectedClient]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...clientData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedClient) {
      updateClient(clientData);
    } else {
      addClient(clientData);
    }
    setClientData({ nom: '', prenom: '', CNI: '', telephone: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="nom"
        placeholder="Nom"
        value={clientData.nom}
        onChange={handleChange}
        className="form-control mb-3 custom-input"
        required
      />
      <input
        type="text"
        name="prenom"
        placeholder="Prénom"
        value={clientData.prenom}
        onChange={handleChange}
        className="form-control mb-3 custom-input"
        required
      />
      <input
        type="text"
        name="CNI"
        placeholder="CNI"
        value={clientData.CNI}
        onChange={handleChange}
        className="form-control mb-3 custom-input"
        required
      />
      <input
        type="text"
        name="telephone"
        placeholder="Téléphone"
        value={clientData.telephone}
        onChange={handleChange}
        className="form-control mb-3 custom-input"
        required
      />
      <button type="submit" className="btn btn-primary w-100 custom-btn">
        {selectedClient ? 'Mettre à jour' : 'Ajouter'}
      </button>
    </form>
  );
};

const ClientList = ({ clients, setSelectedClient }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClients = clients.filter(client =>
    client.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.CNI.includes(searchTerm) ||
    client.telephone.includes(searchTerm)
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Rechercher par nom, CNI, ou téléphone"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="form-control mb-3 custom-input"
      />
      <ul className="list-group">
        {filteredClients.map(client => (
          <li
            key={client.id}
            className="list-group-item list-group-item-action custom-list-item"
            onClick={() => setSelectedClient(client)}
          >
            {client.nom} {client.prenom} - {client.telephone}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Client;
