import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import {serveur} from "../constantes.jsx";
import {useValidationEmail, useValidationPassword} from "../customHooks/UseValidationSignUp.jsx";
import {faEnvelope, faLock} from "@fortawesome/free-solid-svg-icons";
import {library} from "@fortawesome/fontawesome-svg-core";
import {ProfileComponent} from "../component/ProfileComponent.jsx";

library.add(faEnvelope, faLock);


export default function Signup() {
    const navigate = useNavigate();
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const [emailRequirementValue, setEmailRequirementValue] = useState({
        containsAt: false,
    });
    const [passwordRequirementValue, setPasswordRequirementValue] = useState({
        containsUppercase: false,
        containsLowercase: false,
        containsSpecial: false,
        containsRightLength: false,
        match: false,
    });

    useValidationEmail(email, setEmailRequirementValue);
    useValidationPassword(password, passwordConfirm, setPasswordRequirementValue);

    async function signUp() {
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
    }

    function annuler() {
        navigate("/");
    }

    return (
      <ProfileComponent onChange={(e) => setEmail(e.target.value)} emailRequirementValue={emailRequirementValue}
                        onChange1={(e) => setPassword(e.target.value)}
                        passwordRequirementValue={passwordRequirementValue}
                        onChange2={(e) => setPasswordConfirm(e.target.value)} onClick={signUp} onClick1={annuler}/>
    );
}
