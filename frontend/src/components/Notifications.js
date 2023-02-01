import React from 'react'
import { useContext } from 'react'
import SocketContext from '../SocketContext'
const Notifications = () => {
  const {answerCall,call,callAccepted}=useContext(SocketContext)
  return (
 
    <>
    {
      call.isRecievedCall && !callAccepted &&(
        <div style={{display:'flex',justifyContext:'center'}}>
          <h1>{call.name} is calling:</h1>
          <button class="btn btn-primary mb-3" onClick={answerCall}></button>

        </div>
      )
    }
    </>
  )
}

export default Notifications