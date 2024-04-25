import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { apiCall, baseURL } from "../utils/apiCall";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [userData, setUserData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    const checkLogin = async () => {
      try {
        if (token) {
          const verified = await apiCall("GET", "auth/verify", token);
          if (verified.data) setUser(true);
          if (verified.data) setUserData(verified.data);
          if (!verified.data) return localStorage.clear();
        } else {
          setUser(false);
        }
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log("cancelled");
        } else {
          throw error;
        }
      }
    };

    checkLogin();
    return () => {
      source.cancel();
    };
  }, [token]);

  return (
    <AuthContext.Provider value={{ setUser, user, userData, setUserData }}>
      {children}
    </AuthContext.Provider>
  );
};
