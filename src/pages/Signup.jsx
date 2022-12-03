import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {serveur} from "../constantes.jsx";
import {useValidationSignUp} from "../customHooks/UseValidationSignUp.jsx";

export default function Signup() {
    const [error, setError] = useState(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");



    const [validationEmail, setValidationEmail] = useState({
        containsAt: false,
    });
    const [validationPassword,setValidationPassword] = useState({
        containsNumber: false,
        containsUppercase: false,
        containsLowercase: false,
        containsSpecial: false,
        containsRightLength: false,
        match: false,

    });
    const navigate = useNavigate();

    useValidationSignUp(email, password, passwordConfirm, setValidationEmail, setValidationPassword, setError, navigate);

    async function signUp() {
        if (validationResult !== null) {
            await fetch(`${serveur}/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            })
              .then((response) => {
                  if (response.ok) {
                      navigate("/login");
                  } else {
                      setError(response.message);
                  }
              })
              .catch((e) => {
                  setError(`Erreur lors de l'inscription \n${e.message}`);
              });
        }
    }

    function annuler() {
        navigate("/");
    }

    return (
      <div className="container">
          <div className="section">
              <div className="content">
                  <div className="messages" tabIndex="0">
                      {error &&
                        <div className="message is-danger" style={{
                            whiteSpace: "pre", borderColor: "red",
                            borderWidth: "2px", borderStyle: "solid"
                        }}>
                            <p role="alert" className="message-body">{error}</p>
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
                                         onChange={(e) => setEmail(e.target.value)}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-envelope"></i></span>
                                  <span id="descriptionEmail"
                                        className={`help ${validationEmail.containsAt ? "is-success " : "is-danger"}`}>
                                      Le courriel doit contenir contient le caractère @.</span>
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
                                         onChange={(e) => setPassword(e.target.value)}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i></span>
                                  <span id="descriptionMdp" className="help is-success">
                                Le mot de passe de l&apos;utilisateur.</span>
                                  <span id="descriptionMdp" className="help is-danger">
                                Le mot de passe contient au moins 8 caractères.</span>
                                  <span id="descriptionMdp" className="help is-danger">
                                Le mot de passe contient au moins un symbole parmi les suivants: !@#$%&*()[]</span>
                                  <span id="descriptionMdp" className="help is-danger">
                                Le mot de passe contient au moins une lettre en majuscule.</span>
                                  <span id="descriptionMdp" className="help is-danger">
                                Le mot de passe contient au moins une lettre en minuscule.</span>
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
                                         onChange={(e) => setPasswordConfirm(e.target.value)}/>
                                  <span className="icon is-small is-left">
                                    <i className="fa fa-lock"></i></span>
                              </div>
                          </div>
                          <div className="field">
                              <div className="buttons">
                                  <button id="connexion" className="button is-success"
                                          onClick={signUp}> Connexion
                                  </button>
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
