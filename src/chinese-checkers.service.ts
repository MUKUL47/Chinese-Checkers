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
//
class GameConfig {
  public readonly boardI: number = 17;
  public readonly playersSquence = [1, 2, 3, 6, 4, 8]; //
  /**
   * {
   * 2->1,
   * 3->6,
   * }
   */
  public readonly boardJ: number = 13;
  public readonly gameplaySequence = [1, 4, 6, 2, 8, 3]; //[2, 6, 4, 1, 3, 8]; //active player counter

  public readonly playersMap: PlayersMap = {
    RED: 1,
    GREEN: 2,
    //
    YELLOW: 3,
    BLUE: 6,
    //
    BLACK: 4,
    PINK: 8,
  };
  /**
   * [
      [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
      //
      [2, 2, 2, 2, -1, -1, -1, -1, -1, 3, 3, 3, 3],
      [0, 2, 2, 2, -1, -1, -1, -1, -1, -1, 3, 3, 3],
      [0, 2, 2, -1, -1, -1, -1, -1, -1, -1, 3, 3, 0],
      [0, 0, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 0],
      //
      [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
      //
      [0, 0, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 0, 0],
      [0, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, 0],
      [0, 4, 4, 4, -1, -1, -1, -1, -1, -1, 5, 5, 5, 0],
      [4, 4, 4, 4, -1, -1, -1, -1, -1, 5, 5, 5, 5],
      //
      [0, 0, 0, 0, 0, 6, 6, 6, 6, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 6, 6, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 6, 6, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 6, 0, 0, 0, 0, 0, 0, 0],
    ];
   */
  public readonly referenceBoard: ReferenceBoard = [
    [0, 0, 0, 0, 0, 0, this.playersMap[PlayersName.RED], 0, 0, 0, 0, 0, 0, 0],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      this.playersMap[PlayersName.RED],
      0,
      0,
      0,
      0,
      0,
    ],
    //
    [
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
    ],
    [
      0,
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
    ],
    [
      0,
      this.playersMap[PlayersName.YELLOW],
      this.playersMap[PlayersName.YELLOW],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLACK],
      this.playersMap[PlayersName.BLACK],
      0,
    ],
    [
      0,
      0,
      this.playersMap[PlayersName.YELLOW],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLACK],
      0,
    ],
    //
    [0, 0, -1, -1, -1, -1, -1, -1, -1, -1, -1, 0, 0],
    //
    [
      0,
      0,
      this.playersMap[PlayersName.PINK],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLUE],
      0,
      0,
    ],
    [
      0,
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
      0,
    ],
    [
      0,
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      -1,
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
      0,
    ],
    [
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      this.playersMap[PlayersName.PINK],
      -1,
      -1,
      -1,
      -1,
      -1,
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
      this.playersMap[PlayersName.BLUE],
    ],
    //
    [
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      0,
      0,
      0,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    [
      0,
      0,
      0,
      0,
      0,
      0,
      this.playersMap[PlayersName.GREEN],
      this.playersMap[PlayersName.GREEN],
      0,
      0,
      0,
      0,
      0,
      0,
    ],
    [0, 0, 0, 0, 0, 0, this.playersMap[PlayersName.GREEN], 0, 0, 0, 0, 0, 0, 0],
  ];
}
export default class ChineseCheckers extends GameConfig {
  private board: ReferenceBoard = [];
  public validPlayerHops: Coordinate[] = [];
  private playersCount: number = 6;
  private activePlayerCounter = 0;
  private activePlayer = this.gameplaySequence[this.activePlayerCounter];
  private players: { [number: string]: true } = {};
  public winners: number[] = [];
  private selectedTile: {
    i: number;
    j: number;
    value?: number | string;
  } | null = null;
  constructor(playerCount: number = 2) {
    super();
    this.playersCount = playerCount;
    this.winners = [];
    this.players = Array(this.playersCount)
      .fill(1)
      .reduce((a, c, i) => {
        return { ...a, [this.playersSquence[i]]: true };
      }, {});
    this.initializeData();
  }
  private initializeData() {
    for (let i = 0; i < this.boardI; i++) {
      const row = [];
      for (let j = 0; j < this.boardJ; j++) {
        const val = this.referenceBoard[i][j];
        row.push(val < 1 ? val : (!!this.players[val] && val) || -1);
      }
      this.board.push(row);
    }
  }
  private getNeighbours({ i, j }: Coordinate): Coordinate[] {
    if (i % 2 === 0)
      return [
        { i: i - 1, j: j + 1 },
        { i, j: j + 1 },
        { i: i + 1, j: j + 1 },
        { i: i + 1, j },
        { i, j: j - 1 },
        { i: i - 1, j },
      ];
    return [
      { i: i - 1, j },
      { i, j: j + 1 },
      { i: i + 1, j },
      { i: i + 1, j: j - 1 },
      { i, j: j - 1 },
      { i: i - 1, j: j - 1 },
    ];
  }
  //controllable

  public assignParticipantsPositions(participants: {
    [id: string]: any;
  }): void {
    let c = 0;
    for (let p in participants) {
      if (!c) {
        participants[p] = ++c;
      } else {
        participants[p] = c % 2 !== 0 ? c * 2 : c + 1;
        c++;
      }
    }
  }

