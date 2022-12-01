import {Link, useNavigate} from "react-router-dom";
import React, {useContext, useState} from "react";
import {Context} from "../../App.jsx";


export default function Header() {
    const {token, setToken} = useContext(Context);
    const [navbarToggle, setNavbarToggle] = useState(false);
    const navigate = useNavigate();

    function disconnect() {
        setToken(null);
        window.localStorage.removeItem("token");
        navigate("/");
    }
    function toggleNavbar() {
        setNavbarToggle(!navbarToggle);
    }

    return (
        <nav className="navbar" role="navigation" aria-label="main navigation">
            <div className="navbar-brand">
                <div className="navbar-item">&nbsp;</div>
                <a
                    role="button"
                    className={"navbar-burger burger "}
                    aria-label="menu"
                    aria-expanded="false"
                    data-target="navbarBasicExample"
                    onClick={toggleNavbar}>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                    <span aria-hidden="true"/>
                </a>
            </div>
            <div id="navbarBasicExample" className={`navbar-menu ${navbarToggle ? "is-active" : ""}`}
            >
                <div className="navbar-start">
                    <Link to="/" className="navbar-item">HOME</Link>
                </div>
                <div className="navbar-end">
                    <div className="navbar-item">
                        <div className="buttons">
                            {
                                !token && (
                                    <div>
                                        <Link to="/login" className="button is-light">Login</Link>
                                    </div>
                                )
                            }
                            {
                                token
                                && <div>
                                    <Link to="/subscriptions" className="button is-light">Subscriptions</Link>
                                    <Link to="/profile" className="button is-light">Profile</Link>
                                    <Link to="/" className="button is-danger" onClick={disconnect}>Déconnexion</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
