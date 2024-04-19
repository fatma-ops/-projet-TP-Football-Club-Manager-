import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../Components/Navbar'

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [selectedClub, setSelectedClub] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/users/');
        setUsers(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération des utilisateurs:', error.message);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
      alert('Utilisateur supprimé avec succès.');
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur:', error.message);
    }
  };

  const handleUserDetail = async (id) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${id}`);
      setSelectedClub(response.data);
    } catch (error) {
      console.error('Erreur lors de la récupération des détails de l\'utilisateur:', error.message);
    }
  };

  const handleModifiy = async (id) => {
   
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1>Liste des Utilisateurs</h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Nom</th>
              <th scope="col">Email</th>
              <th scope="col">isAdmin</th>
              <th scope="col">Club</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user._id}>
                <td>{user.nom}</td>
                <td>{user.email}</td>
                <td>{user.isAdmin ? 'Oui' : 'Non'}</td>
                <td>{user.club?.nom}</td>
                <td>
                  <div className="btn-group mr-2">
                    <button className="btn btn-primary" onClick={() => handleModifiy(user._id)}>Modifier</button>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>Supprimer</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        
      </div>
    </>
  );
};

export default Admin;


