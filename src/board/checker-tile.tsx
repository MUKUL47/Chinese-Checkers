import React from "react";
import { _class } from "../App";
import ChineseCheckers, {
  BoardClasses,
  Coordinate,
} from "./chinese-checkers.service";
interface Props extends Partial<React.ReactElement<HTMLDivElement>> {
  i: number;
  j: number;
  data: number | string;
  service: ChineseCheckers;
  onTileClick: (c: Coordinate) => void;
}
export default function CheckerTile({
  data,
  i,
  j,
  onTileClick,
  service,
}: Props) {
  return (
    <div
      key={`${i},${j}`}
      data-i={i}
      data-j={i}
      data-value={data}
      className={_class(
        data === -1 &&
          service.coordinateHasEmptyHop({ i, j }) &&
          BoardClasses.TILE_MOVABLE_AREA,
        service.isTileSelected({ i, j }) && BoardClasses.VALID_TILE_SELECTED,
        service.getActivePlayer() === data && BoardClasses.ACTIVE_PLAYER
      )}
      onClick={() => onTileClick({ i, j })}
    />
  );
}
