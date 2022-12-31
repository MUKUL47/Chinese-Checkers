import ChineseCheckers from "chinese-checkers.service";
export type Room = {
  createdAt: number;
  ownerId: string;
  gameState: ChineseCheckers;
  userLimit: 1 | 2 | 3 | 4 | 5 | 6;
  roomId: string;
  participants: { [userId: string]: true | number };
};
export type Rooms = {
  [roomId: string]: Room;
};
export enum ServerEvents {
  ROOM_CREATED = "ROOM_CREATED",
  GAME_RESTARTED = "GAME_RESTARTED",
  ERROR = "ERROR",
  UPDATE_BOARD = "UPDATE_BOARD",
}
export enum ClientEvents {
  ENTER_ROOM = "ENTER_ROOM",
  LEAVE_ROOM = "LEAVE_ROOM",
  RESTART_GAME = "RESTART_GAME",
  CREATE_ROOM = "CREATE_ROOM",
  MAKE_MOVE = "MAKE_MOVE",
  DISCONNECT = "disconnected",
}
export type RoomServiceParam<T = unknown> = {
  roomId: string;
  id: string;
  data: T;
};
