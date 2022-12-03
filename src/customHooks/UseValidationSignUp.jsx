import {useEffect, useState} from "react";



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

    export function useValidationSignUp(email, password, passwordConfirm, setValidationResultEmail, setValidationResultPassword) {
        const[validationResult, setValidationResult] = useState(false);
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

        useEffect(() => {
            if (emailRequirementValue.containsAt &&
                passwordRequirementValue.containsNumber &&
                passwordRequirementValue.containsUppercase &&
                passwordRequirementValue.containsLowercase &&
                passwordRequirementValue.containsSpecial &&
                passwordRequirementValue.containsRightLength &&
                passwordRequirementValue.match) {
                setValidationResult(true);
            } else {
                setValidationResult(false);
            }
        },[]);
        useEffect(() => {
            if (validationResultEmail.containsAt === true &&
                validationResultPassword.containsNumber === true &&
                validationResultPassword.containsUppercase === true &&
                validationResultPassword.containsLowercase === true &&
                validationResultPassword.containsSpecial === true &&
                validationResultPassword.containsRightLength === true &&
                validationResultPassword.match === true) {
                setValidationResult(true);
            } else {
                setValidationResult(false);
            }
        }, [validationResultEmail, validationResultPassword]);
        useValidationEmail(email, setValidationResultEmail);
        useValidationPassword(password, passwordConfirm, setValidationResultPassword);
    }
