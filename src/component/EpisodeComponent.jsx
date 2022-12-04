export function EpisodeComponent(props) {
    return <div className="column is-12">
        <div className="card">
            <div className="card-content">
                <div className="media">
                    <div className="media-content">
                        <p className="title is-4">{props.episode.title}</p>
                        <p className="subtitle is-6">{props.episode.isoDate}</p>
                        <p className={"subtitle is-6 has-text-justified"}>{props.episode.content}</p>
                        <audio style={{
                            width: "100%",
                            height: "50px",
                            borderRadius: "5px"
                        }} controls preload={"metadata"}>
                            <source src={props.episode
                              .audioUrl} type="audio/mpeg"/>
                        </audio>

                    </div>
                </div>
            </div>
        </div>
    </div>;
}
