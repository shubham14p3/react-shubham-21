import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./TicTacToe.css";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const EMPTY_BOARD = Array(9).fill("");

function getWinner(board) {
  for (const [a, b, c] of WINNING_COMBINATIONS) {
    if (board[a] && board[a] === board[b] && board[b] === board[c]) {
      return {
        symbol: board[a],
        combination: [a, b, c],
      };
    }
  }
  return null;
}

export default function TicTacToe() {
  const [players, setPlayers] = useState({
    playerOne: "Player 1",
    playerTwo: "Player 2",
  });

  const [draftPlayers, setDraftPlayers] = useState({
    playerOne: "",
    playerTwo: "",
  });

  const [gameStarted, setGameStarted] = useState(false);
  const [board, setBoard] = useState(EMPTY_BOARD);
  const [isXTurn, setIsXTurn] = useState(true);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    draw: 0,
  });

  const winner = useMemo(() => getWinner(board), [board]);
  const isDraw = useMemo(
    () => !winner && board.every((cell) => cell !== ""),
    [board, winner]
  );

  const currentPlayerName = isXTurn ? players.playerOne : players.playerTwo;
  const currentSymbol = isXTurn ? "X" : "O";

  const statusText = winner
    ? `${winner.symbol === "X" ? players.playerOne : players.playerTwo} wins the game`
    : isDraw
      ? "Match drawn"
      : `${currentPlayerName}'s turn (${currentSymbol})`;

  const handleSubmit = (event) => {
    event.preventDefault();

    const playerOneName = draftPlayers.playerOne.trim() || "Player 1";
    const playerTwoName = draftPlayers.playerTwo.trim() || "Player 2";

    setPlayers({
      playerOne: playerOneName,
      playerTwo: playerTwoName,
    });
    setBoard(EMPTY_BOARD);
    setIsXTurn(true);
    setGameStarted(true);
  };

  const handleCellClick = (index) => {
    if (board[index] || winner || isDraw) return;

    const nextBoard = [...board];
    nextBoard[index] = isXTurn ? "X" : "O";

    const nextWinner = getWinner(nextBoard);
    const nextIsDraw = !nextWinner && nextBoard.every((cell) => cell !== "");

    setBoard(nextBoard);

    if (nextWinner) {
      setScore((prev) => ({
        ...prev,
        [nextWinner.symbol]: prev[nextWinner.symbol] + 1,
      }));
      return;
    }

    if (nextIsDraw) {
      setScore((prev) => ({
        ...prev,
        draw: prev.draw + 1,
      }));
      return;
    }

    setIsXTurn((prev) => !prev);
  };

  const handleRestart = () => {
    setBoard(EMPTY_BOARD);
    setIsXTurn(true);
  };

  const handleResetGame = () => {
    setDraftPlayers({
      playerOne: players.playerOne,
      playerTwo: players.playerTwo,
    });
    setPlayers({
      playerOne: "Player 1",
      playerTwo: "Player 2",
    });
    setBoard(EMPTY_BOARD);
    setIsXTurn(true);
    setScore({
      X: 0,
      O: 0,
      draw: 0,
    });
    setGameStarted(false);
  };

  const isWinningCell = (index) =>
    winner?.combination?.includes(index) ?? false;

  return (
    <>
      <Header />

      <main className={`ttt-page ${gameStarted ? "is-game-active" : ""}`}>
        <section className="ttt-shell">
          <div className="ttt-hero">
            <span className="ttt-eyebrow">Game Zone</span>
            <h1 className="ttt-title">Tic-Tac-Toe</h1>
            <p className="ttt-copy">
              A clean two-player experience built in React with responsive UI,
              turn tracking, winner detection, restart, and reset flow.
            </p>
          </div>

          {!gameStarted ? (
            <section className="ttt-card ttt-setup-card">
              <div className="ttt-card__head">
                <h2>Start a new match</h2>
                <p>Enter player names and begin the game.</p>
              </div>

              <form className="ttt-form" onSubmit={handleSubmit}>
                <div className="ttt-form__grid">
                  <label className="ttt-field">
                    <span>Player One (X)</span>
                    <input
                      type="text"
                      value={draftPlayers.playerOne}
                      onChange={(e) =>
                        setDraftPlayers((prev) => ({
                          ...prev,
                          playerOne: e.target.value,
                        }))
                      }
                      placeholder="Enter first player name"
                    />
                  </label>

                  <label className="ttt-field">
                    <span>Player Two (O)</span>
                    <input
                      type="text"
                      value={draftPlayers.playerTwo}
                      onChange={(e) =>
                        setDraftPlayers((prev) => ({
                          ...prev,
                          playerTwo: e.target.value,
                        }))
                      }
                      placeholder="Enter second player name"
                    />
                  </label>
                </div>

                <button type="submit" className="ttt-btn ttt-btn--primary">
                  Start Game
                </button>
              </form>
            </section>
          ) : (
            <section className="ttt-game-layout">
              <aside className="ttt-card ttt-sidebar">
                <div className="ttt-card__head">
                  <h2>Players</h2>
                  <p>Track turns and current match state.</p>
                </div>

                <div className="ttt-player-list">
                  <div
                    className={`ttt-player ${isXTurn && !winner && !isDraw ? "is-active" : ""
                      }`}
                  >
                    <div className="ttt-player__symbol">X</div>
                    <div className="ttt-player__meta">
                      <strong>{players.playerOne}</strong>
                      <span>First move</span>
                    </div>
                  </div>

                  <div
                    className={`ttt-player ${!isXTurn && !winner && !isDraw ? "is-active" : ""
                      }`}
                  >
                    <div className="ttt-player__symbol">O</div>
                    <div className="ttt-player__meta">
                      <strong>{players.playerTwo}</strong>
                      <span>Second move</span>
                    </div>
                  </div>
                </div>

                <div className="ttt-scoreboard">
                  <div className="ttt-score">
                    <span>X Wins</span>
                    <strong>{score.X}</strong>
                  </div>
                  <div className="ttt-score">
                    <span>O Wins</span>
                    <strong>{score.O}</strong>
                  </div>
                  <div className="ttt-score">
                    <span>Draws</span>
                    <strong>{score.draw}</strong>
                  </div>
                </div>
              </aside>

              <div className="ttt-card ttt-board-card">
                <div className="ttt-board-card__top">
                  <div className="ttt-status-wrap">
                    <span className="ttt-status-label">Live Status</span>
                    <h2 className="ttt-status">{statusText}</h2>
                  </div>

                  <div className="ttt-actions">
                    <button
                      type="button"
                      className="ttt-btn ttt-btn--secondary"
                      onClick={handleRestart}
                    >
                      Restart Match
                    </button>
                    <button
                      type="button"
                      className="ttt-btn ttt-btn--ghost"
                      onClick={handleResetGame}
                    >
                      Reset Game
                    </button>
                  </div>
                </div>

                <div
                  className={`ttt-board ${winner ? "has-result" : ""
                    } ${isDraw ? "is-draw" : ""}`}
                >
                  {board.map((cell, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`ttt-cell ${isWinningCell(index) ? "is-winning" : ""
                        }`}
                      onClick={() => handleCellClick(index)}
                      disabled={!!cell || !!winner || isDraw}
                      aria-label={`Cell ${index + 1}`}
                    >
                      {cell}
                    </button>
                  ))}
                </div>

                {(winner || isDraw) && (
                  <div className="ttt-result-banner">
                    <div className="ttt-result-banner__content">
                      <h3>{winner ? "Winner declared" : "It’s a draw"}</h3>
                      <p>
                        {winner
                          ? `${winner.symbol === "X" ? players.playerOne : players.playerTwo} takes this round.`
                          : "No winner this round. Try again."}
                      </p>
                    </div>
                    <div className="ttt-result-banner__actions">
                      <button
                        type="button"
                        className="ttt-btn ttt-btn--primary"
                        onClick={handleRestart}
                      >
                        Play Again
                      </button>
                      <button
                        type="button"
                        className="ttt-btn ttt-btn--ghost"
                        onClick={handleResetGame}
                      >
                        Change Players
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </section>
          )}
        </section>
      </main>

      <FooterSticky />
    </>
  );
}