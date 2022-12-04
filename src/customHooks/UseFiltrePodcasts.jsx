import {useEffect} from "react";

export function useFiltrePodcasts(setPodcastFiltrer, podcast, filtreNomPodcast) {
    useEffect(() => {
          setPodcastFiltrer(podcast.filter(podcast => podcast.name.toLowerCase().includes(filtreNomPodcast.toLowerCase())));
      }
      , [podcast, filtreNomPodcast,setPodcastFiltrer]);
}
