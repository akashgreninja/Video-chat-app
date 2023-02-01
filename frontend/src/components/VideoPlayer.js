import React, { useContext } from "react";
import SocketContext from "../SocketContext";
import "./VideoPlayer.css";
const Videoplayer = () => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    useContext(SocketContext);
  return (
    <>
   
      <div class="container text-center from-the-top">
        <div class="row">
          <div class="col">
            {callAccepted && !callEnded && (
                <div class="card" style={{ width: "30rem" }}>
                 <video playsInline muted ref={userVideo} autoPlay />
                <div class="card-body">
                  <h5 class="card-title">
                    {userVideo ? console.log("yess") : console.log(false)}
                  </h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make up
                    the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
         
            )}
          
          </div>
          <div class="col">
            {stream && (
              <div class="card" style={{ width: "30rem" }}>
                <video playsInline muted ref={myVideo} autoPlay />
                <div class="card-body">
                  <h5 class="card-title">{name || "namsse"}</h5>
                  <p class="card-text">
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </p>
                  <a href="#" class="btn btn-primary">
                    Go somewhere
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Videoplayer;
