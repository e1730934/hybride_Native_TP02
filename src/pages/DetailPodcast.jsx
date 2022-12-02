import {useParams} from "react-router-dom";

export default function DetailPodcast(){
    const {podcastId} = useParams();
    return (
      <div className="level is-mobile is-centered" style={{paddingTop:"20px"}}>
              <p className="level-item has-text-centered">
                    Podcast: {podcastId}
              </p>
      </div>
    );
}
