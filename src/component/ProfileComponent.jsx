import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {useNavigate} from "react-router-dom";
import {useContext, useState} from "react";
import {Context} from "../App.jsx";

library.add(faEnvelope, faLock);

export function ProfileComponent(props) {
    const navigate = useNavigate();
    const [isModalActive, setIsModalActive] = useState(false);
    const {token} = useContext(Context);

    function toggleModal() {
        setIsModalActive(!isModalActive);
    }
    function annuler() {
        navigate("/");
    }

    return <div className="container">
        {token !== null &&
        <div className={`modal ${isModalActive ? "is-active" : ""}`}>
            <div className="modal-background"></div>
            <div className="modal-card">
                <header className="modal-card-head">
                    <p className="modal-card-title">Supprimer le compte</p>
                    <button className="delete" aria-label="close" onClick={toggleModal}></button>
                </header>
                <section className="modal-card-body">
                    <p>Voulez-vous vraiment supprimer votre compte ?</p>
                </section>
                <footer className="modal-card-foot">
                    <button className="button is-danger" onClick={props.supprimerCompte}>Oui</button>
                    <button className="button is-success" onClick={toggleModal}>Non</button>
                </footer>
            </div>
        </div>
        }
        {props.errorMessages !== "" &&
          <div className="messages" tabIndex="0">
                <div className="message is-danger" style={{
                    whiteSpace: "pre", borderColor: "red",
                    borderWidth: "2px", borderStyle: "solid"
                }}>
                    <p role="alert" className="message-body">{props.errorMessages}</p>
                </div>
          </div>}
            <div className="section">
            <div className="content">
                <main>
                    <form>
                        <div className="field">
                            <label htmlFor="email" className="label">Email</label>
                            <div className="control has-icons-left">
                                <input id="email" type="email" defaultValue={props.defaultValues}
                                       placeholder="e1234567@site.com"
                                       className="input" autoComplete="email"
                                       required aria-required="true"
                                       aria-describedby="descriptionEmail"
                                       onChange={(e) => props.setter.setEmail(e.target.value)}/>
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="fa-solid fa-envelope"/></span>
                                {props.validation.emailRequirementValue &&
                                  <span id="descriptionEmail"
                                        className={`help ${props.validation.emailRequirementValue.containsAt ? "is-success " : "is-danger"}`}>
                                    Le courriel doit contenir contient le caractère @.</span>}
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
                                       onChange={(e) => props.setter.setPassword(e.target.value)}/>
                                <span className="icon is-small is-left">
                                     <FontAwesomeIcon icon="fa-solid fa-lock"/></span>
                                {props.validation.passwordRequirementValue &&
                                  <div>
                                <span id="descriptionMdp"
                                      className={`help ${props.validation.passwordRequirementValue.containsRightLength ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins 8 caractères.</span>
                                      <span id="descriptionMdp"
                                            className={`help ${props.validation.passwordRequirementValue.containsSpecial ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins un symbole parmi les suivants: !@#$%&*()[]</span>
                                      <span id="descriptionMdp"
                                            className={`help ${props.validation.passwordRequirementValue.containsUppercase ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins une lettre en majuscule.</span>
                                      <span id="descriptionMdp"
                                            className={`help ${props.validation.passwordRequirementValue.containsLowercase ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins une lettre en minuscule.</span>
                                  </div>}
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
                                       onChange={(e) => props.setter.setPasswordConfirm(e.target.value)}/>
                                <span className="icon is-small is-left">
                                     <FontAwesomeIcon icon="fa-solid fa-lock"/></span>
                            </div>
                            <span
                              className={`help ${props.validation.passwordRequirementValue.match ? "is-success " : "is-danger"}`}>
                                        Les mots de passe doivent être identiques.</span>
                        </div>
                        <div className="field">
                            <div className="buttons">
                                <button type={"button"} id="connexion" className="button is-success"
                                        disabled={props.error}
                                        onClick={props.actionCall}> {props.actionLabel}
                                </button>
                                {token && <button type={"button"} className="button is-danger" onClick={toggleModal}>Supprimer le compte</button>}
                                <button type={"button"} className="button is-light" onClick={annuler}>Annuler</button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>;
}
