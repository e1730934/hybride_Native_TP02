import {ProfileComponent} from "../component/ProfileComponent";
import {useContext, useState} from "react";
import {useValidationEmail, useValidationPassword} from "../customHooks/UseValidationSignUp.jsx";
import {useNavigate} from "react-router-dom";
import {Context} from "../App.jsx";

export default function Profile() {
    const {token} = useContext(Context);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
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

    function annuler() {
        navigate("/");
    }

    useValidationEmail(email, setEmailRequirementValue);
    useValidationPassword(password, passwordConfirm, setPasswordRequirementValue);


    return (
      <div className="section">
          <div className="container">
              <div className="columns is-centered">
                  <div className="column is-half">
                      {/*<ProfileComponent onChange={(e) => setEmail(e.target.value)}*/}
                      {/*                  emailRequirementValue={emailRequirementValue}*/}
                      {/*                  onChange1={(e) => setPassword(e.target.value)}*/}
                      {/*                  passwordRequirementValue={passwordRequirementValue}*/}
                      {/*                  onChange2={(e) => setPasswordConfirm(e.target.value)} onClick={signUp}*/}
                      {/*                  onClick1={annuler}/>*/}
                  </div>
              </div>
          </div>
      </div>
    );
}
