/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/constants";

const useGetConversations = () => {
  const [loading, setLoading] = useState(false);
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const getConversations = async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/users`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        };

        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          setConversations(data.users);
        }
      } catch (error) {
        console.log("Error in useGetConversations.js file : ", error);
      } finally {
        setLoading(false);
      }
    };

    getConversations();
  }, []);

  return { loading, conversations };
};

export default useGetConversations;
