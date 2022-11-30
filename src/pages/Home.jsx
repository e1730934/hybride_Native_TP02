import {useEffect, useState} from "react";
import {serveur} from "../constantes.js";
import {PodcastCard} from "../component/PodcastCard";
import FiltreNomPodcast from "../component/FiltreNomPodcast";

export default function Home(){

    const [podcast, setPodcast] = useState([]);
    const [nom, setNom] = useState("");

    useEffect(() => {
        async function getPodcast() {
            const res = await fetch(`${serveur}/podcasts/top`);
            if (res.ok) {
                const data = await res.json();
                setPodcast(data);
            } else {
                console.log("Error Podcast not loaded");
            }
        }
        getPodcast().then(() => console.log("Podcast loaded"));
    }, []);

    return(
        <div className="container">
            <div className="columns is-centered">
                <FiltreNomPodcast nom={nom} setNom={setNom}/>
            </div>
            <div className="row columns is-multiline is-mobile">
                {podcast.map((p) => <PodcastCard key={p.id} podcast={p}/>)}
            </div>
        </div>
    );
}
