export type Players = number[];
export type ReferenceBoard = (number | string)[][];
export enum PlayersName {
  RED = "RED",
  YELLOW = "YELLOW",
  BLACK = "BLACK",
  PINK = "PINK",
  BLUE = "BLUE",
  GREEN = "GREEN",
}
export enum BoardClasses {
  TILE_MOVABLE_AREA = "tile-movable-area",
  VALID_TILE_SELECTED = "valid-tile-selected",
  ACTIVE_PLAYER = "active-player",
}
export type Coordinate = { i: number; j: number };
export type PlayersMap = { [color in PlayersName]: number };
export class BoardAttributes {
  public static readonly DATA_I = "data-i";
  public static readonly DATA_J = "data-j";
  public static readonly DATA_VALUE = "data-value";
  public static readonly ACTIVE_TILE = "active-tile";
  public static readonly VALID_EMPTY_AREA = "valid-empty-area";
  public static readonly reversePlayerMap: any = {
    1: [PlayersName.RED],
    2: [PlayersName.GREEN],
    3: [PlayersName.YELLOW],
    6: [PlayersName.BLUE],
    4: [PlayersName.BLACK],
    8: [PlayersName.PINK],
  };
}
export interface IChineseCheckers {
  board: ReferenceBoard;
  validPlayerHops: Coordinate[];
  playersCount: number;
  activePlayerCounter: number;
  activePlayer: number;
  players: { [number: string]: true };
  selectedTile: {
    i: number;
    j: number;
    value?: number | string;
  } | null;
  playersMap: PlayersMap;
  referenceBoard: ReferenceBoard;
  winners: number[];
}
