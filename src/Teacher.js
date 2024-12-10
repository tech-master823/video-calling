import { useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import io from 'socket.io-client'
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ParticipantView from "./components/ParticipantView";
import { use } from "react";
import Spinner from "./components/Spinner";

const socket = io('http://localhost:8001');

const Teacher = () => {

  const [peerStream, setPeerStream] = useState({});
  const [localStream, setLocalStream] = useState(null);
  const { roomId } = useParams();
  
  const query = new URLSearchParams(useLocation().search);
  
  const onRequest = ({ peer, peerId, stream }) => {
    // console.log('Received request from ' + peerId);
    console.log(stream);

    const call = peer.call(peerId, stream)
    console.log(call);
    if(call) {
      call.on('stream', (_stream) => {
        console.log('Incoming stream from ' + peerId, _stream);
        setPeerStream(s => ({ ...s, [peerId]: _stream }));
      });
    }
  }

  useEffect(() => {
    const peer = new Peer();
  
    peer.on('open', function (id) {
      console.log('My peer ID is: ' + id);
      try {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then(stream => {
          setLocalStream(s => stream);
          
          socket
            .on('request', (peerId) => onRequest({ peer, peerId, stream }))
            .emit('create-room', roomId);
        })
        .catch(err => {
          console.log(err);
        });
      } catch (error) {
        console.log(error)
      }
    });

  }, []);

  return (
    <div>
      <h1>Teacher</h1>
      <div className="flex justify-center mb-5">
        {
          localStream ? <ParticipantView stream={localStream} /> : <Spinner />
        }
      </div>
      <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        {
          peerStream && Object.keys(peerStream).map((key) => 
              <ParticipantView key={key} stream={peerStream[key]} options={{ style: { width: "300px", height: "250px" } }} />
           )
        }
      </div>
    </div>
  )
}

export default Teacher;