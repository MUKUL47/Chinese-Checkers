import React, { useContext, useState } from "react";
import "../index.css";
import { SocketContext } from "../socket-context/socket.context";
import { ClientEvents } from "../types";

export default function RoomCreation() {
  const [roomId, setRoomId] = useState("");
  const socketContext = useContext(SocketContext);
  return (
    <section className="room-section">
      <div>
        <h1>Chinese Checkers</h1>
        <button
          onClick={() => socketContext?.sentEvent?.(ClientEvents.CREATE_ROOM)}
        >
          Create Room
        </button>
        <input
          type="text"
          placeholder="Enter room ID"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
        {(roomId.trim().length && (
          <button
            onClick={() =>
              socketContext?.sentEvent?.(ClientEvents.ENTER_ROOM, { roomId })
            }
          >
            Enter
          </button>
        )) ||
          null}
      </div>
    </section>
  );
}
