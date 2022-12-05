import {useEffect} from "react";
import {serveur} from "../constantes.jsx";

export function useGetUserInfo(token, setDefaultValues) {
    useEffect(() => {
        async function getUser() {
            await fetch(`${serveur}/user`, {
                method: "GET", headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`,
                }
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        setDefaultValues(data.email);
                    });
                } else {
                    console.log(response);
                }
            });
        }

        getUser();
    }, [setDefaultValues, token]);
}
