// src/routes.js
import React from 'react';
import { Route } from 'react-router-dom';
import Login from '../sreen/login';
import Employes from '../sreen/employes';
import Client from '../sreen/clients';
import Voy from '../sreen/voyages';
import Res from '../sreen/reservations';
import Home from '../sreen/Home';



// Définition des routes
const routes = [
  {
    path: '/Login',
    element: <Login />,
    exact: true,
  },

  {
    path: '/Employes',
    element: <Employes />,
    exact: true,
  },


  {
    path: '/Client',
    element: <Client />,
    exact: true,
  },

  {
    path: '/Voy',
    element: <Voy />,
    exact: true,
  },

  {
    path: '/Res',
    element: <Res />,
    exact: true,
  },
  {
    path: '/Home',
    element: <Home />,
    exact: true,
  },



  // Ajoutez d'autres routes ici si nécessaire
];

export default routes;
