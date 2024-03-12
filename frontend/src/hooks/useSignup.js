/* eslint-disable no-unused-vars */

import { useState } from "react";
import toast from "react-hot-toast";

import useAuthContext from "./useAuthContext";
import { BASE_URL } from "../constants/constants";

const useSignup = () => {
  const { setAuthUser } = useAuthContext();

  const [loading, setLoading] = useState(false);

  const signup = async ({
    fullName,
    email,
    password,
    confirmPassword,
    gender,
  }) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/auth/register`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          email,
          password,
          confirmPassword,
          gender,
        }),
        credentials : 'include',
      };

      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        localStorage.setItem("chat-user", JSON.stringify(data));
        setAuthUser(data);
      }
    } catch (error) {
      toast.error(error.message);
      console.log("Error while signup in frontend : ", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;
