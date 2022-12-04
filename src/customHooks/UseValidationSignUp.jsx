import {useEffect} from "react";


function useValidationEmail(email, setValidationResultEmail) {
    useEffect(() => {
        if (email.includes("@")) {
            setValidationResultEmail(prevState =>
              ({...prevState, containsAt: true}));
        } else {
            setValidationResultEmail(prevState =>
              ({...prevState, containsAt: false}));
        }
    }, [email]);
}

function useValidationPassword(password, passwordConfirm, setValidationResultPassword) {
    useEffect(() => {
        if (password.match(/[0-9]/g)) {
            setValidationResultPassword(prevState =>
              ({...prevState, containsNumber: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, containsNumber: false}));
        }
        if (password.match(/[A-Z]/g)) {
            setValidationResultPassword(prevState =>
              ({...prevState, containsUppercase: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, containsUppercase: false}));
        }
        if (password.match(/[a-z]/g)) {
            setValidationResultPassword(prevState =>
              ({...prevState, containsLowercase: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, containsLowercase: false}));
        }
        if (password.match(/[^a-zA-Z\d]/g)) {
            setValidationResultPassword(prevState =>
              ({...prevState, containsSpecial: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, containsSpecial: false}));
        }
        if (password.length >= 8) {
            setValidationResultPassword(prevState =>
              ({...prevState, containsRightLength: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, containsRightLength: false}));
        }
        if (password === passwordConfirm) {
            setValidationResultPassword(prevState =>
              ({...prevState, match: true}));
        } else {
            setValidationResultPassword(prevState =>
              ({...prevState, match: false}));
        }
    }, [password, passwordConfirm]);
}

export function useValidationSignUp(email, password, passwordConfirm, emailRequirementValue,
                                    setEmailRequirementValue, passwordRequirementValue, setPasswordRequirementValue, setError, setErrorMessage) {
    useValidationEmail(email, setEmailRequirementValue);
    useValidationPassword(password, passwordConfirm, setPasswordRequirementValue);

    useEffect(() => {
        setErrorMessage("");
        let errorEmail = false;
        let errorPassword = false;
        Object.values(emailRequirementValue).forEach((value) => {
            if (value === false) {
                errorEmail = true;
                console.log(`emailRequirementValue: ${value}`);
            }
        });
        Object.values(passwordRequirementValue).forEach((value) => {
            if (value === false) {
                console.log(`password RequirementValue: ${value}`);
                errorPassword = true;
            }
        });
        if (errorEmail === true || errorPassword === true) {
            setError(true);
            if (errorEmail === true) {
                setErrorMessage("Email non valide");
            }
            if (errorPassword === true) {
                setErrorMessage(prevState => prevState + (errorEmail ? "\n": "") + "Mot de passe non valide");
            }
        }
    }, [email, password, passwordConfirm]);
}
