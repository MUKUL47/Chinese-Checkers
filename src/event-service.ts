import RoomService from "room.service";
import { Server, Socket, BroadcastOperator } from "socket.io";
import { ClientEvents, Room, ServerEvents } from "types";

export default class EventService {
  private roomService: RoomService;
  constructor(io: Server) {
    this.roomService = new RoomService();
    io.on("connection", (s: Socket) => {
      s.on(ClientEvents.CREATE_ROOM, () => this.createRoom(s));
      s.on(ClientEvents.ENTER_ROOM, (data) => this.enterRoom(s, data));
      s.on(ClientEvents.MAKE_MOVE, (data) => this.makeMove(s, data));
      s.on(ClientEvents.RESTART_GAME, (data) => this.restartGame(s, data));
      s.on("disconnect", (data) => this.removeFromRoom(s, data));
    });
  }
  private createRoom = (s: Socket) => {
    const { newRoom, roomId } = this.roomService.createRoom({ id: s.id });
    s.join(roomId);
    s.emit(ServerEvents.ROOM_CREATED, this._payload(newRoom, "Room created"));
  };
  private enterRoom = (s: Socket, data: any) => {
    const { roomId } = data;
    const response = this.roomService.enterRoom({
      id: s.id,
      roomId,
    });
    if (typeof response === "string") return this.handleError(s, response);
    s.join(roomId);
    s.to(roomId).emit(
      ServerEvents.UPDATE_BOARD,
      this._payload(response, "Someone joined")
    );
    s.emit(ServerEvents.UPDATE_BOARD, this._payload(response));
  };

  private removeFromRoom = (s: Socket, data: any) => {
    const { roomId } = data;
    const response = this.roomService.leaveRoom({
      roomId,
      id: s.id,
    });
    if (response === true || typeof response === "string") return;
    s.to(response.roomId).emit(
      ServerEvents.UPDATE_BOARD,
      this._payload(response, "A player left the room")
    );
  };
  private makeMove = (s: Socket, data: any) => {
    const {
      roomId,
      coordinates: { i, j },
    } = data;
    const response = this.roomService.makeMove({
      roomId,
      id: s.id,
      data: { coordinates: { i, j } },
    });
    if (typeof response === "string") return this.handleError(s, response);
    s.to(roomId).emit(ServerEvents.UPDATE_BOARD, this._payload(response));
    s.emit(ServerEvents.UPDATE_BOARD, this._payload(response));
  };

  private restartGame = (s: Socket, data: any) => {
    const { roomId } = data;
    const response = this.roomService.restartGame({
      roomId,
      id: s.id,
    });
    if (typeof response === "string") return this.handleError(s, response);
    const r = this._payload(response, "Game restarted");
    s.to(response.roomId).emit(ServerEvents.GAME_RESTARTED, r);
    s.emit(ServerEvents.GAME_RESTARTED, r);
  };

  private _payload(room: Room, message?: string) {
    return { room, message };
  }

  private handleError(s: Socket, error: string) {
    s.emit(ServerEvents.ERROR, error);
  }
}
