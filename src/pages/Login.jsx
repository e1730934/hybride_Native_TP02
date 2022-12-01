import { Link, useNavigate } from "react-router-dom";
import React, {useContext, useEffect, useState} from "react";
import { serveur } from "../constantes.jsx";
import { Context } from "../App.jsx";

export default function Login() {
    const [email, setEmail] = useState("e1730934@site.com");
    const [password, setPassword] = useState("eE1730934!");
    const { token, setToken } = useContext(Context);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    async function loginUser() {
        const body = {
            email, password,
        };
        try {
            const resToken = await fetch(`${serveur}/auth/token`, {
                headers: { "Content-Type": "application/json" },
                method: "POST",
                body: JSON.stringify(body),
            });
            if (resToken.ok) {
                const data = await resToken.json();
                setToken(data.token);
                localStorage.setItem("token", data.token);
            } else {
                setError(resToken.message);
                console.error("une erreur s'est produite");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
      <div className="container">
          <div className="section">
              {error!==null &&
                <article className={`message is-danger ${error===null ? "is-hidden" : ""}`}>
                    <div className="message-header">
                        <p>Erreur</p>
                        <button className="delete" aria-label="delete" onClick={
                            () => setError(null)
                        }></button>
                    </div>
                    <div className="message-body">
                        {error.message}
                    </div>
                </article>
              }
              <div className="content">
                  <div className="field">
                      <label htmlFor="email" className="label">Email</label>
                      <div className="control has-icons-left">
                          <input
                            id="email"
                            type="email"
                            placeholder="e1234567@site.com"
                            className="input"
                            autoComplete="email"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <span className="icon is-small is-left"><i className="fa fa-envelope"/></span>
                      </div>
                  </div>
                  <div className="field">
                      <label htmlFor="password" className="label">Password</label>
                      <div className="control has-icons-left">
                          <input
                            id="password"
                            type="password"
                            placeholder="*******"
                            className="input"
                            autoComplete="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <span className="icon is-small is-left"><i className="fa fa-lock" /></span>
                      </div>
                  </div>
                  <div className="field">
                      <div className="control">
                          <button id="connexion" className="button is-success" onClick={loginUser} style={{ marginRight: "0.25rem" }}>
                              Connexion
                          </button>
                          <Link to="/" className="button is-danger">Annuler</Link>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    );
}
