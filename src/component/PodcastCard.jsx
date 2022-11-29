import {useNavigate} from "react-router-dom";

export function PodcastCard({podcast}) {
    const navigate = useNavigate();
    //TODO: Use the navigate function to navigate to the podcast details page
    // eslint-disable-next-line no-unused-vars
    function HandleNavigationDetails() {
        navigate(`/podcast/${podcast.id}`);
    }


    return (
      <div className="column is-3-desktop is-4-tablet is-12-mobile">
          {/*TODO: Implement Card*/}</div>
    );
}
