import {useParams} from "react-router-dom";
import {useContext, useState} from "react";

import EpisodeComponent from "../component/EpisodeComponent.jsx";
import Pagination from "../component/Pagination";
import {usePodcastSubscribeState} from "../customHooks/UsePodcastSubscribeState.jsx";
import useLoadPodcastDetails from "../customHooks/UseLoadPodcastDetails.jsx";
import {Context} from "../App.jsx";
import {serveur} from "../constantes.jsx";

export default function DetailsPodcast() {
    const {podcastId} = useParams();
    const [podcastInfo, setPodcastInfo] = useState({});
    const [podcastEpisodesPaginer, setPodcastEpisodesPaginer] = useState([]);
    const [isSubscribe, setIsSubscribe] = useState(false);
    const {token} = useContext(Context);

    useLoadPodcastDetails(podcastId, setPodcastInfo);
    usePodcastSubscribeState(podcastId, setIsSubscribe, token);

    async function toggleSubscribe() {
        if (token) {
            const bearerToken = `bearer ${token}`;
            const res = await fetch(`${serveur}/subscription?podcastId=${podcastId}`, {
                method: isSubscribe ? "DELETE" : "POST",
                headers: {authorization: bearerToken},
            });
            if (res.ok) {
                setIsSubscribe(!isSubscribe);
            }
        }
    }

    return (
      <div className="section has-text-centered">
          <div className="container" style={{marginBottom: "20px"}}>
              <div className="columns">
                  <div className="column is-4">
                      <div className="card">
                          <div className="card-image">
                              <figure className="image is-4by3">
                                  <img src={podcastInfo.artworkUrl} alt="podcast artwork"/>
                              </figure>
                          </div>
                          <div className="card-content">
                              <div className="media">
                                  <div className="media-content">
                                      <p className="title is-4">{podcastInfo.name}</p>
                                      <p className="subtitle is-6">{podcastInfo.artist}</p>
                                      {token &&
                                        <button
                                          className={`button is-rounded is-fullwidth ${isSubscribe ? "is-danger" : "is-success"}`}
                                          onClick={toggleSubscribe}>{isSubscribe ? "Se désabonner" : "S'abonner"}
                                        </button>
                                      }
                                      <p className="subtitle is-6 has-text-justified"
                                         style={{paddingTop: "20px"}}>{podcastInfo.description}</p>
                                      {
                                        Array.isArray(podcastInfo.genres) && podcastInfo.genres.length > 0 && (
                                          podcastInfo.genres.map((genre, index) => {
                                              return (<span key={index} className="tag is-light"
                                                            style={{marginRight: "5px"}}>{genre}</span>);
                                          }))
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="column is-8">
                      <div className="card">
                          <div className="card-content">
                              <div className="content">
                                  <h2 className={"title is-2"}>Episodes</h2>
                                  <div className={"columns is-multiline"}>
                                      {
                                        podcastEpisodesPaginer && podcastEpisodesPaginer.map((episode) =>
                                          <EpisodeComponent key={episode.episodeId} episode={episode}/>
                                        )
                                      }
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          {
            podcastInfo.episodes &&
            <Pagination element={podcastInfo.episodes} setElement={setPodcastEpisodesPaginer}/>
          }
      </div>
    );
}
