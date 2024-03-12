/* eslint-disable no-unused-vars */
import { useEffect, useRef } from "react";

import { Message, MessageSkeleton } from "../index";
import useGetMessages from "../../hooks/useGetMessages";
import useListenMessages from "../../hooks/useListenMessages";

const Messages = () => {
  const { messages, loading } = useGetMessages();
  useListenMessages();
  const lastMessageRef = useRef();

  //console.log("messages in Messages File : ",messages);

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  return (
    <div className="px-4 flex-1 overflow-auto">
      {!loading && messages &&
        messages.length > 0 &&
        messages.map((message,index) => (
          <div key={message._id} ref={lastMessageRef}>
            <Message key={message._id} message={message} />
          </div>
        ))}
      {loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
      {!loading && !messages && (
        <p className="text-center pt-10">Send a message to start the conversation</p>
      )}
    </div>
  );
};

export default Messages;
