import {ProfileComponent} from "../component/ProfileComponent";
import {useContext, useState} from "react";
import {useCheckError, useValidationEmail, useValidationPassword} from "../customHooks/UseValidationProfile.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../App.jsx";
import {serveur} from "../constantes.jsx";
import {useGetUserInfo} from "../customHooks/UseGetUserInfo.jsx";

export default function Profile() {
    const {token, setToken} = useContext(Context);
    const [error, setError] = useState(false);
    const [errorMessages, setErrorMessages] = useState("");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [defaultValues, setDefaultValues] = useState("");

    const navigate = useNavigate();

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

    async function supprimerCompte() {
        await fetch(`${serveur}/user`, {
            method: "DELETE", headers: {
                "Content-Type": "application/json",
                authorization: `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                setToken("");
                localStorage.setItem("token", "");
                navigate("/login");
            } else {
                console.log(response);
                setErrorMessages(response.message);
            }
        });
    }
    async function updateProfile() {
        await fetch(`${serveur}/user`, {
            method: "POST", headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`,
            }
        }).then((response) => {
            if (response.ok) {
                navigate("/login");
            } else {
                console.log(response);
            }
        });
    }

    useGetUserInfo(token, setDefaultValues);
    useValidationEmail(email, setEmailRequirementValue);
    useValidationPassword(password, passwordConfirm, setPasswordRequirementValue);
    useCheckError(emailRequirementValue, passwordRequirementValue, setError);


    return (
      <div className="section">
          <div className="container">
              <div className="columns is-centered">
                  <div className="column is-half">
                      <ProfileComponent actionCall={updateProfile} actionLabel="Mettre à jour le profil"
                                        getter={{email, password, passwordConfirm}} error={error}
                                        setter={{setEmail, setPassword, setPasswordConfirm}}
                                        validation={{emailRequirementValue, passwordRequirementValue}}
                                        defaultValues={defaultValues} supprimerCompte={supprimerCompte}
                                        errorMessages={errorMessages}/>
                  </div>
              </div>
          </div>
      </div>
    );
}
