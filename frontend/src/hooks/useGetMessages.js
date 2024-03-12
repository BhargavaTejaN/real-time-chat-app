/* eslint-disable no-unused-vars */

import { useEffect, useState } from "react";

import { BASE_URL } from "../constants/constants";
import useConversation from "../zustand/useConversation";

const useGetMessages = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const url = `${BASE_URL}/messages/${selectedConversation._id}`;
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        };
        const response = await fetch(url, options);
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.log("Error while getting Messages : ", error);
        throw new Error("Error while getting Messages");
      } finally {
        setLoading(false);
      }
    };

    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessages]);

  return {loading,messages}

};

export default useGetMessages;
