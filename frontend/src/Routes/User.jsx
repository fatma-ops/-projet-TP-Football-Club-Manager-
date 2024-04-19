import Navbar from "../Components/Navbar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchs, setMatchs] = useState([]);

  const userSession = window.sessionStorage.getItem("user") || {_id: "6621177fad7fc5d893090f36"};

  const matchsEquipe = async () => await axios.get(`http://localhost:4000/api/equipes/${user.club._id}/matches`)
    .then((response) => {
      setMatchs(response.data);
    });

  useEffect(() => {
    axios.get(`http://localhost:4000/api/users/${userSession._id}`)
      .then((response) => {
        setUser(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [userSession._id]);

  useEffect(() => {
    if (user.club) {
      matchsEquipe();
    }
  }, [user]);

  if (loading) {
    return (
      <div className={"vw-100 vh-100 d-flex justify-content-center align-items-center"}>
        <div className={"spinner-border"} role={"status"}>
          <span className={"visually-hidden"}>Chargement...</span>
        </div>
      </div>
    );
  }

  const compositionEquipe = user.club.joueurs.map((joueur) => {
    return (
      <div key={joueur._id} className={"card"}>
        <div className={"card-body d-flex flex-column justify-content-center align-items-center"}>
          <h5 className={"card-title"}>{joueur.nom}</h5>
          <p className={"card-text"}>{joueur.age} ans</p>
          <p className={"card-text"}>Nationalité: {joueur.nationalite}</p>
          <p className={"card-text"}>Prix du joueur: {joueur.valeur} €</p>
          <p className={"card-text"}>Poste: {joueur.position}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={"vw-100 vh-100 overflow-auto"}>
      <Navbar/>
      <div className={"d-flex flex-column justify-content-center align-items-center"}>
        <h1 className={"text-center my-5"}>Page d'utilisateur de {user.nom}</h1>
        <div className={"d-flex justify-content-center align-items-center gap-5 flex-column w-100"}>
          <div className={"card w-25 d-flex justify-content-center align-items-center"}>
            <div className={"card-body d-flex flex-wrap flex-column justify-content-center align-items-center"}>
              <h5 style={{fontSize: "2.5em"}} className={"card-title fw-bold"}>Equipe</h5>
              <p style={{fontSize: "2em"}} className={"card-text"}>{user.club.nom}</p>
              <p style={{fontSize: "1.5em"}} className={"card-text"}>Budget actuel: {user.club.budget} €</p>
            </div>
          </div>
          <h1 className={"text-center mt-5"}>Composition de l'équipe</h1>
          <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 w-75"}>
            {compositionEquipe.length > 0 ? compositionEquipe : <h5>Aucun joueur dans l'équipe</h5>}
          </div>

          <h1 className={"text-center mt-5"}>Prochains matchs</h1>
          <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 w-75"}>
        </div>
      </div>
    </div>
  </div>
  );
}
