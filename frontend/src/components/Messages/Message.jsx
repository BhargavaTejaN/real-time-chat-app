/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import useAuthContext from "../../hooks/useAuthContext";
import {extractTime} from '../../utils/extractTime';
import useConversation from "../../zustand/useConversation";

const Message = ({message}) => {

  //console.log("message in message : ",message);

  const {authUser} = useAuthContext();
  const {selectedConversation} =useConversation();
  const messageFromMe = message.senderId === authUser.data._id;
  const formattedTime = extractTime(message.createdAt);
  const chatClassName = messageFromMe ? "chat-end" : 'chat-start';
  const profilePic = messageFromMe? authUser.data.profilePic : selectedConversation?.profilePic;
  const bubbleBgColor = messageFromMe? 'bg-blue-500': '';

  const shakeClass = message.shouldShake ? "shake": '';


  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img alt="Tailwind CSS chat bubble component" src={profilePic || 'https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg'} />
        </div>
      </div>
      <div className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}>{message.message}</div>
      <div className='chat-footer text-black font-extrabold opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message