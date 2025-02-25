import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

import { createContext, useContext } from "react";
import { auth_api, user_api } from "./AxiosInstances";
import { useNavigate } from "react-router";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const navigateTo = useNavigate();
  const [user, setUser] = useState(null);
  const [userToken, setUserToken] = useState(() => {
    return localStorage.getItem("userToken") || "";
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const fetchUser = async () => {
    try {
      const { data, status } = await user_api("/user-details", {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });
      if (status === 200) {
        setUser(data);
      }
    } catch (error) {
      console.error(error.response);
    }
  };

  const logout = async () => {
    try {
      const { status } = await auth_api.post(
        "/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      if (status === 200) {
        setUser(null);
        setIsLoggedIn(false);
        setUserToken("");
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userToken");
        navigateTo("/", { replace: true });
      }
    } catch (error) {
      console.error("cornflakes: ", error.response);
    }
  };

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
    localStorage.setItem("userToken", userToken);
  }, [user, userToken, isLoggedIn]);

  const setUserJWT = (accessToken) => {
    setUserToken(accessToken);
    setIsLoggedIn(true);
  };

  return (
    <SessionContext.Provider
      value={{ user, userToken, logout, isLoggedIn, fetchUser, setUserJWT }}
    >
      {children}
    </SessionContext.Provider>
  );
};

SessionProvider.propTypes = {
  children: PropTypes.node,
};

export const useSession = () => useContext(SessionContext);
