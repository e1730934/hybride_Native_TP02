import {BrowserRouter, Route, Routes} from "react-router-dom";
import React, {createContext, useState} from "react";
import Footer from "./component/section/Footer.jsx";
import Home from "./pages/Home.jsx";
import DetailPodcast from "./pages/DetailPodcast.jsx";
import Header from "./component/section/Header";
import Login from "./pages/Login.jsx";
import Profile from "./pages/Profile";
import {Subscription} from "./pages/Subscription";

export const Context = createContext();

export default function App() {
    const [token, setToken] = useState(() => {
        const localToken = window.localStorage.getItem("token");
        if (localToken) {
            return localToken;
        }
        return null;
    });
    return (
      <BrowserRouter>
          <Context.Provider value={{token, setToken}}>
              <Header/>
              <Routes>
                  <Route path="/" element={<Home/>}/>
                  <Route path="/podcast/:podcastId" element={<DetailPodcast/>}/>
                  <Route path="/login" element={<Login/>}/>
                  <Route path="/signup"/>
                  {
                    token !== null &&
                    <>
                        <Route path="/profile" element={<Profile/>}/>
                        <Route path="/subscriptions" element={<Subscription/>}/>
                    </>
                  }
              </Routes>
              <Footer/>
          </Context.Provider>
      </BrowserRouter>
    );
}
