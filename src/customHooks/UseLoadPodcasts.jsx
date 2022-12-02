import {useEffect} from "react";
import {serveur} from "../constantes.jsx";

export function useLoadPodcasts(setPodcast) {
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
}
