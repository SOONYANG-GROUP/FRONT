import io from "socket.io-client";
import React, { useRef, useState, useEffect } from "react";
import { useParams } from "react-router-dom";


//const backendURLForSocket = "http://localhost:5000";
const testBackendURLForSocket = "https://shiny-beers-camp-39-127-110-132.loca.lt/";

let roomName = ""
let myStream = {};
let myPeerConnection = {};
const socket = io.connect(testBackendURLForSocket);


const VideoTest = () => {
    const [ roomNameTerm, setRoomNameTerm ] = useState("");
    const [ enterRoom, setEnterRoom ] = useState(false);
    const [ isMute, setIsMute ] = useState(false);
    const [ isCameraOn, setIsCameraOn ] = useState(true);

    const peerVideoRef = useRef(null);
    const videoRef = useRef(null);

    const id = useParams().id;

    useEffect(() => {
        // A
        socket.on("welcome", async () => {
          const offer = await myPeerConnection.createOffer();
          myPeerConnection.setLocalDescription(offer);
          console.log("sent the offer");
          socket.emit("offer", offer, roomName);
        })
    
        // B
        socket.on("offer", async (offer) => {
          console.log("received the offer")
          myPeerConnection.setRemoteDescription(offer);
          const answer = await myPeerConnection.createAnswer();
          myPeerConnection.setLocalDescription(answer);
          socket.emit("answer", answer, roomName);
          console.log("sent the answer");
        });
    
        socket.on("answer", (answer) => {
          console.log("received the answer")
          myPeerConnection.setRemoteDescription(answer);
        })
    
        socket.on("ice", ice => {
          console.log("received Candidate");
          myPeerConnection.addIceCandidate(ice);
        })
    
    }, [videoRef ]);
    
    
    const GetMedia = async () => {
      try
      {
        myStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: true
        });
        
        
        const video = videoRef.current;
        video.srcObject = myStream;
        video.play();
      }
      catch(e)
      {
        console.log(e);
      }
    }



    const onChangeIsMute = (e) => {
      videoRef.current.srcObject.getAudioTracks().forEach((track) => (
        track.enabled = !track.enabled
      ));
      setIsMute(!isMute);
    }

    const onChangeIsCameraOn = (e) => {
      videoRef.current.srcObject.getVideoTracks().forEach((track) => (
        track.enabled = !track.enabled
      ));
      setIsCameraOn(!isCameraOn);
    }

    const onSubmit = async (e) => {
      e.preventDefault();
      await initCall();
      socket.emit("join_room", id);
      roomName = id;
      setRoomNameTerm(""); 
    }

    const initCall = async () => {
      setEnterRoom(true);
      await GetMedia();
      MakeConnection();
    }

    const MakeConnection = () => {
      myPeerConnection = new RTCPeerConnection({
        iceServers: [
          {
            urls: [
              "stun:stun.l.google.com:19302",
              "stun:stun1.l.google.com:19302",
              "stun:stun2.l.google.com:19302",
              "stun:stun3.l.google.com:19302",
              "stun:stun4.l.google.com:19302",
            ]
          }
        ]
      });
      myPeerConnection.addEventListener("icecandidate", handleIce);
      myPeerConnection.addEventListener("addstream", handleAddStream);

      myStream.getTracks().forEach((track) => (
        myPeerConnection.addTrack(track, myStream)
      ));
    }

    const handleIce = (data) => {
      console.log("sent candidate");
      socket.emit("ice", data.candidate, roomName);
    }

    const handleAddStream = (data) => {
      const video = peerVideoRef.current;
      video.srcObject = data.stream;
      video.play();
    }

    if(enterRoom)
    {
      return(
        <div className="container">
          <h1>{roomName}</h1>
          <video ref={videoRef} playsInline>
          </video>
          <video ref={peerVideoRef} playsInline>
          </video>
          <button onClick={onChangeIsMute}>
            {isMute ? ("Mute OFF") : ("Mute ON")}
          </button>
          <button onClick={onChangeIsCameraOn}>
            {isCameraOn ? ("Camera OFF") : ("Camera On")}
          </button>
      </div>
      )
    }
    else
    {
      return(
          <div className="container">
            <form onSubmit={onSubmit}>
                <button>
                  들어가기
                </button>
            </form>
          </div>
      );
    }
}

export default VideoTest;