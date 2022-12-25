import ChineseCheckers from "chinese-checkers.service";
import RoomService from "room.service";
import socket, { Socket, Server } from "socket.io";
import { ClientEvents, Room, ServerEvents } from "types";
export default class EventService {
  private roomService: RoomService;
  constructor(io: Server) {
    this.initializeEvents(io);
    this.roomService = new RoomService();
  }
  private initializeEvents = (io: Server) => {
    // io.on("connection", this.onConnection);
    io.on(ClientEvents.CREATE_ROOM, this.createRoom);
    io.on(ClientEvents.ENTER_ROOM, this.enterRoom);
    io.on(ClientEvents.UPDATE_USER_LIMIT, this.updateUserLimit);
  };
  private createRoom = (s: Socket) => {
    const { newRoom, roomId } = this.roomService.createRoom({ id: s.id });
    s.join(roomId);
    s.emit(ServerEvents.ROOM_CREATED, newRoom);
  };
  private enterRoom = (s: Socket) => {
    const response = this.roomService.enterRoom({
      id: s.id,
      roomId: s.data.toString(),
    });
    if (typeof response === "string")
      return s.emit(ServerEvents.ERROR, response);
    s.to(s.data.toString()).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  };
  private updateUserLimit = (s: Socket) => {
    const { roomId, limit } = s.data;
    const response = this.roomService.updateUserLimit({
      roomId,
      id: s.id,
      data: { limit },
    });
    if (typeof response === "string")
      return s.emit(ServerEvents.ERROR, response);
    s.to(roomId).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  };
}
