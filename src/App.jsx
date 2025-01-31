import { useRef, useState } from "react";
import { Die } from "./components/Die";
import { useEffect } from "react";
import Confetti from "react-confetti";

export function App() {
  const [dice, setDice] = useState(() => generateNewDice());

  useEffect(() => {
    generateNewDice();
  }, []);

  const btn = useRef(null);

  const gameWon =
    dice.every((d) => d.isHeld) && dice.every((d) => d.value === dice[0].value);

  if (gameWon) btn.current.focus();

  function generateNewDice() {
    // const newDice = [];
    // for (let i = 0; i < 10; i++) {
    //   const num = Math.floor(Math.random() * 6) + 1;
    //   newDice.push(num);
    // }
    // return newDice;
    let i = 0;
    return new Array(10).fill(0).map(() => ({
      value: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: i++,
    }));
  }

  function rollDice() {
    if (!gameWon) rollUnheldDice();
    else newGame();
  }
  function rollUnheldDice() {
    const newDice = generateNewDice();
    let i = 0;

    setDice((prev) =>
      prev.map((d) =>
        d.isHeld ? d : { ...d, value: Math.floor(Math.random() * 6) + 1 }
      )
    );
  }

  function newGame() {
    setDice(generateNewDice());
  }

  function Hold(id) {
    setDice((prev) => {
      return prev.map((d) => (d.id === id ? { ...d, isHeld: !d.isHeld } : d));

      // const newDice = [...prev];
      // newDice[id].isHeld = !isHeld;
      // return newDice;
    });
  }

  function Dice() {
    return dice.map((d, index) => (
      <Die
        value={d.value}
        isHeld={d.isHeld}
        id={d.id}
        key={index}
        hold={Hold}
      />
    ));
  }

  return (
    <main>
      {gameWon ? <Confetti /> : undefined}
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You won! Press "New Game" to start again.</p>
        )}
      </div>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div>{Dice()}</div>
      <button onClick={rollDice} className="roll-dice" ref={btn}>
        {gameWon ? "New Game" : "Roll"}
      </button>
    </main>
  );
}
