function Square({ value, onClick, isWinningSquare }) {
  return (
    <button
      className={`square ${
        isWinningSquare ? "winning-square" : ""
      }`}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default Square;