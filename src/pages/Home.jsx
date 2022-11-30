import {useEffect, useState} from "react";
import {serveur} from "../constantes.jsx";
import {PodcastCard} from "../component/PodcastCard";
import FiltreNomPodcast from "../component/FiltreNomPodcast";
import Pagination from "../component/Pagination";

export default function Home(){

    const [podcast, setPodcast] = useState([]);
    const [podcastFiltrer, setPodcastFiltrer] = useState([]);
    const [filtreNomPodcast, setFiltreNomPodcast] = useState("");
    const [podcastPaginer, setPodcastPaginer] = useState([]);



    useEffect(() => {
        setPodcastFiltrer(podcast.filter(podcast => podcast.name.toLowerCase().includes(filtreNomPodcast.toLowerCase())));}
      , [podcast,filtreNomPodcast]);

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
            <div className="columns is-centered" style={{padding: "20px"}}>
                <FiltreNomPodcast nom={filtreNomPodcast} setNom={setFiltreNomPodcast}/>
            </div>
            <div className="row columns is-multiline is-mobile">
                {
                    podcastPaginer.map((p) => <PodcastCard key={p.podcastId} podcast={p}/>)
                }
            </div>
            <Pagination podcast={podcastFiltrer} setPodcastPaginer={setPodcastPaginer}/>
        </div>
    );
}
