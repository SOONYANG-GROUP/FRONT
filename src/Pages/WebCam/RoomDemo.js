import io from "socket.io-client";
import { useCallback, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { Rnd } from "react-rnd";
import {
  FaMicrophone,
  FaMicrophoneSlash,
  FaVideo,
  FaVideoSlash,
  FaPhoneSlash,
  FaComments,
  FaTeamspeak,
  FaPenSquare,
} from "react-icons/fa";
import axios from "axios";
import { BACK_URL, SOCKET_SERVER_URL } from "../../Components/Constants/URL";
import { SUB_BACK_URL } from "../../Components/Constants/URL";

import "./Room.css";

const pc_config = {
  iceServers: [
    {
      urls: [
        "stun:stun.l.google.com:19302",
        "stun:stun1.l.google.com:19302",
        "stun:stun2.l.google.com:19302",
        "stun:stun3.l.google.com:19302",
        "stun:stun4.l.google.com:19302",
      ],
    },
  ],
};

const RoomHeader = ({ myMemo, onChangeMyMemo }) => {
  return <header></header>;
};

const RoomVideosSection = ({
  users,
  isMuted,
  isCameraOn,
  localVideoRef,
  MuteBtn,
  VideoBtn,
  onchat,
  message,
  messages,
  onChangeMessage,
  onSubmitMessage,
  userName,
  projectId,
  ChatBtn,
}) => {
  return (
    <>
      <section
        style={{ height: "100vh", width: "100vw", backgroundColor: "#191919" }}
      >
        <Rnd
          default={{
            x: window.innerWidth / 2 - window.innerWidth / 8,
            y: window.innerHeight / 2 - window.innerHeight / 4,
            width: window.innerWidth / 4,
            height: "auto",
            lockAspectRatio: true,
          }}
          style={{ zIndex: 2 }}
          bounds="body"
          lockAspectRatio="true"
        >
          <video
            className="rounded-3"
            muted={true}
            ref={localVideoRef}
            autoPlay
            style={{ width: "100%", height: "100%", borderRadius: "50px" }}
          />
        </Rnd>

        {users.map((user, index) => (
          <Rnd
            key={index}
            default={{
              x: Math.random() * (window.innerWidth - 240),
              y: Math.random() * (window.innerHeight - 240),
              width:
                Math.floor(
                  Math.random() *
                    (window.innerWidth / 6 - window.innerWidth / 10 + 1)
                ) +
                window.innerWidth / 9,
              height: "auto",
              lockAspectRatio: true,
            }}
            lockAspectRatio="true"
            style={{ zIndex: 2 }}
            bounds="section"
          >
            <Video
              key={index}
              stream={user.stream}
              xPosition={1600}
              yPosition={(index + 1) * 300 + 30}
            />
          </Rnd>
        ))}
        {onchat ? (
          <>
            <ChatBox
              ChatBtn={ChatBtn}
              message={message}
              messages={messages}
              onChangeMessage={onChangeMessage}
              onSubmitMessage={onSubmitMessage}
              style={{ position: "relative" }}
              userName={userName}
              projectId={projectId}
            />
            {/* <div
              style={{
                position: "absolute",
                zIndex: 999,
                top: 0,
                left: 0,
                width: "400px",
              }}
            >
              <ChatBox
                message={message}
                messages={messages}
                onChangeMessage={onChangeMessage}
                onSubmitMessage={onSubmitMessage}
              />
            </div> */}
          </>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

const RoomFooter = ({
  MuteBtn,
  VideoBtn,
  isMuted,
  isCameraOn,
  onStartTranscript,
  onEndTranscript,
  speechStatus,
  messages,
  ChatBtn,
}) => {
  const [isDoneSummary, setIsDoneSummary] = useState(false);
  const [summaryStatus, setSummaryStatus] = useState(false);

  const EndCallBtn = (e) => {
    window.close();
  };

  const onSubmitSpeech = async (e) => {
    e.preventDefault();

    try {
      setSummaryStatus(true);
      await axios
        .post(`${SUB_BACK_URL}/gpt/transcript`, { messages: messages })
        .then((res) => {
          const content = res.data.data.choices[0].message.content;
          console.log(content);
          setIsDoneSummary(true);

          // 여기서 부터 작성하기
        })
        .catch((err) => {
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    } finally {
      setSummaryStatus(false);
    }
  };

  return (
    <footer>
      <div
        className="fixed-bottom mb-3 d-flex flex-column align-items-center justify-content-center bg-opacity-50"
        style={{ zIndex: 3, color: "white" }}
      >
        <div className="mb-3" tyle={{ color: "white" }}>
          비디오의 크기 및 위치를 마우스로 조절 가능합니다.
        </div>
        <div className="btn-text">
          <button
            onClick={MuteBtn}
            className="btn mx-2 rounded-3"
            style={{ border: "1px solid #999999", color: "white" }}
          >
            {isMuted ? (
              <div>
                <FaMicrophoneSlash size={24} />
                <div>Mute On</div>
              </div>
            ) : (
              <div>
                <FaMicrophone size={24} />
                <div>Mute Off</div>
              </div>
            )}
          </button>
          <button
            onClick={VideoBtn}
            className="btn mx-2 rounded-3"
            style={{ border: "1px solid #999999", color: "white" }}
          >
            {isCameraOn ? (
              <div>
                <FaVideo size={24} />
                <div>Cam On</div>
              </div>
            ) : (
              <div>
                <FaVideoSlash size={24} />
                <div>Cam Off</div>
              </div>
            )}
          </button>
          <button
            className="btn mx-2 rounded-3"
            style={{ border: "1px solid #999999", color: "white" }}
            onClick={ChatBtn}
          >
            <FaComments size={24} />
            <div>live chat</div>
          </button>

          {/* {isDoneSummary ? (
            <></>
          ) : messages.length === 0 ? (
            speechStatus ? (
              <button
                className="btn mx-2 rounded-3"
                style={{ border: "1px solid #999999", color: "white" }}
                onClick={onEndTranscript}
                disabled={summaryStatus}
              >
                <FaTeamspeak size={24} onClick={onEndTranscript} />
                <div onClick={onEndTranscript}>End Speech</div>
              </button>
            ) : (
              <button
                className="btn mx-2 rounded-3"
                style={{ border: "1px solid #999999", color: "white" }}
                onClick={onStartTranscript}
                disabled={summaryStatus}
              >
                <FaTeamspeak onClick={onStartTranscript} size={24} />
                <div onClick={onStartTranscript}>Start Speech</div>
              </button>
            )
          ) : (
            <button
              className="btn mx-2 rounded-3"
              style={{ border: "1px solid #999999", color: "white" }}
              onClick={onSubmitSpeech}
              disabled={speechStatus || summaryStatus}
            >
              <FaPenSquare size={24} onClick={onSubmitSpeech} />
              <div onClick={onSubmitSpeech}>{messages.length} Msgs Summary</div>
            </button>
          )} */}
        </div>
      </div>
    </footer>
  );
};

const ChatBox = ({
  message,
  messages,
  onChangeMessage,
  onSubmitMessage,
  userName,
  ChatBtn,
}) => {
  const [isSending, setIsSending] = useState(false);
  const [chatSummary, setChatSummary] = useState("");
  const projectId = useParams().id;

  const onSendMessage = async (e) => {
    e.preventDefault();
    setIsSending(true);
    try {
      const res = await axios.post(`${SUB_BACK_URL}/gpt/time-line`, {
        messages: messages,
      });
      // setChatSummary(JSON.parse(res.data.data.choices[0].message.content));
      console.log(res.data.data.choices[0].message.content);

      await axios
        .post(
          `${BACK_URL}/projects/${projectId}/members/simplejobs/add`,
          // chatSummary
          JSON.parse(res.data.data.choices[0].message.content)
        )
        .then((res) => {
          console.log(res);
        });
    } catch (error) {
      console.error(error);
    }
    setIsSending(false);
  };

  return (
    <div
      className="chat-box"
      style={{
        position: "absolute",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: "999",
      }}
    >
      <div
        style={{
          background: "#fff",
          borderRadius: "10px",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.2)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "#007bff",
            color: "#fff",
            borderRadius: "10px 10px 0 0",
            padding: "10px",
          }}
        >
          <h1 style={{ margin: "0" }}>Live Chat</h1>
          <button
            style={{
              background: "#fff",
              color: "#007bff",
              border: "none",
              padding: "10px",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: "1.2rem",
            }}
            onClick={ChatBtn}
          >
            X
          </button>
        </div>

        {isSending ? (
          <div>Sending...</div>
        ) : (
          <div
            style={{
              overflow: "scroll",
              display: "flex",
              flexDirection: "column-reverse",
              flexGrow: "1",
              padding: "10px",
            }}
          >
            {messages.map((msg, index) => {
              return (
                <div
                  key={index}
                  style={{
                    alignSelf: msg.sender === "Me" ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.sender === "Me" ? "#007bff" : "#f5f5f5",
                    color: msg.sender === "Me" ? "#fff" : "#333",
                    borderRadius: "20px",
                    padding: "10px 15px",
                    margin: "5px 0",
                    maxWidth: "70%",
                  }}
                >
                  {msg}
                </div>
              );
            })}
          </div>
        )}

        <form style={{ padding: "10px" }}>
          <div style={{ display: "flex" }}>
            <input
              type="text"
              name="message"
              value={message}
              onChange={onChangeMessage}
              style={{
                flexGrow: "1",
                padding: "10px",
                borderRadius: "5px 0 0 5px",
                border: "none",
              }}
              placeholder="Message for Jaegwang and Hyungil"
              aria-label="Message input"
              aria-describedby="message-button"
            />
            <button
              style={{
                padding: "10px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "0 5px 5px 0",
              }}
              id="message-button"
              onClick={(e) => {
                onSubmitMessage(e, userName);
              }}
            >
              보내기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Video = ({ stream, muted, xPosition, yPosition }) => {
  const ref = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    if (ref.current) ref.current.srcObject = stream;
    if (muted) setIsMuted(muted);
    setIsLoading(false);
  }, [stream, muted, xPosition, yPosition]);

  if (isLoading) {
    return <></>;
  }

  return (
    <>
      <video
        className="rounded-3"
        muted={isMuted}
        ref={ref}
        autoPlay
        style={{ width: "100%", height: "100%", borderRadius: "50px" }}
      />
    </>
  );
};

const RoomDemo = () => {
  const location = useLocation();

  const roomName = location.pathname.split("/")[2];
  const socketRef = useRef();

  const speechRef = useRef();

  const pcsRef = useRef({});
  const localVideoRef = useRef(null);
  const localStreamRef = useRef();
  const [users, setUsers] = useState([]);
  const [isCameraOn, setIsCameraOn] = useState(false); // eslint-disable-line no-unused-vars
  const [isMuted, setIsMuted] = useState(true);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [onchat, setOnChat] = useState(false);

  const [speechStatus, setSpeechStatus] = useState(false);
  const [userName, setUserName] = useState("");
  // Menu
  const [isMenuOn, setIsMenuOn] = useState(false);
  const [myMemo, setMyMemo] = useState("");
  const onChangeMyMemo = (e) => {
    setMyMemo(e.target.value);
  };

  const onStartTranscript = (event) => {
    try {
      speechRef.current.start();
    } catch (error) {
      console.log("please try again");
    }
  };

  const onEndTranscript = (event) => {
    try {
      speechRef.current.stop();
    } catch (error) {
      console.log("please try again");
    }
  };

  const GetSpeechRef = useCallback(async () => {
    try {
      const recognition = new window.webkitSpeechRecognition();
      recognition.lang = "ko-KR";
      recognition.continuous = true;
      recognition.maxSpeedTime = 120;
      recognition.maxAge = 360;

      speechRef.current = recognition;

      speechRef.current.onstart = () => {
        console.log("speech start");
        setSpeechStatus(true);
      };

      speechRef.current.onend = () => {
        console.log("speech end");
        setSpeechStatus(false);
      };

      speechRef.current.addEventListener("result", (event) => {
        const transcript =
          event.results[event.results.length - 1][0].transcript;
        messages.push(transcript);
      });
    } catch (error) {
      console.error(error);
    }
  });

  const GetLocalStream = useCallback(async () => {
    try {
      // 로컬 스트림 정보 받아오기
      const localStream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: true,
      });
      localStreamRef.current = localStream;
      if (localVideoRef.current) localVideoRef.current.srcObject = localStream;
      if (!socketRef.current) return;
      socketRef.current.emit("join_room", {
        room: roomName,
      });
    } catch (e) {
      console.log(`getUserMedia error: ${e}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const ChatBtn = () => {
    setOnChat(!onchat);
    if (onchat) {
      console.log("메시지 창이 켜졌습니다");
    } else {
      console.log("메시지 창이 꺼졌습니다.");
    }
  };

  const MuteBtn = () => {
    setIsMuted(!isMuted);
    localStreamRef.current.getAudioTracks().forEach((track) => {
      track.enabled = !isMuted;
    });
  };
  const VideoBtn = () => {
    setIsCameraOn(!isCameraOn);
    localStreamRef.current.getVideoTracks().forEach((track) => {
      track.enabled = isCameraOn;
    });
  };
  const CreatePeerConnection = useCallback((socketID) => {
    console.log(socketID);
    try {
      // Create Peer Connection (관계)
      const pc = new RTCPeerConnection(pc_config);

      // event 생성 중
      // myPeerConnection.addEventListener("icecandidate", handleIce);
      // 자신의 Ice Candidate를 생성하기 시작합니다.
      pc.onicecandidate = (e) => {
        if (!(socketRef.current && e.candidate)) {
          return;
        } else {
          console.log("On ICECandidate");
          socketRef.current.emit("candidate", {
            // sender의 RTCIceCandidate
            candidate: e.candidate,
            // Candidate를 보내는(Sender) user의 socket id
            candidateSendID: socketRef.current.id,
            // candidate를 받는 user의 socket id
            candidateReceiveID: socketID,
          });
        }
      };

      // event 생성 중
      pc.oniceconnectionstatechange = (e) => {
        console.log(e);
      };

      // event 생성 중
      // On Track 작업 성공 여부 기다림
      pc.ontrack = (e) => {
        console.log("on track success");
        setUsers((oldUsers) =>
          oldUsers
            .filter((user) => user.id !== socketID)
            .concat({
              id: socketID,
              stream: e.streams[0],
            })
        );
      };

      // pc에 local stream ref 정보 추가
      if (localStreamRef.current) {
        console.log("localstream add");
        localStreamRef.current.getTracks().forEach((track) => {
          if (!localStreamRef.current) {
            return;
          } else {
            pc.addTrack(track, localStreamRef.current);
          }
        });
      } else {
        console.log("no local stream");
      }

      return pc;
    } catch (e) {
      console.error(e);
      return;
    }
  }, []);

  // full room

  useEffect(() => {
    axios.get(`${BACK_URL}/users/info`).then((res) => {
      setUserName(res.data.name);
    });
  }, []);

  useEffect(() => {
    socketRef.current = io.connect(SOCKET_SERVER_URL);
    GetLocalStream();
    GetSpeechRef();
    if (localStreamRef.current) {
      VideoBtn();
      MuteBtn();
    }

    // full room
    socketRef.current.on("room_full", () => {
      console.log("hi");
    });

    //'similar to welcome'
    socketRef.current.on("all_users", (allUsers) => {
      // 모든 user들에 대해 다음과 같은 작업을 수행
      allUsers.forEach(async (user) => {
        if (!localStreamRef.current) return;
        // 2~ 새 Peer Connection 생성하기
        const pc = CreatePeerConnection(user.id);
        if (!(pc && socketRef.current)) return;
        // 새로운 Peer Connection을 pcs(pc 모음)에 관리
        pcsRef.current = { ...pcsRef.current, [user.id]: pc };
        try {
          // Create Channel
          //dataChannel.current = pc.createDataChannel("chat");
          //dataChannel.current.addEventListener("message", (event) => {
          //  setLines((prevLines) => [...prevLines, JSON.parse(event.data)]);
          //});
          //console.log("made data channel");

          // offer를 만드는 중
          const localSdp = await pc.createOffer({
            offerToReceiveAudio: true,
            offerToReceiveVideo: true,
          });
          console.log("Create Offer Success");
          await pc.setLocalDescription(new RTCSessionDescription(localSdp));
          // Offer 보내기
          socketRef.current.emit("offer", {
            sdp: localSdp,
            offerSendID: socketRef.current.id,
            offerReceiveID: user.id,
          });
        } catch (e) {
          console.error(e);
        }
      });
      // VideoBtn();
      // MuteBtn();
    });

    // Offer를 받은 경우 (2번 끝)
    socketRef.current.on("getOffer", async (data) => {
      const { sdp, offerSendID } = data;
      console.log("Get Offer");
      if (!localStreamRef.current) return;
      // 관계 만들기 시도 (3번 실행을 위한 준비)
      const pc = CreatePeerConnection(offerSendID);
      if (!(pc && socketRef.current)) return;
      // 새 관계(pc) 저장하기
      pcsRef.current = { ...pcsRef.current, [offerSendID]: pc };
      try {
        // Data Channel 만들기
        //pc.addEventListener("datachannel", (event) => {
        //  dataChannel.current = event.channel;
        //  dataChannel.current.addEventListener("message", (event) => {
        //    setLines((prevLines) => [...prevLines, JSON.parse(event.data)]);
        //  });
        //});
        //console.log("peer b data channel creates");

        // 매개변수 꼭 확인하기!
        try {
          await pc.setRemoteDescription(new RTCSessionDescription(sdp));
          console.log("Answer Set Remote Description Success");
        } catch (e) {
          console.error(e);
        }
        console.log("Answer Set Remote Description Success");
        const localSdp = await pc.createAnswer({
          offerToReceiveVideo: true,
          offerToReceiveAudio: true,
        });
        await pc.setLocalDescription(new RTCSessionDescription(localSdp));
        console.log("answer 만들기");
        // Answer 보내기
        socketRef.current.emit("answer", {
          sdp: localSdp,
          answerSendID: socketRef.current.id,
          answerReceiveID: offerSendID,
        });
      } catch (e) {
        console.error(e);
      }
    });

    // Answer 받기
    socketRef.current.on("getAnswer", (data) => {
      const { sdp, answerSendID } = data;
      console.log("Get Answer");
      const pc = pcsRef.current[answerSendID];

      if (!pc) return;
      // 매개 변수 꼭 확인하기!
      pc.setRemoteDescription(new RTCSessionDescription(sdp));
    });

    // ICE Candidate 생성 및 서로 주고 받기
    socketRef.current.on("getCandidate", async (data) => {
      const pc = pcsRef.current[data.candidateSendID];
      if (!pc) return;
      await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
      console.log("Candidate Add Success");
    });

    // user exit
    socketRef.current.on("user_exit", (data) => {
      if (!pcsRef.current[data.id]) return;
      pcsRef.current[data.id].close();
      delete pcsRef.current[data.id];
      setUsers((oldUsers) => oldUsers.filter((user) => user.id !== data.id));
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
      users.forEach((user) => {
        if (!pcsRef.current[user.id]) return;
        pcsRef.current[user.id].close();
        delete pcsRef.current[user.id];
      });
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    socketRef.current.on("received_message", (data) => {
      setMessages([`${data.username}: ${data.message}`, ...messages]);
    });
  }, [socketRef, messages, onchat]);

  const onChangeMessage = (e) => {
    setMessage(e.target.value);
  };

  function addMessage(message) {
    // 로컬 스토리지에서 메시지 배열을 가져옵니다.
    const messages = JSON.parse(localStorage.getItem("messages")) || [];

    // 새로운 메시지를 배열에 추가합니다.
    messages.push(message);

    // 로컬 스토리지에 메시지 배열을 저장합니다.
    localStorage.setItem("messages", JSON.stringify(messages));
  }

  const onSubmitMessage = (e, username) => {
    console.log(username);
    e.preventDefault();
    socketRef.current.emit("send_message", {
      message: message,
      username: username,
      room: roomName,
    });
    setMessages([`${username}: ${message}`, ...messages]);
    setMessage("");
  };

  return (
    <>
      <RoomHeader />
      <RoomVideosSection
        users={users}
        localVideoRef={localVideoRef}
        onchat={onchat}
        message={message}
        messages={messages}
        onChangeMessage={onChangeMessage}
        onSubmitMessage={onSubmitMessage}
        userName={userName}
        ChatBtn={ChatBtn}
      />

      <RoomFooter
        MuteBtn={MuteBtn}
        VideoBtn={VideoBtn}
        isMuted={isMuted}
        isCameraOn={isCameraOn}
        ChatBtn={ChatBtn}
        speechStatus={speechStatus}
        messages={messages}
        onStartTranscript={onStartTranscript}
        onEndTranscript={onEndTranscript}
      />
    </>
  );
};

export default RoomDemo;