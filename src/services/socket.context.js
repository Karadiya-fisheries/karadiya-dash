import React from "react";
import socketio from "socket.io-client";

export const socket = socketio.connect("https://serene-woodland-83390.herokuapp.com");
export const SocketContext = React.createContext();
