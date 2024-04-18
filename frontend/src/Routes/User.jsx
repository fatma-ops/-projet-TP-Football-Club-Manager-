import Navbar from "../Components/Navbar";
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function User() {
  const [user, setUser] = useState([]);
  const [loading, setLoading] = useState(true);

  const userSession = window.sessionStorage.getItem("user") || {_id: "6621177fad7fc5d893090f36"};

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

  if (loading) {
    return (
      <div className={"vw-100 vh-100 d-flex justify-content-center align-items-center"}>
        <div className={"spinner-border"} role={"status"}>
          <span className={"visually-hidden"}>Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={"vw-100 vh-100 overflow-auto"}>
      <Navbar/>
      <div className={"d-flex flex-column justify-content-center align-items-center"}>
        <h1 className={"text-center my-5"}>Page d'utilisateur de {user.nom}</h1>
        <div className={"d-flex justify-content-center align-items-center gap-5 flex-column w-50"}>
          <div className={"card w-50 d-flex justify-content-center align-items-center"}>
            <div className={"card-body d-flex flex-column justify-content-center align-items-center"}>
              <h5 className={"card-title"}>Equipe</h5>
              <p className={"card-text"}>{user.club.nom}</p>
              <p className={"card-text"}>Budget actuel: {user.club.budget} €</p>
            </div>
          </div>
          <div className={"card w-50 d-flex justify-content-center align-items-center"}>
            <div className={"card-body d-flex flex-column justify-content-center align-items-center"}>
              <h5 className={"card-title"}>Equipe</h5>
              <p className={"card-text"}>{user.club.nom}</p>
              <p className={"card-text"}>Budget actuel: {user.club.budget} €</p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
