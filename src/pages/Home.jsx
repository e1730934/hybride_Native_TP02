import {useEffect, useState} from "react";
import {serveur} from "../constantes.js";
import {PodcastCard} from "../component/PodcastCard";
import FiltreNomPodcast from "../component/FiltreNomPodcast";

export default function Home(){

    const [podcast, setPodcast] = useState([]);
    const [nom, setNom] = useState("");

    useEffect(() => {
        async function getPodcasts() {
            const res = await fetch(`${serveur}/podcasts/top`);
            if (res.ok) {
                const data = await res.json();
                setPodcast(data);
            } else {
                console.log("Error Podcasts not loaded");
            }
        }
        getPodcasts().then(() => console.log("Podcasts loaded"));
    }, []);

    return(
        <div className="container">
            <div className="columns is-centered" style={{paddingTop:"20px",paddingBottom: "20px", paddingRight: "20px", paddingLeft:"20px"}}>
                <FiltreNomPodcast nom={nom} setNom={setNom}/>
            </div>
            <div className="row columns is-multiline is-mobile">
                {podcast.map((p) => <PodcastCard key={p.podcastId} podcast={p}/>)}
            </div>
        </div>
    );
}
