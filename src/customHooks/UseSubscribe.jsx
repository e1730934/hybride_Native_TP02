import {useEffect} from "react";
import {serveur} from "../constantes.jsx";

export function useSubscribe(podcastId, setSubscribe, token) {
    useEffect(() => {
        async function getIsSubscribe() {
            if (token) {
                const bearerToken = `bearer ${token}`;
                const res = await fetch(`${serveur}/subscription?podcastId=${podcastId}`, {
                    method: "GET",
                    headers: {authorization: bearerToken},
                });
                if (res.ok) {
                    const data = await res.json();
                    if (data.isSubscribed) {
                        setSubscribe(data.isSubscribed);
                    }
                }
            }
        }
        getIsSubscribe();
    }, [podcastId, setSubscribe, token]);
}

export function useGetSubscribedPodcast(token, setPodcasts) {
    useEffect(() => {
        async function getPodcasts() {
            if (token) {
                const bearerToken = `bearer ${token}`;
                const res = await fetch(`${serveur}/subscriptions`, {
                    method: "GET",
                    headers: {authorization: bearerToken},
                });
                if (res.ok) {
                    const data = await res.json();
                    setPodcasts(data);
                } else {
                    console.log("Error podcasts not loaded");
                }
            }
        }
        getPodcasts();
    }, [token,setPodcasts]);
}
