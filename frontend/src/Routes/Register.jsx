import React, { useState } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar';

const Register = () => {
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [motDePasse, setMotDePasse] = useState('');
  const [club, setClub] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/users/signup', { nom, email, motDePasse, club });
      console.log(response.data.message);
      setMessage(response.data.message);
    } catch (error) {
      console.error('Erreur lors de l\'inscription:', error.message);
      setMessage('Une erreur est survenue lors de l\'inscription.');
    }
  };

  return (
    <>
    <Navbar/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h2 className="text-center mb-4">Inscription</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="nom" className="form-label">Nom </label>
              <input type="text" className="form-control" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="mb-3">
              <label htmlFor="motDePasse" className="form-label">Mot de passe </label>
              <input type="password" className="form-control" id="motDePasse" value={motDePasse} onChange={(e) => setMotDePasse(e.target.value)} required />
            </div>
           
            <div className="mb-3">
              <label htmlFor="club" className="form-label">Club </label>
              <input type="text" className="form-control" id="club" value={club} onChange={(e) => setClub(e.target.value)} required />
            </div>
            <div className="mb-3 d-grid">
              <button type="submit" className="btn btn-primary">S'inscrire</button>
            </div>
            {message && <div className="mt-3 text-center">{message}</div>}
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default Register;
