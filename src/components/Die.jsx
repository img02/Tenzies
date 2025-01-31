export function Die({ value, isHeld, hold, id }) {
  const style = {
    backgroundColor: isHeld ? "#59E391" : "white",
  };

  return (
    <button
      className="die"
      style={style}
      onClick={() => hold(id)}
      aria-pressed={isHeld}
      aria-label={`Die with value ${value}, 
    ${isHeld ? "held" : "not held"}`}
    >
      {value}
    </button>
  );
}
