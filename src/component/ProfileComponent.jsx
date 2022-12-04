import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {useNavigate} from "react-router-dom";

library.add(faEnvelope, faLock);

export function ProfileComponent(props) {
    const navigate = useNavigate();

    function annuler() {
        navigate("/");
    }

    return <div className="container">
        <div className="section">
            <div className="content">
                <main>
                    <form>
                        <div className="field">
                            <label htmlFor="email" className="label">Email</label>
                            <div className="control has-icons-left">
                                <input id="email" type="email" defaultValue={props.defaultValues.email}
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
                                <input id="password" type="password" defaultValue={props.defaultValues.password}
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
                                <input id="confirmPassword" type="password" defaultValue={props.defaultValues.confirmPassword}
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
                                <button id="connexion" className="button is-success"
                                        disabled={props.error}
                                        onClick={props.actionCall}> {props.actionLabel}
                                </button>
                                <button className="button is-danger" onClick={annuler}>Annuler</button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>;
}
