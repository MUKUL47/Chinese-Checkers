import React from "react";
import { _class } from "./App";
import ChineseCheckers, {
  BoardClasses,
  Coordinate,
} from "./chinese-checkers.service";
interface Props extends Partial<React.ReactElement<HTMLDivElement>> {
  i: number;
  j: number;
  data: number | string;
  coordinateHasEmptyHop: (c: Coordinate) => boolean;
  isTileSelected: (c: Coordinate) => boolean;
  activePlayer: number;
  onTileClick: (c: Coordinate) => void;
}
export default function CheckerTile({
  data,
  i,
  j,
  coordinateHasEmptyHop,
  isTileSelected,
  activePlayer,
  onTileClick,
}: Props) {
  return (
    <div
      key={`${i},${j}`}
      data-i={i}
      data-j={i}
      data-value={data}
      className={_class(
        data === -1 &&
          coordinateHasEmptyHop({ i, j }) &&
          BoardClasses.TILE_MOVABLE_AREA,
        isTileSelected({ i, j }) && BoardClasses.VALID_TILE_SELECTED,
        activePlayer === data && BoardClasses.ACTIVE_PLAYER
      )}
      onClick={() => onTileClick({ i, j })}
    />
  );
}
