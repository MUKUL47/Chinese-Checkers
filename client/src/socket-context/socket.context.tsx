import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import Utils from "../shared/utils";
import {
  ClientEvents,
  Room,
  SentEvent,
  ServerEvents,
  SocketContext as ISocketContext,
} from "../types";
import SocketService from "./socket.service";
interface Props {
  children?: React.ReactNode;
}
type EventResponse = {
  message?: string;
  room: Room;
};
export const SocketContext = React.createContext<ISocketContext>({
  room: null,
});
export default function SocketContextProvider({ children }: Props) {
  const [room, setRoom] = useState<Room | null>(null);
  const [sentEvent, setSendEvent] = useState<SentEvent>();
  const { current } = useRef(new SocketService());
  useEffect(() => {
    setSendEvent(current.sentEvent);
    () => {
      sentEvent?.(ClientEvents.DISCONNECT);
    };
  }, []);
  current.onEventCallback((e, response: EventResponse | string) => {
    if (e === ServerEvents.ERROR && typeof response === "string")
      return Utils.Toast.next(response);
    const { room, message } = response as EventResponse;
    setRoom(room);
    message && Utils.Toast.next(message);
  });
  return (
    <SocketContext.Provider
      value={{
        room,
        socket: current.getSocket(),
        sentEvent: current.sentEvent,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
}
