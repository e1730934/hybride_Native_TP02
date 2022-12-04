import {useContext, useState} from "react";
import {Context} from "../App.jsx";
import {useGetSubscribedPodcast} from "../customHooks/UsePodcastSubscribeState.jsx";
import {PodcastCard} from "../component/PodcastCard.jsx";
import Pagination from "../component/Pagination";

export function Subscription() {
    const [podcasts, setPodcasts] = useState([]);
    const [podcastsPaginer, setPodcastsPaginer] = useState([]);
    const {token} = useContext(Context);

    useGetSubscribedPodcast(token, setPodcasts);


    return (
      <div className="container">
          <h1 className="title has-text-centered">Mes abonnements</h1>
          <div className="row columns is-multiline is-mobile">
              {podcastsPaginer.map((p) => <PodcastCard key={p.podcastId} podcast={p}/>)}
          </div>
          <Pagination element={podcasts} setElement={setPodcastsPaginer}/>
      </div>
    );
}
