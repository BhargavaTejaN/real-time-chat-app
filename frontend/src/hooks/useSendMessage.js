/* eslint-disable no-unused-vars */

import { useState } from "react";
import toast from "react-hot-toast";

import { BASE_URL } from "../constants/constants";
import useConversation from "../zustand/useConversation";

const useSendMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();

  const sendMessage = async (message) => {
    setLoading(true);
    try {
      const url = `${BASE_URL}/messages/send/${selectedConversation._id}`;
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
        credentials: "include",
      };

      const response = await fetch(url, options);
      const data = await response.json();

      //console.log("data in useSendMessage : ",data);

      if (data.error) throw new Error(data.error);
      setMessages([...messages, data]);
    } catch (error) {
      console.log("Error while sending message : ", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading };
};

export default useSendMessage;
