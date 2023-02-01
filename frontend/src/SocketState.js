import React, { useEffect, useContext, useState, useRef } from "react";
import { io } from "socket.io-client";
import Peer from "simple-peer";
import SocketContext from "./SocketContext";

const socket = io("http://localhost:5000");

const ContextProvider = ({ children }) => {
  const [stream, setstream] = useState(null);
  const [me, setme] = useState("");
  const [call, setcall] = useState({});
  const [callAccepted, setcallAccepted] = useState(false);
  const [callEnded, setcallEnded] = useState(false);
  const [name, setname] = useState("");
  const myVideo = useRef(null);
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((currentstream) => {
        setstream(currentstream);
        if (myVideo.current) {
          myVideo.current.srcObject = currentstream;
        }
      });

    socket.on("me", (id) => {
      setme(id);
    });
    socket.on("calluser", ({ from, name: callername, signal }) => {
      console.log("check02");
      setcall({ isRecievedCall: true, from, name: callername, signal });
      console.log(true, from, callername, signal);
    });
  }, []);

  const answerCall = () => {
    setcallAccepted(true);
    console.log("we in");
    const peer = new Peer({ initiator: false, trickle: false, stream });
    peer.on("signal", (data) => {
      console.log(call.from);
      socket.emit("answercall", { signal: data, to: call.from });
      console.log("part-1");
    });
    peer.on("stream", (currentStream) => {
      if (userVideo.current) {
        console.log("set");
        userVideo.current.srcObject = currentStream;
      }

      console.log("part-2");
    });
    peer.signal(call.signal);
    connectionRef.current = peer;
    console.log("shhshshhhshshshshshshhshhshsh");
  };
  const callUser = (id) => {
    console.log(id + "asasa");
    const peer = new Peer({ initiator: true, trickle: false, stream });

    peer.on("signal", (data) => {
      socket.emit("calluser", {
        userToCall: id,
        signalData: data,
        from: me,
        name,
      });
      console.log("wadu ke keke n");
    });
    peer.on("stream", (currentStream) => {
    
        console.log("set011");
        userVideo.current.srcObject = currentStream;
     

      console.log("sent123");
    });
    socket.on("callAccepted", (signal) => {
      setcallAccepted(true);
      console.log("sent11");

      peer.signal(signal);
    });
    connectionRef.current = peer;
    console.log("out out out");
  };
  const leaveCall = () => {
    setcallEnded(true);
    connectionRef.current.destroy();
    window.location.reload();
  };
  return (
    <SocketContext.Provider
      value={{
        call,
        callAccepted,
        myVideo,
        userVideo,
        stream,
        name,
        setname,
        callEnded,
        me,
        callUser,
        leaveCall,
        answerCall,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export { ContextProvider, SocketContext };