  public removeUserFromBoard(n: number) {
    this.playersCount--;
    if (!this.playersCount) return;
    delete this.players[n];
    if (this.activePlayer === n) {
      this.setPlayerActive();
    }
    for (let i = 0; i < this.boardI; i++) {
      for (let j = 0; j < this.boardJ; j++) {
        if (this.board[i][j] == n) this.board[i][j] = -1;
      }
    }
  }

  public onTileClick({ i, j }: Coordinate): this {
    //if tile is -1 => empty tile check if any tile is selected assign else return
    if (this.winners.includes(this.activePlayer)) return this;
    if (this.board[i][j] === -1) {
      if (
        !this.selectedTile?.value ||
        (this.selectedTile.value && !this.coordinateHasEmptyHop({ i, j }))
      )
        return this;
      this.board[this.selectedTile.i][this.selectedTile.j] = -1;
      this.board[i][j] = this.selectedTile.value;
      this.selectedTile = null;
      this.validPlayerHops = [];
      this.checkWinner();
      this.setPlayerActive();
      return this;
    }
    if (this.board[i][j] > 0 && this.board[i][j] === this.activePlayer) {
      this.selectedTile = { i, j, value: this.board[i][j] };
      this.validPlayerHops = this.getAllValidNeighbours();
    }
    return this;
  }

  private setPlayerActive(): number {
    //if everyone won -> dont move
    if (this.winners.length === this.playersCount) return;
    do {
      this.activePlayer = this.gameplaySequence[++this.activePlayerCounter % 6];
    } while (
      !this.players[this.activePlayer] || //if player not found in sequence move to next player
      this.winners.includes(this.activePlayer) //excluding all winners
    );
    return this.activePlayer;
  }
  private checkWinner() {
    if (
      this.playersCount === this.winners.length ||
      this.winners.includes(this.activePlayer)
    )
      return;
    const playerTarget =
      (this.activePlayer % 2 === 0 && this.activePlayer / 2) ||
      this.activePlayer * 2;
    let c = 0;
    let won = false;
    for (let i = 0; i < this.boardI; i++) {
      for (let j = 0; j < this.boardJ; j++) {
        const reference = this.referenceBoard[i][j];
        if (
          reference === playerTarget &&
          this.board[i][j] === this.activePlayer
        )
          c++;
        if (c === 10) {
          won = true;
          break;
        }
      }
    }
    won && this.winners.push(this.activePlayer);
  }

  public coordinateHasEmptyHop(c: Coordinate): boolean {
    return !!this.validPlayerHops.find(({ i, j }) => c.i == i && c.j == j);
  }

  public isTileSelected({ i, j }: Coordinate): boolean {
    return this.selectedTile?.i == i && this.selectedTile?.j == j;
  }

  public getAllValidNeighbours = (): Coordinate[] => {
    if (!this.selectedTile) return [];
    const defaultNeighbours = this.getNeighbours(this.selectedTile);
    const defaultValidMoves = defaultNeighbours.filter(({ i, j }) => {
      return this.board[i]?.[j] === -1;
    });
    const occupiedMoves: Coordinate[] = defaultNeighbours.filter(
      ({ i, j }) => this.board[i]?.[j] > 0
    );
    if (!occupiedMoves.length) return defaultNeighbours;
    const visitedTiles: Set<string> = new Set(
      `${this.selectedTile.i},${this.selectedTile.j}`
    );
    const findAllEmptyHops = (
      visitedTiles: Set<string>,
      neighbouringMoves: Coordinate[], //occupiedMoves
      hops: Coordinate[] = [],
      currentHop: Coordinate
    ) => {
      for (let neighbour of neighbouringMoves) {
        visitedTiles.add(`${neighbour.i},${neighbour.j}`);
        //calculate valid hop for each neighbour
        const prevI = currentHop.i;
        const prevJ = currentHop.j;
        let newI = prevI,
          newJ;
        const { i, j } = neighbour;
        if (prevI === i) {
          newJ = prevJ < j ? j + 1 : j - 1;
        } else {
          newJ =
            prevJ >= j
              ? (newI % 2 === 0 && j - 1) || (prevJ === j && j + 1) || j
              : (newI % 2 === 0 && j) || j + 1;

          newI = prevI > i ? i - 1 : i + 1;
        }
        if (this.board?.[newI]?.[newJ] === -1) {
          const hop = { i: newI, j: newJ }; //some calculate hop func
          hops.push(hop);
          const hopNeighbours = this.getNeighbours(hop).filter(
            (v) =>
              !visitedTiles.has(`${v.i},${v.j}`) && this.board[v.i][v.j] > 0
          );
          if (hopNeighbours.length)
            findAllEmptyHops(visitedTiles, hopNeighbours, hops, hop);
        }
      }
      return hops;
    };
    return findAllEmptyHops(
      visitedTiles,
      occupiedMoves,
      defaultValidMoves,
      this.selectedTile
    );
  };
  public getBoard(): ReferenceBoard {
    return this.board;
  }
  public getSelectedTile(): Coordinate | null {
    return this.selectedTile;
  }
  public getPlayers(): { [number: string]: true } {
    return this.players;
  }

  public getActivePlayer(): number {
    return this.activePlayer;
  }
}
