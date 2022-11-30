import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPodcast} from "@fortawesome/free-solid-svg-icons";
import * as fontawesome from "@fortawesome/fontawesome-svg-core";

fontawesome.library.add(faPodcast);

export default function FiltreNomPodcast({nom, setNom}) {
    return (
      <div className="field is-horizontal">
          <div className="control has-icons-left has-icons-right">
              <div className="control">
                  <input
                    className="input is-rounded"
                    type="text"
                    placeholder="Nom du podcast"
                    value={nom}
                    onChange={(event) => {
                        setNom(event.target.value);
                    }}
                  />
                  <span className="icon is-small is-left">
            <FontAwesomeIcon icon="fa-solid fa-podcast" />
        </span>
              </div>
          </div>
      </div>
    );
}
