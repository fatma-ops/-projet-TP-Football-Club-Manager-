import Navbar from "../Components/Navbar";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {format} from "date-fns";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);
  const [matchs, setMatchs] = useState([]);
  const [marcheJoueurs, setMarcheJoueurs] = useState([]);
  const navigate = useNavigate();

  if (!window.sessionStorage.getItem("user")) {
    navigate("/login")
  }

  const userSession = JSON.parse(window.sessionStorage.getItem("user"));

  const matchsEquipe = async () => await axios.get(`http://localhost:4000/api/equipes/${user.club._id}/matches`)
    .then((response) => {
      setMatchs(response.data);
    }).catch((error) => {
      console.error(error);
    });

  const marcheDesJoueurs = async () => await axios.get(`http://localhost:4000/api/joueurs/market`)
    .then((response) => {
      setMarcheJoueurs(response.data);
    }).catch((error) => {
      console.error(error);
    });

  const ajouterJoueurEquipe = async (joueur) => {
    await axios.put(`http://localhost:4000/api/equipes/${user.club._id}/ajouter/${joueur._id}`)
      .then(() => {
        window.location.reload();
      }).catch((error) => {
        console.error(error);
      });
  }

  const vendreJoueurEquipe = async (joueur) => {
    await axios.put(`http://localhost:4000/api/equipes/${user.club._id}/vendre/${joueur._id}`)
      .then(() => {
        window.location.reload();
      }).catch((error) => {
        console.error(error);
      });
  }

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
      marcheDesJoueurs();
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
          <button type="button" onClick={() => vendreJoueurEquipe(joueur)} className={"btn btn-primary"}>Vendre
          </button>
        </div>
      </div>
    );
  });
  const prochainsMatchs = matchs.map((match) => {
    const equipeAdverse = match.equipeA.nom === user.club.nom ? match.equipeB.nom : match.equipeA.nom;
    return (
      <div key={match._id} className={"card"}>
        <div className={"card-body d-flex flex-column justify-content-center align-items-center"}>
          <h5 className={"card-title"}>Match contre {equipeAdverse}</h5>
          <p className={"card-text"}>Date: {new Date(match.dateDuMatch).toLocaleDateString() === new Date().toLocaleDateString() ? "Aujourd'hui" : format(match.dateDuMatch, "dd/MM/yyyy à HH:mm")}</p>
        </div>
      </div>
    );
  });

  const joueursEnVente = marcheJoueurs.map((joueur) => {
    return (
      <div key={joueur._id} className={"card"}>
        <div className={"card-body d-flex flex-column justify-content-center align-items-center"}>
          <h5 className={"card-title"}>{joueur.nom}</h5>
          <p className={"card-text"}>{joueur.age} ans</p>
          <p className={"card-text"}>Nationalité: {joueur.nationalite}</p>
          <p className={"card-text"}>Prix du joueur: {joueur.valeur} €</p>
          <p className={"card-text"}>Poste: {joueur.position}</p>
          <button type="button" onClick={() => ajouterJoueurEquipe(joueur)} className={"btn btn-primary"}>Acheter</button>
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
            {prochainsMatchs.length > 0 ? prochainsMatchs : <h5>Aucun match de prévu pour l'instant</h5>}
          </div>
          <h1 className={"text-center"}>Marché des joueurs</h1>
          <div className={"d-flex flex-row flex-wrap justify-content-center align-items-center gap-5 w-75 mb-5"}>
            {joueursEnVente.length > 0 ? joueursEnVente : <h5>Aucun joueur en vente pour l'instant</h5>}
          </div>
        </div>
      </div>
    </div>
  );
}
