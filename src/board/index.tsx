import { useEffect, useMemo, useState } from "react";
import CheckerTile from "./checker-tile";
import ChineseCheckers, { Coordinate } from "./chinese-checkers.service";
import "./game.css";
interface Props extends Partial<React.ReactElement<HTMLDivElement>> {
  onPlayerCountChange: number;
  activePlayerChange: (n: number) => void;
}
export default function ChineseCheckersGame({
  activePlayerChange,
  onPlayerCountChange,
}: Props) {
  const chineseCheckersService = useMemo(
    () => new ChineseCheckers(onPlayerCountChange),
    []
  );
  const [{ service }, setService] = useState({
    service: chineseCheckersService,
  });
  const activePlayer = service.getActivePlayer();
  useEffect(() => {
    setService({ service: new ChineseCheckers(onPlayerCountChange) });
  }, [onPlayerCountChange]);

  useEffect(() => {
    activePlayerChange(activePlayer);
  }, [activePlayer]);

  const onTileClick = (c: Coordinate) =>
    setService({ service: service.onTileClick(c) });

  return (
    <div className="game-board">
      <div className="board">
        {service.getBoard().map((row, i) => {
          const rowChildren: React.ReactNode[] = [];
          row.forEach((data, j) => {
            rowChildren.push(
              <CheckerTile
                key={`${i},${j}`}
                i={i}
                j={j}
                data={data}
                service={service}
                onTileClick={onTileClick}
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
