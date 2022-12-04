import React, {useState} from "react";
import {serveur} from "../constantes.jsx";
import {useCheckError, useValidationEmail, useValidationPassword} from "../customHooks/UseValidationProfile.jsx";
import {ProfileComponent} from "../component/ProfileComponent.jsx";
import {useNavigate} from "react-router-dom";


export default function Signup() {
    const [error, setError] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");
    const navigate = useNavigate();

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
    useCheckError(emailRequirementValue, passwordRequirementValue, setError);

    async function signUp() {
        if (error === false) {
            await fetch(`${serveur}/auth/register`, {
                method: "POST", headers: {
                    "Content-Type": "application/json",
                }, body: JSON.stringify({
                    email, password,
                }),
            })
              .then((response) => {
                  if (response.ok) {
                      navigate("/login");
                  } else {
                      setErrorMessages(response.message);
                  }
              })
              .catch((e) => {
                  setErrorMessages(`Erreur lors de l'inscription \n${e.message}`);
              });
        }
    }

    return (<ProfileComponent actionCall={signUp} actionLabel="Inscription"
                              getter={{email, password, passwordConfirm}}
                              setter={{setEmail, setPassword, setPasswordConfirm}}
                              validation={{emailRequirementValue, passwordRequirementValue}}
                              defaultValues={""} error={error} errorMessages={errorMessages}/>
    );
}
