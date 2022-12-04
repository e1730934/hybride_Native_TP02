import {useEffect, useState} from "react";

export default function Pagination({element, setElement}) {
    const defaultElementParPage = 8;

    const [nbrElementParPage, setNbrElementParPage] = useState(() => {
        const localNbrPodcastParPage = window.localStorage.getItem("nbrElementParPage");
        if (localNbrPodcastParPage) {
            return localNbrPodcastParPage;
        }
        return defaultElementParPage;
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [nbrPage, setNbrPage] = useState(1);

    function handleNbrElementParPage(e) {
        setNbrElementParPage(e.target.value);
        window.localStorage.setItem("nbrElementParPage", e.target.value);
        setCurrentPage(1);
    }

    useEffect(() => {
        if (element.length > 0) {
            const array = [];
            element.forEach((podcast, index) => {
                if (index % nbrElementParPage === 0) {
                    array.push([]);
                }
                array[array.length - 1].push(podcast);
            });
            setElement(array[currentPage - 1]);
            setNbrPage(array.length);
        }
    }, [element, currentPage, nbrElementParPage, setElement]);

    return (
      <div className="container">
          <nav className="pagination" role="navigation" aria-label="pagination">
              <button className={`pagination-previous ${currentPage === 1 ? "is-disabled" : ""}`}
                      onClick={() => {
                          if (currentPage > 1) {
                              setCurrentPage(currentPage - 1);
                          }
                      }}>&lt;
              </button>
              <button className={`pagination-next ${currentPage === nbrPage ? "is-disabled" : ""}`}
                      onClick={() => {
                          if (currentPage < nbrPage) {
                              setCurrentPage(currentPage + 1);
                          }
                      }}>&gt;
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
                      <select value={nbrElementParPage.toString()}
                              onChange={(e) => {
                                  handleNbrElementParPage(e);
                              }}>
                          <option value="4">04 Elements</option>
                          <option value="8">08 Elements</option>
                          <option value="16">12 Elements</option>
                          <option value="24">24 Elements</option>
                      </select>
                  </div>
              </div>
          </div>
      </div>
    );
}
