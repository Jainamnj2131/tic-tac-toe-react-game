import { useEffect, useState } from "react";
import "./App.css";
import Board from "./components/Board";

function App() {
  const [player1, setPlayer1] = useState("");
  const [player2, setPlayer2] = useState("");

  const [player1Symbol, setPlayer1Symbol] = useState("X");

  const [scores, setScores] = useState({
    player1: 0,
    player2: 0,
  });

  const [board, setBoard] = useState(Array(9).fill(null));

  const [isXTurn, setIsXTurn] = useState(true);

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6],
  ];

  const getPlayerName = (symbol) => {
    if (symbol === player1Symbol) {
      return player1 || "Player 1";
    }

    return player2 || "Player 2";
  };

  const checkWinner = () => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;

      if (
        board[a] &&
        board[a] === board[b] &&
        board[a] === board[c]
      ) {
        return {
          winner: board[a],
          winningSquares: combo,
        };
      }
    }

    return null;
  };

  const winnerData = checkWinner();

  const winner = winnerData?.winner;

  const winningSquares =
    winnerData?.winningSquares || [];

  const isDraw =
    !winner &&
    board.every((square) => square !== null);

  useEffect(() => {
    if (!winner) return;

    setScores((prevScores) => {
      if (winner === player1Symbol) {
        return {
          ...prevScores,
          player1: prevScores.player1 + 1,
        };
      }

      return {
        ...prevScores,
        player2: prevScores.player2 + 1,
      };
    });
  }, [winner, player1Symbol]);

  const handleClick = (index) => {
    if (board[index] || winner) {
      return;
    }

    const updatedBoard = [...board];

    updatedBoard[index] = isXTurn ? "X" : "O";

    setBoard(updatedBoard);

    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    setIsXTurn(true);
  };

  const resetScores = () => {
    setScores({
      player1: 0,
      player2: 0,
    });
  };

  const resetPlayers = () => {
    setPlayer1("");
    setPlayer2("");

    setScores({
      player1: 0,
      player2: 0,
    });

    setPlayer1Symbol("X");

    resetGame();
  };

  return (
    <div className="app">
      <h1 className="title">Tic Tac Toe</h1>

      <div className="players-section">
        <input
          type="text"
          placeholder="Enter Player 1 Name"
          value={player1}
          onChange={(e) => setPlayer1(e.target.value)}
        />

        <input
          type="text"
          placeholder="Enter Player 2 Name"
          value={player2}
          onChange={(e) => setPlayer2(e.target.value)}
        />

        <div className="symbol-select">
          <label>Select Player 1 Symbol:</label>

          <select
            value={player1Symbol}
            onChange={(e) =>
              setPlayer1Symbol(e.target.value)
            }
          >
            <option value="X">X</option>
            <option value="O">O</option>
          </select>
        </div>
      </div>

      <div className="leaderboard">
        <h2>Leaderboard</h2>

        <div className="score-card">
          <span>
            {player1 || "Player 1"} (
            {player1Symbol})
          </span>

          <span>{scores.player1}</span>
        </div>

        <div className="score-card">
          <span>
            {player2 || "Player 2"} (
            {player1Symbol === "X" ? "O" : "X"})
          </span>

          <span>{scores.player2}</span>
        </div>
      </div>

      <div className="status">
        {winner
          ? `🏆 Winner: ${getPlayerName(winner)}`
          : isDraw
          ? "🤝 It's a Draw!"
          : `🎮 Current Turn: ${
              isXTurn
                ? getPlayerName("X")
                : getPlayerName("O")
            }`}
      </div>

      <Board
        board={board}
        handleClick={handleClick}
        winningSquares={winningSquares}
      />

      <div className="button-group">
        <button
          className="reset-btn"
          onClick={resetGame}
        >
          Reset Game
        </button>

        <button
          className="reset-score-btn"
          onClick={resetScores}
        >
          Reset Scores
        </button>

        <button
          className="reset-player-btn"
          onClick={resetPlayers}
        >
          Reset Players
        </button>
      </div>
    </div>
  );
}

export default App;