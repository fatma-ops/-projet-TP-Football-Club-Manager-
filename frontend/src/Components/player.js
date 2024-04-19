import React, { useEffect, useState } from 'react';
import { getAllPlayers } from './api';

function App() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getAllPlayers()
      .then(response => {
        setPlayers(response.data);
      })
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div>
      <h1>Players</h1>
      <ul>
        {players.map(player => (
          <li key={player._id}>{player.nom} - {player.position}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
