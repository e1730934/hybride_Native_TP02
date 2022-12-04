import {useNavigate} from "react-router-dom";

export function PodcastCard({podcast}) {
    const navigate = useNavigate();

    function HandleNavigationDetails() {
        navigate(`/podcast/${podcast.podcastId}`);
    }

    return (
      <div className="column is-3-desktop is-4-tablet is-12-mobile" onClick={HandleNavigationDetails}>
          <div className="card">
              <div className="card-image">
                  <figure className="image is-4by3">
                      <img src={podcast.artworkUrl} alt={podcast.name}/>
                  </figure>
              </div>
              <div className="card-content" style={{height: "9em"}}>
                  <div className="media">
                      <div className="media-content">
                          <p className="title is-4">{podcast.name}</p>
                          <p className="subtitle is-6">{podcast.artist}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}
