import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

export function ProfileComponent(props) {
    return <div className="container">
        <div className="section">
            <div className="content">
                <main>
                    <form>
                        <div className="field">
                            <label htmlFor="email" className="label">Email</label>
                            <div className="control has-icons-left">
                                <input id="email" type="email" placeholder="e1234567@site.com"
                                       className="input" autoComplete="email"
                                       required aria-required="true"
                                       aria-describedby="descriptionEmail"
                                       onChange={props.onChange}/>
                                <span className="icon is-small is-left">
                                     <FontAwesomeIcon icon="fa-solid fa-envelope"/>
                                  </span>
                                <span id="descriptionEmail"
                                      className={`help ${props.emailRequirementValue.containsAt ? "is-success " : "is-danger"}`}>
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
                                       onChange={props.onChange1}/>
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="fa-solid fa-lock"/></span>

                                <span id="descriptionMdp" className={
                                    `help ${props.passwordRequirementValue.containsRightLength ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins 8 caractères.</span>
                                <span id="descriptionMdp" className={
                                    `help ${props.passwordRequirementValue.containsSpecial ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins un symbole parmi les suivants: !@#$%&*()[]</span>
                                <span id="descriptionMdp" className={
                                    `help ${props.passwordRequirementValue.containsUppercase ? "is-success " : "is-danger"}`}>
                                Le mot de passe contient au moins une lettre en majuscule.</span>
                                <span id="descriptionMdp"
                                      className={`help ${props.passwordRequirementValue.containsLowercase ? "is-success " : "is-danger"}`}>
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
                                       onChange={props.onChange2}/>
                                <span className="icon is-small is-left">
                                    <FontAwesomeIcon icon="fa-solid fa-lock"/></span>

                                <span
                                  className={`help ${props.passwordRequirementValue.match ? "is-success " : "is-danger"}`}>
                                        Les mots de passe doivent être identiques.</span>
                            </div>
                        </div>
                        <div className="field">
                            <div className="buttons">
                                <button id="connexion" className="button is-success"
                                        onClick={props.onClick}> Inscription
                                </button>
                                <button className="button is-danger" onClick={props.onClick1}>Annuler</button>
                            </div>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    </div>;
}
