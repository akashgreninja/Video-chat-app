import React, { useState } from "react";
import { useContext } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SocketContext from "../SocketContext";
import Notifications from "./Notifications";
import "./Options.css";

const Options = () => {
  const { me, callAccepted, name, setname, CallEnded, leaveCall, callUser } =
    useContext(SocketContext);
    const [theperson, settheperson] = useState("")
  const [idToCall, setidToCall] = useState("");
  const handleSubmit=(e)=>
  {
    e.preventDefault()

  }
  return (
    <>
      <center>
        <div className="container-check">
          <form class="row g-3" noValidate autoComplete="off" onSubmit={handleSubmit}>
            <div class="col-auto">
              <label for="staticEmail2" class="visually-hidden">
                Email
              </label>
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail2"
                value="email@example.com"
              />
            </div>
            <div class="col-auto">
              <label for="inputPassword2" class="visually-hidden">
                Password
              </label>
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Password"
                value={theperson}
                onChange={(e) => {
                  settheperson(e.target.value);
                  setname(e.target.value)
                 
                }}
              />
            </div>
            <div class="col-auto">
              <CopyToClipboard text={me}>
                <button class="btn btn-primary mb-3" >Copy</button>
              </CopyToClipboard>
            </div>
          </form>
          <form class="row g-3" onSubmit={handleSubmit}>
            <div class="col-auto">
              <label for="staticEmail2" class="visually-hidden">
                Email
              </label>
              <input
                type="text"
                readonly
                class="form-control-plaintext"
                id="staticEmail2"
                value="email@example.com"
              />
            </div>
            <div class="col-auto">
              <label for="inputPassword2" class="visually-hidden">
               ID TO CALL
              </label>
              <input
                type="text"
                class="form-control"
                id="inputPassword2"
                placeholder="Password"
                value={idToCall}
                onChange={(e) => {
                  setidToCall(e.target.value);
                }}
              />
            </div>
            <div class="col-auto">
              {callAccepted && !CallEnded ?(
         
                  <button class="btn btn-primary mb-3" onClick={leaveCall}>Hang Up</button>
              ):(
                <button class="btn btn-primary mb-3" onClick={()=>callUser(idToCall,()=>{console.log(idToCall)})}>Call</button>
                
              )}
            </div>
          </form>
        </div>
       
      </center>
    </>
  );
};

export default Options;
