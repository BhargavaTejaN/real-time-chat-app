/* eslint-disable no-unused-vars */

import { useState } from "react";

import useAuthContext from "./useAuthContext";
import { BASE_URL } from "../constants/constants";

const useLogin = () => {
  const { setAuthUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/auth/login`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials : 'include',
      };

      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        return {error: data.message}
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      console.log("Error while login in frontend : ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
