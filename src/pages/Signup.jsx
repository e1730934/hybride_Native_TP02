import {useState} from "react";
import {useNavigate} from "react-router-dom";

export default function Signup() {

    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const navigate = useNavigate();


    function handleSetEmail(e) {
        setEmail(e.target.value);
    }

    function handleSetPassword(e) {
        setPassword(e.target.value);
    }

    function handleSetPasswordConfirm(e) {
        setPasswordConfirm(e.target.value);
    }
    function signUp(){

    }
    function annuler(){
        navigate("/");
    }

    return (
      <div className="container">
          <div className="section">
              <div className="content">
                  <div className="messages" tabIndex="0">
                      {error &&
                        <div className="message is-danger" style="white-space: pre;
                    border-color: red; border-width: 2px; border-style: solid;">
                            <p role="alert" className="message-body">{error}</p>
                        </div>
                      }
                      {success &&
                        <div className="message is-success">
                            <p role="alert" className="message-body">{success}</p>
                        </div>
                      }
                  </div>
                  <main>
                      <form>
                          <div className="field">
                              <label htmlFor="email" className="label">Email</label>
                              <div className="control has-icons-left">
                                  <input id="email" type="email" placeholder="e1234567@site.com"
                                         className="input" autoComplete="email"
                                         required aria-required="true"
                                         aria-describedby="descriptionEmail"
                                         onClick={handleSetEmail}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i></span>
                                  <span id="descriptionEmail" className="help is-success">
                                Le courriel de l'utilisateur.</span>
                              </div>
                          </div>
                          <div className="field">
                              <label htmlFor="password" className="label">Mot de passe</label>
                              <div className="control has-icons-left">
                                  <input id="password" type="password"
                                         placeholder="*******" className="input"
                                         autoComplete="password"
                                         required aria-required="true"
                                         aria-describedby="descriptionMdp"
                                         onClick={handleSetPassword}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i></span>
                                  <span id="descriptionMdp" className="help is-success">
                                Le mot de passe doit contenir au moins 6 caractères.
                            </span>
                              </div>
                          </div>
                          <div className="field">
                              <label htmlFor="confirmPassword" className="label">
                                  Confirmation mot de passe</label>
                              <div className="control has-icons-left">
                                  <input id="confirmPassword" type="password"
                                         placeholder="*******" className="input"
                                         autoComplete="password"
                                         required aria-required="true"
                                         aria-describedby="descriptionMdp"
                                         onClick={handleSetPasswordConfirm}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i></span>
                              </div>
                          </div>
                          <div className="field">
                              <div className="buttons">
                                  <button id="connexion" className="button is-success"
                                          onClick={signUp}> Connexion</button>
                                  <button className="button is-danger" onClick={annuler}>Annuler</button>
                              </div>
                          </div>
                      </form>
                  </main>
              </div>
          </div>
      </div>
    );

}
