(() => {
  class DOM {
    CALLBACK_TYPES = { TILE_CLICK: "TILE_CLICK", EMPTY_SPACE: "EMPTY_SPACE" };
    #DOM_BOARD = document.querySelector("Board");
    CALLBACK = () => {};
    //
    constructor() {
      this.#initializeListeners();
    }
    initializeBoard = ({ boardData }) => {
      for (let i = 0; i <= 16; i++) {
        const rowElement = document.createElement("row");
        for (let j = 0; j <= 12; j++) {
          const divElement = document.createElement("div");
          divElement.setAttribute("data-i", i);
          divElement.setAttribute("data-j", j);
          divElement.setAttribute("data-value", boardData[i][j]);
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
      if (targetTileEle.getAttribute("data-value") > 0) return false;
      const currentTileEle = this.#getTile({
        i: currentTile.i,
        j: currentTile.j,
      });
      currentTileEle.setAttribute("data-value", -1);
      targetTileEle.setAttribute("data-value", currentTile.value);
      this.#removeActiveTile();
      return true;
    };

    setTileActive = ({ i, j, value }) => {
      this.#removeActiveTile();
      const activeEle = document.createElement("div");
      activeEle.innerHTML = "X";
      activeEle.id = "ACTIVE_TILE";
      this.#getTile({ i, j })?.appendChild(activeEle);
    };

    #removeActiveTile() {
      document.getElementById("ACTIVE_TILE")?.remove();
    }

    #getTile = ({ i, j }) =>
      document.querySelector(`div[data-i="${i}"][data-j="${j}"]`);

    #initializeListeners = () => {
      this.#DOM_BOARD.addEventListener("click", (e) => {
        const hasValueAttribute = e.target.hasAttribute("data-value");
        if (hasValueAttribute) {
          const value = Number(e.target.getAttribute("data-value"));
          const type = this.#getCallbackType(value);
          if (!type) return;
          this.CALLBACK?.({
            type,
            data: {
              i: Number(e.target.getAttribute("data-i")),
              j: Number(e.target.getAttribute("data-j")),
              value,
            },
          });
        }
      });
    };
  }
  class ChineseCheckers extends DOM {
    #PLAYERS = [1, 6, 2, 3, 4, 5];
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
        return;
      }
      if (type === this.CALLBACK_TYPES.EMPTY_SPACE && this.#SELECTED_TILE) {
        console.log("current-", this.#SELECTED_TILE);
        console.log("targetTile-", data);
        //TODO RECURSIVELY FIND ALL THE POSSIBLE DESTINATIONS OF CURRENT TILE
        const tileUpdated = this.updateSelectedTileToNewCell({
          currentTile: this.#SELECTED_TILE,
          targetTile: data,
        });
        if (tileUpdated) {
          this.#SELECTED_TILE = null;
        }
      }
    };

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
