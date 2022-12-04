import {useEffect} from "react";


export function useValidationEmail(email, setValidationResultEmail) {
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

export function useValidationPassword(password, passwordConfirm, setValidationResultPassword) {
    useEffect(() => {
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

export function useCheckError(emailRequirementValue, passwordRequirementValue, setError) {
    useEffect(() => {
        if (emailRequirementValue.containsAt && passwordRequirementValue.containsUppercase
          && passwordRequirementValue.containsLowercase && passwordRequirementValue.containsSpecial
          && passwordRequirementValue.containsRightLength && passwordRequirementValue.match) {
            setError(false);
        } else {
            setError(true);
        }
    }, [emailRequirementValue, passwordRequirementValue]);
}
