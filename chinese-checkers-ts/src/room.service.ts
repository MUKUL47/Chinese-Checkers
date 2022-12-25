import ChineseCheckers from "chinese-checkers.service";
import { Room, Rooms, RoomServiceParam } from "types";

export default class RoomService {
  private rooms: Rooms;

  constructor() {
    this.rooms = {};
  }
  public createRoom({ id }: { id: string }): { newRoom: Room; roomId: string } {
    const roomId = `${Date.now()}.${Math.random()}`;
    const newRoom: Room = {
      createdAt: Date.now(),
      ownerId: id,
      gameState: new ChineseCheckers(1),
      participants: { [id]: true },
      userLimit: 1,
    };
    this.rooms[roomId] = newRoom;
    return { roomId, newRoom };
  }
  public enterRoom({
    roomId,
    id,
  }: {
    roomId: string;
    id: string;
  }): Room | string {
    try {
      const room = this.getRoomById(roomId);
      if (room.userLimit === 6) return "Participants full";
      room.userLimit += 1;
      room.gameState = new ChineseCheckers(room.userLimit); //restart the game
      room.participants[id] = true;
      return room;
    } catch (e) {
      return this._error(e);
    }
  }

  public updateUserLimit({
    roomId,
    data,
    id,
  }: Partial<RoomServiceParam<{ limit: any }>>): Room | string {
    try {
      const room = this.getRoomById(roomId);
      if (room.ownerId != id)
        return "Only owner can update the participant limit";
      let { limit } = data;
      limit = Number(limit);
      if (!isNaN(data.limit) || data.limit < 1 || data.limit > 6)
        return "Limit is invalid";
      room.userLimit = limit;
      room.gameState = new ChineseCheckers(room.userLimit); //restart the game
      return room;
    } catch (e) {
      return this._error(e);
    }
  }

  private getRoomById(roomId: string): Room {
    if (!this.rooms[roomId]) throw "Room not found";
    return this.rooms[roomId];
  }

  private _error(e: any) {
    return (typeof e !== "string" && "Something went wrong") || e;
  }
}
