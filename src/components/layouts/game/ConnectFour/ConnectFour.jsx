import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./ConnectFour.css";

const ROWS = 6;
const COLUMNS = 7;
const PLAYER_ONE = "player";
const PLAYER_TWO = "computer";

function createBoard() {
    return Array.from({ length: ROWS }, () => Array.from({ length: COLUMNS }, () => null));
}

function getDropRow(board, column) {
    for (let row = ROWS - 1; row >= 0; row -= 1) {
        if (!board[row][column]) {
            return row;
        }
    }

    return -1;
}

function placeDisc(board, column, value) {
    const row = getDropRow(board, column);

    if (row === -1) {
        return null;
    }

    const nextBoard = board.map((boardRow) => [...boardRow]);
    nextBoard[row][column] = value;

    return {
        board: nextBoard,
        row,
        column,
    };
}

function isBoardFull(board) {
    return board[0].every(Boolean);
}

function checkWinner(board, targetRow, targetColumn, player) {
    const directions = [
        { rowStep: 0, colStep: 1 },
        { rowStep: 1, colStep: 0 },
        { rowStep: 1, colStep: 1 },
        { rowStep: 1, colStep: -1 },
    ];

    const winningCells = [];

    for (const { rowStep, colStep } of directions) {
        let cells = [{ row: targetRow, col: targetColumn }];

        let row = targetRow + rowStep;
        let col = targetColumn + colStep;

        while (
            row >= 0 &&
            row < ROWS &&
            col >= 0 &&
            col < COLUMNS &&
            board[row][col] === player
        ) {
            cells.push({ row, col });
            row += rowStep;
            col += colStep;
        }

        row = targetRow - rowStep;
        col = targetColumn - colStep;

        while (
            row >= 0 &&
            row < ROWS &&
            col >= 0 &&
            col < COLUMNS &&
            board[row][col] === player
        ) {
            cells.unshift({ row, col });
            row -= rowStep;
            col -= colStep;
        }

        if (cells.length >= 4) {
            winningCells.push(...cells);
            return cells;
        }
    }

    return winningCells;
}

function getComputerMove(board) {
    const validColumns = Array.from({ length: COLUMNS }, (_, index) => index).filter(
        (column) => getDropRow(board, column) !== -1
    );

    if (!validColumns.length) return -1;

    for (const column of validColumns) {
        const simulated = placeDisc(board, column, PLAYER_TWO);
        if (!simulated) continue;
        if (checkWinner(simulated.board, simulated.row, simulated.column, PLAYER_TWO).length >= 4) {
            return column;
        }
    }

    for (const column of validColumns) {
        const simulated = placeDisc(board, column, PLAYER_ONE);
        if (!simulated) continue;
        if (checkWinner(simulated.board, simulated.row, simulated.column, PLAYER_ONE).length >= 4) {
            return column;
        }
    }

    const preferred = [3, 2, 4, 1, 5, 0, 6];
    const strategic = preferred.find((column) => validColumns.includes(column));

    return strategic ?? validColumns[0];
}

