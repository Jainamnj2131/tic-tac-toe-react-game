import Square from "./Square";

function Board({ board, handleClick, winningSquares }) {
  return (
    <div className="board">
      {board.map((value, index) => (
        <Square
          key={index}
          value={value}
          onClick={() => handleClick(index)}
          isWinningSquare={winningSquares.includes(index)}
        />
      ))}
    </div>
  );
}

export default Board;