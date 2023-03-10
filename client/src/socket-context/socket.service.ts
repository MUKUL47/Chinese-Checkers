import { io, Socket } from "socket.io-client";
import { ClientEvents, ServerEvents } from "../types";
type OnEventCallback = (e: ServerEvents, response: any) => void;
export default class SocketService {
  private socket: Socket;
  constructor() {
    this.socket = io(window.location.origin);
  }

  public onEventCallback(cb: OnEventCallback): void {
    [
      ServerEvents.ERROR,
      ServerEvents.ROOM_CREATED,
      ServerEvents.UPDATE_BOARD,
      ServerEvents.GAME_RESTARTED,
    ].forEach((e) => this.socket.on(e, (data) => cb(e, data)));
  }

  public sentEvent = (event: ClientEvents, data?: Object) => {
    if (!this.socket.active) return;
    this.socket.emit(event, data);
  };

  public getSocket(): Socket {
    return this.socket;
  }
}
