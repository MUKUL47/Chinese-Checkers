import ChineseCheckers from "./board/chinese-checkers.service";
import { io, Socket } from "socket.io-client";

export type Room = {
  createdAt: number;
  ownerId: string;
  roomId: string;
  gameState: ChineseCheckers;
  userLimit: 1 | 2 | 3 | 4 | 5 | 6;
  participants: { [userId: string]: true | number };
};
export type Rooms = {
  [roomId: string]: Room;
};
export enum ServerEvents {
  ROOM_CREATED = "ROOM_CREATED",
  GAME_RESTARTED = "GAME_RESTARTED",
  BOARD_UPDATE = "BOARD_UPDATE",
  ERROR = "ERROR",
  UPDATE_BOARD = "UPDATE_BOARD",
}
export enum ClientEvents {
  ENTER_ROOM = "ENTER_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  RESTART_GAME = "RESTART_GAME",
  CREATE_ROOM = "CREATE_ROOM",
  UPDATE_USER_LIMIT = "UPDATE_USER_LIMIT",
  MAKE_MOVE = "MAKE_MOVE",
  DISCONNECT = "disconnected",
}
export type RoomServiceParam<T = unknown> = {
  roomId: string;
  id: string;
  data: T;
};
export type SentEvent = (event: ClientEvents, data?: Object) => void;

export type SocketContext = {
  socket?: Socket;
  room: Room | null;
  sentEvent?: SentEvent;
};
