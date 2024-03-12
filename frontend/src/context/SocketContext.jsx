/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */

import io from 'socket.io-client';
import { createContext, useEffect, useState } from "react";

import useAuthContext from '../hooks/useAuthContext';

export const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {

    const {authUser} = useAuthContext();

    const [socket,setSocket] = useState(null);
    const [onlineUsers,setOnlineUsers] = useState([]);

    const value = {socket,onlineUsers};

    useEffect(() => {
        if(authUser){
            const socket = io(`http://localhost:4000`,{
                query: {
                    userId: authUser.data._id,
                }
            });
            setSocket(socket);

            // socket.on() is used to listen to the events. can be used both on client and server side
            socket.on("getOnlineUsers",(users) => {
                setOnlineUsers(users);
            })

            return () => socket.close();
        }else{
            if(socket){
                socket.close();
                setSocket(null);
            }
        }
    },[authUser])

    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    )
}