(() => {
  class DOM {
    CALLBACK_TYPES = { TILE_CLICK: "TILE_CLICK", EMPTY_SPACE: "EMPTY_SPACE" };
    #DOM_BOARD = document.querySelector("Board");
    CALLBACK = () => {};
    #DOM_ID = {
      DATA_I: "data-i",
      DATA_J: "data-j",
      DATA_VALUE: "data-value",
      ACTIVE_TILE: "active-tile",
      VALID_EMPTY_AREA: "valid-empty-area",
    };
    //
    constructor() {
      this.#initializeListeners();
    }
    initializeBoard = ({ boardData }) => {
      for (let i = 0; i <= 16; i++) {
        const rowElement = document.createElement("row");
        for (let j = 0; j <= 12; j++) {
          const divElement = document.createElement("div");
          divElement.setAttribute(this.#DOM_ID.DATA_I, i);
          divElement.setAttribute(this.#DOM_ID.DATA_J, j);
          divElement.setAttribute(this.#DOM_ID.DATA_VALUE, boardData[i][j]);
          // divElement.innerHTML = `${i},${j}`;
          rowElement.appendChild(divElement);
        }
        this.#DOM_BOARD.appendChild(rowElement);
      }
    };

    #getCallbackType = (value) => {
      if (value > 0) return this.CALLBACK_TYPES.TILE_CLICK;
      else if (value == -1) return this.CALLBACK_TYPES.EMPTY_SPACE;
      return null;
    };

    updateSelectedTileToNewCell = ({ currentTile, targetTile }) => {
      //check if targetTile is occupied -> return
      //set currenttile value -> -1
      //update targettile with currenttile value
      // if(document.querySelector(`div[]`))
      const targetTileEle = this.#getTile({ i: targetTile.i, j: targetTile.j });
      const currentTileEle = this.#getTile({
        i: currentTile.i,
        j: currentTile.j,
      });
      currentTileEle.setAttribute(this.#DOM_ID.DATA_VALUE, -1);
      targetTileEle.setAttribute(this.#DOM_ID.DATA_VALUE, currentTile.value);
      this.#removeAllValidAreas();
      this.#removeActiveTile();
      return true;
    };

    setTileActive = ({ i, j, value }) => {
      this.#removeActiveTile();
      const activeEle = document.createElement("div");
      // activeEle.innerHTML = "X";
      activeEle.id = this.#DOM_ID.ACTIVE_TILE;
      this.#getTile({ i, j })?.appendChild(activeEle);
    };

    setValidAreas = (coordinates) => {
      this.#removeAllValidAreas();
      for (let coord of coordinates) {
        this.#getTile(coord)?.setAttribute(this.#DOM_ID.VALID_EMPTY_AREA, 1);
      }
    };

    #removeAllValidAreas() {
      document
        .querySelectorAll(`div[${this.#DOM_ID.VALID_EMPTY_AREA}="1"]`)
        .forEach((e) => e.removeAttribute(this.#DOM_ID.VALID_EMPTY_AREA));
    }

    #removeActiveTile() {
      document.getElementById(this.#DOM_ID.ACTIVE_TILE)?.remove();
    }

    #getTile = ({ i, j }) =>
      document.querySelector(`div[data-i="${i}"][data-j="${j}"]`);

    #initializeListeners = () => {
      this.#DOM_BOARD.addEventListener("click", (e) => {
        const hasValueAttribute = e.target.hasAttribute(
          this.#DOM_ID.DATA_VALUE
        );
        if (hasValueAttribute) {
          const value = Number(e.target.getAttribute(this.#DOM_ID.DATA_VALUE));
          const type = this.#getCallbackType(value);
          if (!type) return;
          this.CALLBACK?.({
            type,
            data: {
              i: Number(e.target.getAttribute(this.#DOM_ID.DATA_I)),
              j: Number(e.target.getAttribute(this.#DOM_ID.DATA_J)),
              value,
            },
          });
        }
      });
    };
  }
  class ChineseCheckers extends DOM {
    #PLAYERS = [1, 6];
    #BOARD_COLORS = {
      1: "RED",
      2: "YELLOW",
      3: "BLACK",
      4: "PINK",
      5: "BLUE",
      6: "GREEN",
    };
    #SELECTED_TILE = null;
    #BOARD = [];
    #REFERENCE_BOARD = [
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
    //
    constructor() {
      super();
      this.CALLBACK = this.#onCallback;
      this.#initializeData();
      this.initializeBoard({ boardData: this.#BOARD });
    }

    #onCallback = ({ type, data }) => {
      if (type === this.CALLBACK_TYPES.TILE_CLICK) {
        this.#SELECTED_TILE = data;
        this.setTileActive(data);
        this.setValidAreas(this.#getAllValidNeighbours());
        return;
      }
      if (type === this.CALLBACK_TYPES.EMPTY_SPACE && this.#SELECTED_TILE) {
        console.log("current-", this.#SELECTED_TILE);
        console.log("targetTile-", data);
        if (
          this.#BOARD[data.i][data.j].value > 0
          // !this.#validateMove({ targetTile: data })
        )
          return;
        this.#BOARD[this.#SELECTED_TILE.i][this.#SELECTED_TILE.j] = -1;
        this.#BOARD[data.i][data.j] = this.#SELECTED_TILE.value;
        //TODO RECURSIVELY FIND ALL THE POSSIBLE DESTINATIONS OF CURRENT TILE
        this.updateSelectedTileToNewCell({
          currentTile: this.#SELECTED_TILE,
          targetTile: data,
        });
        this.#SELECTED_TILE = null;
      }
    };

    #getAllValidNeighbours = () => {
      if (!this.#SELECTED_TILE) return [];
      const defaultNeighbours = this.#getNeighbours(this.#SELECTED_TILE);
      const defaultValidMoves = defaultNeighbours.filter(({ i, j }) => {
        return this.#BOARD[i]?.[j] === -1;
      });
      const occupiedMoves = defaultNeighbours.filter(
        ({ i, j }) => this.#BOARD[i]?.[j] > 0
      );
      if (!occupiedMoves.length) return defaultNeighbours;
      const visitedTiles = {
        [`${this.#SELECTED_TILE.i},${this.#SELECTED_TILE.j}`]: true,
      };
      const findAllEmptyHops = (
        visitedTiles,
        neighbouringMoves, //occupiedMoves
        hops = [],
        currentHop
      ) => {
        for (let neighbour of neighbouringMoves) {
          visitedTiles[`${neighbour.i},${neighbour.j}`] = true;
          //calculate valid hop for each neighbour
          const prevI = currentHop.i;
          const prevJ = currentHop.j;
          let newI = prevI,
            newJ;
          if (prevI === neighbour.i) {
            newJ = prevJ < neighbour.j ? neighbour.j + 1 : neighbour.j - 1;
          } else {
            if (prevI < neighbour.i) {
              newJ = neighbour.j;
              newI = neighbour.i - 1;
            } else {
              newJ = neighbour.j - 1;
              newI = neighbour.i + 1;
            }
          }
          if (this.#BOARD[newI][newJ] === -1) {
            const hop = { i: newI, j: newJ }; //some calculate hop func
            hops.push(hop);
            const hopNeighbours = this.#getNeighbours(hop).filter(
              (v) => !visitedTiles[`${v.i},${v.j}`]
            );
            if (hopNeighbours.length)
              return findAllEmptyHops(visitedTiles, hopNeighbours, hops, hop);
          }
        }
        return hops;
      };
      return findAllEmptyHops(
        visitedTiles,
        occupiedMoves,
        [],
        this.#SELECTED_TILE
      );
    };

    #validateMove = ({ targetTile }) => {
      const { i, j } = targetTile;
      return this.#getNeighbours(this.#SELECTED_TILE).some(
        (c) => i === c.i && c.j === j
      );
    };

    #getNeighbours({ i, j }) {
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

    #initializeData() {
      for (let i = 0; i <= 16; i++) {
        const row = [];
        for (let j = 0; j <= 12; j++) {
          const val = this.#REFERENCE_BOARD[i][j];
          row.push(val < 1 ? val : (this.#PLAYERS.includes(val) && val) || -1);
        }
        this.#BOARD.push(row);
      }
    }
  }
  new ChineseCheckers();
})();
