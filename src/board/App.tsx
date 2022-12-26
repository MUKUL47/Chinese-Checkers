import React, { useState } from "react";
import ChineseCheckersGame from ".";
import { BoardAttributes } from "./chinese-checkers.service";
import "../index.css";
import { SocketContext } from "../socket-context/socket.context";
import { ClientEvents, SocketContext as ISocketContext } from "../types";
function App() {
  const socketContext: ISocketContext = React.useContext(SocketContext);
  // const [teamSize, setTeamSize] = useState<string>("2");
  const room = socketContext.room;
  const game = room?.gameState;
  const socketId = socketContext.socket?.id || -1;
  const participantId = socketContext.room?.participants[socketId] as number;
  const activePlayer = socketContext.room?.gameState.activePlayer || 0;
  const participantColor = BoardAttributes.reversePlayerMap[participantId];
  const isOwner = socketId === (socketContext.room?.ownerId || -1);
  return (
    <section>
      <strong>
        <h1>Chinese Checkers</h1>
      </strong>
      <div className="game-details flex">
        <p>Room ID : {socketContext.room?.roomId}</p>
        <p style={{ border: `1px solid ${participantColor}` }}>
          Your Color : {participantColor}
        </p>
        <p
          style={{
            border: `1px solid ${BoardAttributes.reversePlayerMap[activePlayer]}`,
          }}
        >
          Player : {BoardAttributes.reversePlayerMap[activePlayer]}
        </p>
      </div>
      <ChineseCheckersGame />
    </section>
  );
}
export default App;

export function _class(...n: (string | undefined | null | boolean)[]): string {
  return n.filter((v) => typeof v === "string").join(" ");
}
