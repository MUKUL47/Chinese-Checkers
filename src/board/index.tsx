import { useContext, useEffect, useMemo, useState } from "react";
import CheckerTile from "./checker-tile";
import { Coordinate, IChineseCheckers } from "./chinese-checkers.service";
import "./game.css";
import { SocketContext } from "../socket-context/socket.context";
import { ClientEvents, SocketContext as ISocketContext } from "../types";
interface Props extends Partial<React.ReactElement<HTMLDivElement>> {}
export default function ChineseCheckersGame({}: Props) {
  const socketContext: ISocketContext = useContext(SocketContext);
  const room = socketContext.room;
  const game: IChineseCheckers = room?.gameState;

  const onTileClick = (c: Coordinate) =>
    socketContext.sentEvent?.(ClientEvents.MAKE_MOVE, {
      roomId: room?.roomId,
      coordinates: c,
    });
  const coordinateHasEmptyHop = (c: Coordinate): boolean => {
    return !!game?.validPlayerHops.find(({ i, j }) => c.i == i && c.j == j);
  };
  const isTileSelected = ({ i, j }: Coordinate): boolean => {
    return game?.selectedTile?.i == i && game?.selectedTile?.j == j;
  };
  return (
    <div className="game-board">
      <div className="board">
        {game?.board.map((row, i) => {
          const rowChildren: React.ReactNode[] = [];
          row.forEach((data, j) => {
            rowChildren.push(
              <CheckerTile
                key={`${i},${j}`}
                i={i}
                j={j}
                data={data}
                onTileClick={onTileClick}
                activePlayer={game.activePlayer}
                coordinateHasEmptyHop={coordinateHasEmptyHop}
                isTileSelected={isTileSelected}
              />
            );
          });
          return (
            <div className="row" key={i}>
              {rowChildren}
            </div>
          );
        })}
      </div>
    </div>
  );
}
