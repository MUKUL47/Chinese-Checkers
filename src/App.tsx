import { useState } from "react";
import ChineseCheckersGame from "./board";
import { BoardAttributes } from "./board/chinese-checkers.service";
import "./index.css";
function App() {
  const [activePlayer, setActivePlayer] = useState<string | null>(null);
  const [teamSize, setTeamSize] = useState<string>("2");
  return (
    <section>
      <strong>
        <h1>Chinese Checkers</h1>
      </strong>
      <div className="game-details flex">
        <p>Player : {BoardAttributes.reversePlayerMap[activePlayer || 0]}</p>
        <div className="flex gap-1">
          <p>Team Size</p>
          <select
            className="game-details_teamselect"
            onChange={(e) => setTeamSize(e.target.value)}
            value={teamSize}
          >
            {Array(5)
              .fill(1)
              .map((_, i) => {
                return (
                  <option key={i} value={i + 2}>
                    {i + 2}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
      <ChineseCheckersGame
        onPlayerCountChange={Number(teamSize)}
        activePlayerChange={(n) => setActivePlayer(`${n}`)}
      />
    </section>
  );
}
export default App;

export function _class(...n: (string | undefined | null | boolean)[]): string {
  return n.filter((v) => typeof v === "string").join(" ");
}
