/* eslint-disable no-unused-vars */

import { useState } from "react";
import toast from "react-hot-toast";

import useAuthContext from "./useAuthContext";
import { BASE_URL } from "../constants/constants";

const useLogout = () => {
  const { setAuthUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const logout = async () => {
    try {
      const url = `${BASE_URL}/auth/logout`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials : 'include',
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        localStorage.removeItem("chat-user");
        setAuthUser(null);
      }
    } catch (error) {
      console.log("Error while logging out : ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, logout };
};

export default useLogout;
