import Peer from "peerjs";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import Spinner from "./components/Spinner";
import ParticipantView from "./components/ParticipantView";
import { set } from "lodash";
import StudentLayout from "./layout/StudentLayout";
import WhiteBoard from "./components/WhiteBoard/WhiteBoard";
import { LayoutProvider } from "./context/LayoutContext";

const socket = io('http://localhost:8001');

const Student = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  
  const { roomId } = useParams();

  const incommingCallHandler = (call, _stream) => {
    console.log('Incoming stream from ' + call.peer);
    call.answer(_stream);
    console.log(localStream);
    call.on('stream', (stream) => {
      console.log('Incoming stream from ' + call.peer, stream);
      setRemoteStream(stream);
    });
  }

  const openHandler = (peerId, peer) => {
    console.log('My peer ID is: ' + peerId);
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
    .then(stream => {
      setLocalStream(s => stream);
      peer.on('call', (call) => incommingCallHandler(call, stream));
      socket.emit('request', { roomId, peerId });
    })
    .catch(err => {
      console.log(err);
    });
  }

  useEffect(() => {
    const peer = new Peer();    
    peer.on('open', (id) => openHandler(id, peer)); 
  }, []);
  
  return (
    <>
      <LayoutProvider>
        {
          true ? (
            <StudentLayout>
              <ParticipantView stream={localStream} name={"Me"} />
              <ParticipantView stream={remoteStream} name={"Teacher"} />
              <WhiteBoard role={"teacher"} />
              <WhiteBoard role={"student"} />
            </StudentLayout>
          ) : (
            <Spinner />
          )
        }
      </LayoutProvider>
    </>
  )
}

export default Student;