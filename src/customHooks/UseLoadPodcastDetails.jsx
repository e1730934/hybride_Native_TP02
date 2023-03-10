import {useEffect} from "react";
import {serveur} from "../constantes.jsx";

export default function useLoadPodcastDetails(podcastId, setPodcastInfo) {
    useEffect(() => {
        async function getPodcastInfo() {
            const res = await fetch(`${serveur}/podcast?podcastId=${podcastId}`);
            if (res.ok) {
                const data = await res.json();
                setPodcastInfo(data);
            }
        }

        getPodcastInfo();
    }, [podcastId, setPodcastInfo]);
}
