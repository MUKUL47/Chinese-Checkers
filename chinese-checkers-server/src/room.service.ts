import ChineseCheckers from "chinese-checkers.service";
import { Room, Rooms, RoomServiceParam } from "types";

export default class RoomService {
  private rooms: Rooms;

  constructor() {
    this.rooms = {};
  }
  public createRoom({ id }: Partial<RoomServiceParam>): {
    newRoom: Room;
    roomId: string;
  } {
    const roomId = `${Date.now()}.${Math.random()}`;
    const gameState = new ChineseCheckers(1);
    const newRoom: Room = {
      createdAt: Date.now(),
      ownerId: id,
      gameState,
      participants: { [id]: true },
      userLimit: 1,
    };
    gameState.assignParticipantsPositions(newRoom.participants);
    this.rooms[roomId] = newRoom;
    return { roomId, newRoom };
  }
  public enterRoom({ roomId, id }: Partial<RoomServiceParam>): Room | string {
    try {
      const room = this.getRoomById(roomId);
      if (room.userLimit === 6) return "Participants full";
      room.userLimit += 1;
      room.gameState = new ChineseCheckers(room.userLimit);
      room.participants[id] = true;
      room.gameState.assignParticipantsPositions(room.participants);
      return room;
    } catch (e) {
      return this._error(e);
    }
  }

  public leaveRoom({
    roomId,
    id,
  }: Partial<RoomServiceParam>): Room | string | true {
    try {
      const room = this.getRoomById(roomId);
      room.userLimit -= 1;
      //if userlimit is 0 => delete that room
      //if userlimit > 0 and if leader left assign top pariticipant and dont restart
      if (!room.userLimit) {
        delete this.rooms[roomId];
        return true;
      }
      room.gameState.removeUserFromBoard(room.participants[id] as number);
      delete room.participants[id];
      if (id === room.ownerId) {
        const lastParticipant = Object.keys(room.participants)[0];
        room.ownerId = lastParticipant;
      }
      return room;
    } catch (e) {
      return this._error(e);
    }
  }

  // public updateUserLimit({
  //   roomId,
  //   data,
  //   id,
  // }: Partial<RoomServiceParam<{ limit: any }>>): Room | string {
  //   try {
  //     const room = this.getRoomById(roomId);
  //     if (room.ownerId != id)
  //       return "Only owner can update the participant limit";
  //     let { limit } = data;
  //     limit = Number(limit);
  //     if (!isNaN(data.limit) || data.limit < 1 || data.limit > 6)
  //       return "Limit is invalid";
  //     room.userLimit = limit;
  //     room.gameState = new ChineseCheckers(room.userLimit); //restart the game
  //     room.gameState.assignParticipantsPositions(room.participants);
  //     return room;
  //   } catch (e) {
  //     return this._error(e);
  //   }
  // }

  public makeMove({
    roomId,
    data,
    id,
  }: Partial<RoomServiceParam<{ coordinates: { i; j } }>>): Room | string {
    try {
      const room = this.getRoomById(roomId);
      if (room.gameState.getActivePlayer() != room.participants[id])
        return "Invalid move (Please wait for your chance)";
      room.gameState = room.gameState.onTileClick({
        i: data.coordinates.i,
        j: data.coordinates.j,
      });
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
