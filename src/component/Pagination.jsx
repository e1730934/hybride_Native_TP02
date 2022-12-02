import {useEffect, useState} from "react";

export default function Pagination({podcast,  setPodcastPaginer}) {

    const [nbrPodcastParPage, setNbrPodcastParPage] = useState(() => {
        const localNbrPodcastParPage = window.localStorage.getItem("nbrPodcastParPage");
        if (localNbrPodcastParPage) {
            return localNbrPodcastParPage;
        }
        return 8;
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [nbrPage, setNbrPage] = useState(1);

    function handleNbrPodcastParPage(e) {
        setNbrPodcastParPage(e.target.value);
        window.localStorage.setItem("nbrPodcastParPage", e.target.value);
        setCurrentPage(1);
    }

    useEffect(() => {
        if(podcast.length > 0) {
        const array = [];
        podcast.forEach((podcast, index) => {
            if (index % nbrPodcastParPage === 0) {
                array.push([]);
            }
            array[array.length - 1].push(podcast);
        });
        setPodcastPaginer(array[currentPage - 1]);
        setNbrPage(array.length);
        }
    }, [podcast, currentPage, nbrPodcastParPage, setPodcastPaginer]);

    return (
      <div className="container">

                      <nav className="pagination" role="navigation" aria-label="pagination">
                          <button className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`}
                          onClick={() => {if (currentPage > 1) {setCurrentPage(currentPage - 1);}}}>&lt;
                          </button>
                          <button className={`pagination-next ${currentPage === nbrPage ? "is-disabled" : ""}`}
                                  onClick={() => {if (currentPage < nbrPage) {setCurrentPage(currentPage + 1);}}}>&gt;
                          </button>
                          <ul className="pagination-list">
                              <li>
                                    {Array.from(Array(nbrPage).keys()).map((page) => (
                                        <button
                                            key={page}
                                            className={`pagination-link ${page + 1 === currentPage ? "is-current" : ""}`}
                                            onClick={() => setCurrentPage(page + 1)}>
                                            {page + 1}
                                        </button>
                                    ))}
                              </li>
                          </ul>

                      </nav>

          <div className="level has-background-grey-light" style={{
              paddingTop: "20px",
              paddingBottom: "20px",
          }}>
                    <div className="level-item">
                      <div className="select">
                          <select value={nbrPodcastParPage.toString()}
                                  onChange={(e) => {handleNbrPodcastParPage(e);}}>
                              <option value="8">08 Podcasts</option>
                              <option value="16">12 Podcasts</option>
                              <option value="24">24 Podcasts</option>
                          </select>
                      </div>
                    </div>
          </div>
      </div>
    );
}
