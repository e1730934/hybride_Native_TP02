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
