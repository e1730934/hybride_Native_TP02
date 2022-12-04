import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {serveur} from "../constantes.jsx";
import {useValidationSignUp} from "../customHooks/UseValidationSignUp.jsx";

export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [errorMessageDetail, setErrorMessageDetail] = useState("");
    const [errorMessageDetailDisplayed, setErrorMessageDetailDisplayed] = useState(false);


    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [emailRequirementValue, setEmailRequirementValue] = useState({
        containsAt: false,
    });
    const [passwordRequirementValue, setPasswordRequirementValue] = useState({
        containsNumber: false,
        containsUppercase: false,
        containsLowercase: false,
        containsSpecial: false,
        containsRightLength: false,
        match: false,
    });
    useValidationSignUp(email, password, passwordConfirm, emailRequirementValue, setEmailRequirementValue, passwordRequirementValue, setPasswordRequirementValue, setError, setErrorMessage);

    async function signUp() {
        console.log("signUp");
        console.log(`error: ${error}
        errorMessage: ${errorMessage}
        errorMessageDetail: ${errorMessageDetail}
        errorMessageDetailDisplayed: ${errorMessageDetailDisplayed}`);
        if (error === false) {
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
        else{
            setErrorMessageDetail(errorMessage);
            setErrorMessageDetailDisplayed(true);
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
                      {
                        errorMessageDetailDisplayed &&
                        <article className={`message is-danger ${(errorMessageDetailDisplayed===true)  ? "is-hidden" : ""}`}>
                            <div className="message-header">
                                <p>Erreur</p>
                                <button className="delete" aria-label="delete" onClick={
                                    () => setErrorMessageDetail("")
                                }></button>
                            </div>
                            <div className="message-body">
                                {errorMessageDetail}
                            </div>
                        </article>
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
                                        className={`help ${emailRequirementValue.containsAt ? "is-success " : "is-danger"}`}>
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
                                          onClick={signUp}> Inscription
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
