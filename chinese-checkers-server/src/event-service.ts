import RoomService from "room.service";
import { Server, Socket } from "socket.io";
import { ClientEvents, ServerEvents } from "types";
export default class EventService {
  private roomService: RoomService;
  constructor(io: Server) {
    this.roomService = new RoomService();
    io.on("connection", (s: Socket) => {
      s.on(ClientEvents.CREATE_ROOM, this.createRoom);
      s.on(ClientEvents.ENTER_ROOM, this.enterRoom);
      // s.on(ClientEvents.UPDATE_USER_LIMIT, this.updateUserLimit);
      s.on(ClientEvents.MAKE_MOVE, this.makeMove);
    });
    io.on("disconnect", this.removeFromRoom);
  }
  private createRoom = (s: Socket) => {
    const { newRoom, roomId } = this.roomService.createRoom({ id: s.id });
    s.join(roomId);
    s.emit(ServerEvents.ROOM_CREATED, newRoom);
  };
  private enterRoom = (s: Socket) => {
    const { roomId } = s.data;
    const response = this.roomService.enterRoom({
      id: s.id,
      roomId,
    });
    if (typeof response === "string")
      return s.emit(ServerEvents.ERROR, response);
    s.to(roomId).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  };
  // private updateUserLimit = (s: Socket) => {
  //   const { roomId, limit } = s.data;
  //   const response = this.roomService.updateUserLimit({
  //     roomId,
  //     id: s.id,
  //     data: { limit },
  //   });
  //   if (typeof response === "string")
  //     return s.emit(ServerEvents.ERROR, response);
  //   s.to(roomId).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  // };

  private removeFromRoom = (s: Socket) => {
    const { roomId } = s.data;
    const response = this.roomService.leaveRoom({
      roomId,
      id: s.id,
    });
    if (response === true) return;
    if (typeof response === "string")
      return s.emit(ServerEvents.ERROR, response);
    s.to(roomId).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  };
  private makeMove = (s: Socket) => {
    const {
      roomId,
      coordinates: { i, j },
    } = s.data;
    const response = this.roomService.makeMove({
      roomId,
      id: s.id,
      data: { coordinates: { i, j } },
    });
    if (typeof response === "string")
      return s.emit(ServerEvents.ERROR, response);
    s.to(roomId).emit(ServerEvents.UPDATE_BOARD, response.gameState);
  };
}
