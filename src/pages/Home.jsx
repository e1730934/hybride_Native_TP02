import {useState} from "react";
import {PodcastCard} from "../component/PodcastCard";
import FiltreNomPodcast from "../component/FiltreNomPodcast";
import Pagination from "../component/Pagination";
import {useLoadPodcasts} from "../customHooks/UseLoadPodcasts.jsx";
import {useFiltrePordcasts} from "../customHooks/UseFiltrePordcasts.jsx";

export default function Home(){

    const [podcast, setPodcast] = useState([]);
    const [podcastFiltrer, setPodcastFiltrer] = useState([]);
    const [filtreNomPodcast, setFiltreNomPodcast] = useState("");
    const [podcastPaginer, setPodcastPaginer] = useState([]);


    useLoadPodcasts(setPodcast);
    useFiltrePordcasts(setPodcastFiltrer, podcast, filtreNomPodcast);

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
