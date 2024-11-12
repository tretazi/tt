import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import routes from '../src/Routes/Routes';
import '../src/sreen/login.css';

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    navigate('/Home');
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="text-center custom-title">Se Connecter</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control custom-input"
            name="username"
            placeholder="Nom d'utilisateur"
            value={credentials.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            className="form-control custom-input"
            name="password"
            placeholder="Mot de passe"
            value={credentials.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="btn custom-btn w-100"> Se connecter </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
