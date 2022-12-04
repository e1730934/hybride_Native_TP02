import React, {useState} from "react";
import {serveur} from "../constantes.jsx";
import {useCheckError, useValidationEmail, useValidationPassword} from "../customHooks/UseValidationProfile.jsx";
import {ProfileComponent} from "../component/ProfileComponent.jsx";


export default function Signup() {
    const [error, setError] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");

    const defaultValues = {
        email: "", password: "", passwordConfirm: "",
    };

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
                      //     TODO: redirect to login page
                  } else {
                      setError(response.message);
                  }
              })
              .catch((e) => {
                  setError(`Erreur lors de l'inscription \n${e.message}`);
              });
        }
    }

    return (<ProfileComponent actionCall={signUp} actionLabel="Inscription"
                              getter={{email, password, passwordConfirm}}
                              setter={{setEmail, setPassword, setPasswordConfirm}}
                              validation={{emailRequirementValue, passwordRequirementValue}}
                              defaultValues={defaultValues} error={error}/>
    );
}
