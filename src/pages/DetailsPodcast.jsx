import {useParams} from "react-router-dom";
import {useState} from "react";
import {useLoadPodcastDetails} from "../customHooks/UseLoadPodcastDetails.jsx";
import Pagination from "../component/Pagination";

export default function DetailsPodcast() {
    const {podcastId} = useParams();
    const [podcastInfo, setPodcastInfo] = useState({});
    const [podcastEpisodesPaginer, setPodcastEpisodesPaginer] = useState([]);


    useLoadPodcastDetails(podcastId, setPodcastInfo);

    return (
      <div className="section has-text-centered">
          <div className="container" style={{marginBottom:"20px"}}>
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
                                      <p className="subtitle is-6">{podcastInfo.description}</p>
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
                                            <div key={episode.episodeId} className="column is-12">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <div className="media">
                                                            <div className="media-content">
                                                                <p className="title is-4">{episode.title}</p>
                                                                <p className="subtitle is-6">{episode.isoDate}</p>
                                                                <p className={"subtitle is-6 has-text-justified"}>{episode.content}</p>
                                                                <audio style={{
                                                                    width: "100%",
                                                                    height: "50px",
                                                                    borderRadius: "5px"}} controls preload={"metadata"}>
                                                                    <source src={episode
                                                                        .audioUrl} type="audio/mpeg"/>
                                                                </audio>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
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
