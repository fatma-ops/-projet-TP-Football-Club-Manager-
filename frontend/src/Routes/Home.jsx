import Navbar from "../Components/Navbar";
import {Link} from "react-router-dom";


export default function Home() {
    return (
      <div className={"vw-100 vh-100 overflow-auto"} style={{backgroundImage: "url(https://sm.ign.com/t/ign_fr/news/e/ea-sports-/ea-sports-fc-24-fully-revealed-release-date-ultimate-team-an_bxcw.1200.jpg)", backgroundRepeat: "no-repeat", backgroundSize: "cover"}}>
        <Navbar/>
        <div style={{backgroundColor: "rgba(0,0,0,0.6)", backdropFilter:"blur(2px)"}} className={"d-flex justify-content-center w-100 min-vh-100 text-white"}>
            <div className={"d-flex flex-column text-center w-75"}>
                <h1 style={{fontSize: "3em"}} className={"my-5"}>Bienvenue sur Football Manager 2015</h1>
                <div style={{backgroundColor: "rgba(255,255,255,0.3)"}} className={"card d-flex flex-row flex-wrap justify-content-center align-items-center text-white"}>
                    <img style={{width: "200px", height:"250px"}} className={"img-fluid"} src="https://library.sportingnews.com/2021-11/lionel-messi-fut-base-93_1o3m39jkuh20j1itc0w2pe9x0d.png" alt="Card image cap"/>
                    <div className={"card-body d-flex justify-content-center align-items-center flex-column text-center w-50"}>
                        <h2 className={"card-title fw-bold"}>Le meilleur jeu de gestion de football jamais créé</h2>
                        <p style={{wordBreak: "break-word"}} className={"card-text"}>Le joyau de la couronne des jeux de gestion de football ! Plongez dans l'univers passionnant où vous prenez les rênes d'un club de football et le guidez vers la gloire. Dans cette édition, vous découvrirez des fonctionnalités inégalées, des graphismes époustouflants et une immersion totale dans le monde du football professionnel.
                        Prenez le contrôle complet de votre équipe : gérez les transferts, les tactiques, les séances d'entraînement et bien plus encore. <br/>Chaque décision compte alors que vous rivalisez pour la victoire dans les ligues nationales et internationales. Les défis sont nombreux, mais avec la bonne stratégie et une dose de passion, vous pouvez mener votre équipe vers des sommets inégalés.
                        Rencontrez des joueurs légendaires, élaborez des stratégies gagnantes et affrontez les meilleurs clubs du monde dans votre quête pour devenir le meilleur manager de football. Avec Football Manager 2015, l'excitation du terrain se mêle à la stratégie hors du terrain pour une expérience de jeu inoubliable.
                        Êtes-vous prêt à relever le défi et à devenir une légende du football ? Rejoignez-nous dès maintenant et commencez votre voyage vers la gloire sur Football Manager 2015 !
                        </p>
                        <Link to={"/register"} className={"btn btn-primary w-75"}><h1>Devenez un entraîneur !</h1></Link>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
}
