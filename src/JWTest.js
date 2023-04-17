import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Loading from "./Loading";



const roomName = 1;

const JWTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [ username, setUsername ] = useState("재광님");
  const [ message, setMessage ] = useState('');
  const [ messages, setMessages ] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect("http://localhost:5000");
    JoinRoom(roomName);
    

    
  }, []);

  useEffect(() => {
    socketRef.current.on("received_message", (data) => {
      setMessages([...messages, data.message]);
      //messages.push(`${data.username}: ${data.message}`)
      
    })
  }, [socketRef, messages]);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    socketRef.current.emit("send_message", {
      message: message,
      username: username,
      room: roomName
    });
    setMessages([...messages, message]);
    
    setMessage("");
  }

  const JoinRoom = (roomName) => {
    socketRef.current.emit("join_room", {
      room: roomName
    });
    
  }
  console.log(messages)

  if (isLoading) {
    return (
      <div>
        <Loading />
      </div>
    );
  } else {
    return (
      <>
      <div>
        {messages.map((msg, index) => {
          return(
            <div key={index}>
              {msg}
            </div>
          )
        })}
      </div>
        <form onSubmit={onSubmit}>
          <div>
            <input 
              type="text"
              name="message"
              value={message}
              onChange={onChangeMessage}
              placeholder="메세지"
            />
          </div>
        </form>
      </>
    );
  }
};

export default JWTest;