export default function ConnectFour() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [board, setBoard] = useState(createBoard);
    const [currentTurn, setCurrentTurn] = useState(PLAYER_ONE);
    const [winner, setWinner] = useState(null);
    const [winningCells, setWinningCells] = useState([]);
    const [isDraw, setIsDraw] = useState(false);
    const [isThinking, setIsThinking] = useState(false);
    const [score, setScore] = useState({
        player: 0,
        computer: 0,
        draw: 0,
    });

    const canPlay = !winner && !isDraw && !isThinking;

    const boardMeta = useMemo(() => {
        const winningSet = new Set(winningCells.map((cell) => `${cell.row}-${cell.col}`));

        return board.map((row, rowIndex) =>
            row.map((cell, columnIndex) => ({
                value: cell,
                key: `${rowIndex}-${columnIndex}`,
                isWinning: winningSet.has(`${rowIndex}-${columnIndex}`),
            }))
        );
    }, [board, winningCells]);

    const statusText = winner === PLAYER_ONE
        ? `${playerName} wins the round.`
        : winner === PLAYER_TWO
            ? "Computer wins the round."
            : isDraw
                ? "Round ended in a draw."
                : isThinking
                    ? "Computer is thinking..."
                    : currentTurn === PLAYER_ONE
                        ? `${playerName}, choose a column to drop your disc.`
                        : "Computer turn in progress.";

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const finishRound = (nextWinner, nextWinningCells = [], draw = false) => {
        setWinner(nextWinner);
        setWinningCells(nextWinningCells);
        setIsDraw(draw);

        if (draw) {
            setScore((prev) => ({
                ...prev,
                draw: prev.draw + 1,
            }));
            return;
        }

        if (nextWinner === PLAYER_ONE) {
            setScore((prev) => ({
                ...prev,
                player: prev.player + 1,
            }));
            return;
        }

        if (nextWinner === PLAYER_TWO) {
            setScore((prev) => ({
                ...prev,
                computer: prev.computer + 1,
            }));
        }
    };

    const runPlayerMove = (column) => {
        if (!canPlay || currentTurn !== PLAYER_ONE) return;

        const move = placeDisc(board, column, PLAYER_ONE);

        if (!move) return;

        const nextWinningCells = checkWinner(move.board, move.row, move.column, PLAYER_ONE);

        setBoard(move.board);

        if (nextWinningCells.length >= 4) {
            finishRound(PLAYER_ONE, nextWinningCells, false);
            return;
        }

        if (isBoardFull(move.board)) {
            finishRound(null, [], true);
            return;
        }

        setCurrentTurn(PLAYER_TWO);
        setIsThinking(true);

        window.setTimeout(() => {
            const aiColumn = getComputerMove(move.board);

            if (aiColumn === -1) {
                setIsThinking(false);
                finishRound(null, [], true);
                return;
            }

            const aiMove = placeDisc(move.board, aiColumn, PLAYER_TWO);

            if (!aiMove) {
                setIsThinking(false);
                setCurrentTurn(PLAYER_ONE);
                return;
            }

            const aiWinningCells = checkWinner(
                aiMove.board,
                aiMove.row,
                aiMove.column,
                PLAYER_TWO
            );

            setBoard(aiMove.board);
            setIsThinking(false);

            if (aiWinningCells.length >= 4) {
                finishRound(PLAYER_TWO, aiWinningCells, false);
                return;
            }

            if (isBoardFull(aiMove.board)) {
                finishRound(null, [], true);
                return;
            }

            setCurrentTurn(PLAYER_ONE);
        }, 450);
    };

    const handleRestart = (keepStarted = false) => {
        setBoard(createBoard());
        setCurrentTurn(PLAYER_ONE);
        setWinner(null);
        setWinningCells([]);
        setIsDraw(false);
        setIsThinking(false);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setScore({
                player: 0,
                computer: 0,
                draw: 0,
            });
        }
    };

    return (
        <>
            <Header />

            <main className={`connect-four-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="connect-four-shell">
                    <div className="connect-four-hero">
                        <span className="connect-four-eyebrow">Game Zone</span>
                        <h1 className="connect-four-title">Connect Four</h1>
                        <p className="connect-four-copy">
                            A responsive Connect Four game with player-vs-computer gameplay,
                            win detection, session scoring, and a polished board-first layout.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="connect-four-card connect-four-setup-card">
                            <div className="connect-four-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and challenge the computer.</p>
                            </div>

                            <form className="connect-four-form" onSubmit={handleStartGame}>
                                <label className="connect-four-field">
                                    <span>Player Name</span>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => setDraftName(e.target.value)}
                                        placeholder="Enter player name"
                                    />
                                </label>

                                <button
                                    type="submit"
                                    className="connect-four-btn connect-four-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="connect-four-game-layout">
                            <aside className="connect-four-card connect-four-sidebar">
                                <div>
                                    <div className="connect-four-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track round score, turn state, and active players.</p>
                                    </div>

                                    <div className="connect-four-player-list">
                                        <div
                                            className={`connect-four-player ${currentTurn === PLAYER_ONE && !winner && !isDraw ? "is-active" : ""
                                                }`}
                                        >
                                            <div className="connect-four-player__disc is-player" />
                                            <div className="connect-four-player__meta">
                                                <strong>{playerName}</strong>
                                                <span>You</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`connect-four-player ${currentTurn === PLAYER_TWO && !winner && !isDraw ? "is-active" : ""
                                                }`}
                                        >
                                            <div className="connect-four-player__disc is-computer" />
                                            <div className="connect-four-player__meta">
                                                <strong>Computer</strong>
                                                <span>AI Opponent</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="connect-four-stats">
                                        <div className="connect-four-stat">
                                            <span>{playerName}</span>
                                            <strong>{score.player}</strong>
                                        </div>
                                        <div className="connect-four-stat">
                                            <span>Computer</span>
                                            <strong>{score.computer}</strong>
                                        </div>
                                        <div className="connect-four-stat">
                                            <span>Draws</span>
                                            <strong>{score.draw}</strong>
                                        </div>
                                        <div className="connect-four-stat">
                                            <span>Status</span>
                                            <strong>
                                                {winner
                                                    ? "Finished"
                                                    : isDraw
                                                        ? "Draw"
                                                        : isThinking
                                                            ? "Thinking"
                                                            : currentTurn === PLAYER_ONE
                                                                ? "Your turn"
                                                                : "AI turn"}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="connect-four-help">
                                        <span>How to Play</span>
                                        <ul>
                                            <li>Tap or click a column to drop your disc</li>
                                            <li>Connect 4 horizontally, vertically, or diagonally</li>
                                            <li>Computer blocks simple winning moves</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="connect-four-side-actions">
                                    <button
                                        type="button"
                                        className="connect-four-btn connect-four-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Round
                                    </button>

                                    <button
                                        type="button"
                                        className="connect-four-btn connect-four-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="connect-four-card connect-four-board-card">
                                <div className="connect-four-board-card__top">
                                    <div className="connect-four-status-wrap">
                                        <span className="connect-four-status-label">Live Status</span>
                                        <h2 className="connect-four-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="connect-four-column-buttons">
                                    {Array.from({ length: COLUMNS }, (_, columnIndex) => (
                                        <button
                                            key={`column-control-${columnIndex}`}
                                            type="button"
                                            className="connect-four-column-button"
                                            onClick={() => runPlayerMove(columnIndex)}
                                            disabled={!canPlay || currentTurn !== PLAYER_ONE || getDropRow(board, columnIndex) === -1}
                                            aria-label={`Drop disc in column ${columnIndex + 1}`}
                                        >
                                            ↓
                                        </button>
                                    ))}
                                </div>

                                <div className="connect-four-board">
                                    {boardMeta.map((row) =>
                                        row.map((cell) => (
                                            <div
                                                key={cell.key}
                                                className={`connect-four-cell ${cell.isWinning ? "is-winning" : ""}`}
                                            >
                                                <span
                                                    className={`connect-four-disc ${cell.value === PLAYER_ONE
                                                            ? "is-player"
                                                            : cell.value === PLAYER_TWO
                                                                ? "is-computer"
                                                                : "is-empty"
                                                        }`}
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>

                                {(winner || isDraw) && (
                                    <div className="connect-four-result-banner">
                                        <div className="connect-four-result-banner__content">
                                            <h3>
                                                {winner === PLAYER_ONE
                                                    ? "Round won"
                                                    : winner === PLAYER_TWO
                                                        ? "Computer won"
                                                        : "Round drawn"}
                                            </h3>
                                            <p>
                                                {winner === PLAYER_ONE
                                                    ? `${playerName} connected four first.`
                                                    : winner === PLAYER_TWO
                                                        ? "Computer completed the winning sequence."
                                                        : "No more moves available on the board."}
                                            </p>
                                        </div>

                                        <div className="connect-four-result-banner__actions">
                                            <button
                                                type="button"
                                                className="connect-four-btn connect-four-btn--primary"
                                                onClick={() => handleRestart(true)}
                                            >
                                                Play Next Round
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