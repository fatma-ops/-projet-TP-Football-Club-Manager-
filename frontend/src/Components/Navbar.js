import { Link } from "react-router-dom";

import { useState, useEffect } from 'react';

const useScreenSize = () => {
    const [screenSize, setScreenSize] = useState({
        width: window.innerWidth,
        height: window.innerHeight,
    });

    useEffect(() => {
        const handleResize = () => {
            setScreenSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        window.addEventListener('resize', handleResize);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return screenSize;
};

export default function Navbar() {
    const [userSession, setUserSession] = useState(JSON.parse(window.sessionStorage.getItem("user")));

    useEffect(() => {
        const handleStorageChange = () => {
            setUserSession(JSON.parse(window.sessionStorage.getItem("user")));
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const screenSize = useScreenSize();
    return (
      <div>
          <nav style={{backgroundColor: "#e3f2fd"}} className={"navbar navbar-expand-lg"}>
              <div className={"container-fluid"}>
                  <Link to={"/"} className={"navbar-brand"}>Football Manager 2025</Link>
                  <button className={"navbar-toggler"} type="button" data-bs-toggle="collapse"
                          data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                          aria-label="Toggle navigation">
                      <span className={"navbar-toggler-icon"}></span>
                  </button>
                  <div className={"collapse navbar-collapse"} id="navbarNavAltMarkup">
                      <div className={"navbar-nav w-100"}>
                          <Link to={"/"} className={"nav-link"} aria-current="page">Accueil</Link>
                          {userSession ? (
                              <>
                                  <Link onClick={() => window.sessionStorage.clear()} to={"/"} style={{marginLeft: screenSize.width > 900 ? "auto" : "", width:screenSize.width < 900 ? "50%" : ""}} className={"btn btn-danger"}>Déconnexion</Link>
                                  {userSession.isAdmin && (
                    <Link to={"/admin"} style={{ width: screenSize.width < 900 ? "50%" : "" }} className={"btn btn-primary ms-2"}>Panel admin</Link>
                  )}
                              </>
                          ) :
                            <>
                                <Link to={"/login"} style={{marginLeft: screenSize.width > 900 ? "auto" : "", width:screenSize.width < 900 ? "50%" : ""}} className={"btn btn-success"}>Connexion</Link>
                                <Link to={"/register"} style={{width:screenSize.width < 900 ? "50%" : ""}} className={"btn btn-primary ms-2"}>Inscription</Link>

                            </>
                          }
                      </div>
                  </div>
              </div>
          </nav>
      </div>
    );
}
