import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./SlidingPuzzle.css";

const GRID_SIZE = 4;
const EMPTY_TILE = 0;

function createSolvedBoard() {
    const numbers = Array.from(
        { length: GRID_SIZE * GRID_SIZE - 1 },
        (_, index) => index + 1
    );

    return [...numbers, EMPTY_TILE];
}

function getInversionCount(board) {
    const filtered = board.filter((value) => value !== EMPTY_TILE);
    let inversions = 0;

    for (let i = 0; i < filtered.length; i += 1) {
        for (let j = i + 1; j < filtered.length; j += 1) {
            if (filtered[i] > filtered[j]) {
                inversions += 1;
            }
        }
    }

    return inversions;
}

function isSolvable(board) {
    const inversions = getInversionCount(board);
    const emptyIndex = board.indexOf(EMPTY_TILE);
    const emptyRowFromTop = Math.floor(emptyIndex / GRID_SIZE);
    const emptyRowFromBottom = GRID_SIZE - emptyRowFromTop;

    if (GRID_SIZE % 2 !== 0) {
        return inversions % 2 === 0;
    }

    if (emptyRowFromBottom % 2 === 0) {
        return inversions % 2 !== 0;
    }

    return inversions % 2 === 0;
}

function shuffleBoard() {
    let board = createSolvedBoard();

    do {
        board = [...board].sort(() => Math.random() - 0.5);
    } while (!isSolvable(board) || isSolved(board));

    return board;
}

function isSolved(board) {
    return board.every((value, index) => {
        if (index === board.length - 1) {
            return value === EMPTY_TILE;
        }

        return value === index + 1;
    });
}

function getTileRow(index) {
    return Math.floor(index / GRID_SIZE);
}

function getTileCol(index) {
    return index % GRID_SIZE;
}

function canMoveTile(board, tileIndex) {
    const emptyIndex = board.indexOf(EMPTY_TILE);

    const tileRow = getTileRow(tileIndex);
    const tileCol = getTileCol(tileIndex);
    const emptyRow = getTileRow(emptyIndex);
    const emptyCol = getTileCol(emptyIndex);

    const sameRow = tileRow === emptyRow && Math.abs(tileCol - emptyCol) === 1;
    const sameCol = tileCol === emptyCol && Math.abs(tileRow - emptyRow) === 1;

    return sameRow || sameCol;
}

function moveTile(board, tileIndex) {
    if (!canMoveTile(board, tileIndex)) {
        return board;
    }

    const emptyIndex = board.indexOf(EMPTY_TILE);
    const nextBoard = [...board];

    [nextBoard[tileIndex], nextBoard[emptyIndex]] = [
        nextBoard[emptyIndex],
        nextBoard[tileIndex],
    ];

    return nextBoard;
}

export default function SlidingPuzzle() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [board, setBoard] = useState(createSolvedBoard);
    const [moves, setMoves] = useState(0);
    const [wins, setWins] = useState(0);
    const [bestMoves, setBestMoves] = useState(null);
    const [timer, setTimer] = useState(0);
    const [isGameWon, setIsGameWon] = useState(false);

    useEffect(() => {
        if (!gameStarted || isGameWon) return undefined;

        const interval = window.setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => window.clearInterval(interval);
    }, [gameStarted, isGameWon]);

    useEffect(() => {
        if (!gameStarted) return;

        if (isSolved(board)) {
            setIsGameWon(true);
            setWins((prev) => prev + 1);
            setBestMoves((prev) => {
                if (prev === null) return moves;
                return moves < prev ? moves : prev;
            });
        }
    }, [board, gameStarted, moves]);

    const formattedTime = useMemo(() => {
        const mins = Math.floor(timer / 60);
        const secs = timer % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    }, [timer]);

    const statusText = isGameWon
        ? `Excellent, ${playerName}. You solved the puzzle in ${moves} moves.`
        : "Arrange the numbers in order by sliding tiles into the empty space.";

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleShuffle(true);
    };

    const handleTileClick = (tileIndex) => {
        if (isGameWon) return;
        if (!canMoveTile(board, tileIndex)) return;

        setBoard((prev) => moveTile(prev, tileIndex));
        setMoves((prev) => prev + 1);
    };

    const handleShuffle = (keepStarted = false) => {
        setBoard(shuffleBoard());
        setMoves(0);
        setTimer(0);
        setIsGameWon(false);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setWins(0);
            setBestMoves(null);
        }
    };

    return (
        <>
            <Header />

            <main className={`sliding-puzzle-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="sliding-puzzle-shell">
                    <div className="sliding-puzzle-hero">
                        <span className="sliding-puzzle-eyebrow">Game Zone</span>
                        <h1 className="sliding-puzzle-title">Sliding Puzzle</h1>
                        <p className="sliding-puzzle-copy">
                            A clean 4x4 number puzzle with move tracking, timer, shuffle logic,
                            win detection, and responsive production-ready styling.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="sliding-puzzle-card sliding-puzzle-setup-card">
                            <div className="sliding-puzzle-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the tile-solving challenge.</p>
                            </div>

                            <form className="sliding-puzzle-form" onSubmit={handleStartGame}>
                                <label className="sliding-puzzle-field">
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
                                    className="sliding-puzzle-btn sliding-puzzle-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="sliding-puzzle-game-layout">
                            <aside className="sliding-puzzle-card sliding-puzzle-sidebar">
                                <div>
                                    <div className="sliding-puzzle-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track moves, time, win count, and best performance.</p>
                                    </div>

                                    <div className="sliding-puzzle-player">
                                        <div className="sliding-puzzle-player__avatar">🧩</div>
                                        <div className="sliding-puzzle-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Puzzle solver</span>
                                        </div>
                                    </div>

                                    <div className="sliding-puzzle-stats">
                                        <div className="sliding-puzzle-stat">
                                            <span>Moves</span>
                                            <strong>{moves}</strong>
                                        </div>
                                        <div className="sliding-puzzle-stat">
                                            <span>Time</span>
                                            <strong>{formattedTime}</strong>
                                        </div>
                                        <div className="sliding-puzzle-stat">
                                            <span>Wins</span>
                                            <strong>{wins}</strong>
                                        </div>
                                        <div className="sliding-puzzle-stat">
                                            <span>Best Moves</span>
                                            <strong>{bestMoves ?? "--"}</strong>
                                        </div>
                                    </div>

                                    <div className="sliding-puzzle-help">
                                        <span>How to Play</span>
                                        <ul>
                                            <li>Tap a tile next to the empty space</li>
                                            <li>Arrange numbers from 1 to 15</li>
                                            <li>Keep the blank tile in the last position</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sliding-puzzle-side-actions">
                                    <button
                                        type="button"
                                        className="sliding-puzzle-btn sliding-puzzle-btn--secondary"
                                        onClick={() => handleShuffle(true)}
                                    >
                                        Shuffle Again
                                    </button>

                                    <button
                                        type="button"
                                        className="sliding-puzzle-btn sliding-puzzle-btn--ghost"
                                        onClick={() => handleShuffle(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="sliding-puzzle-card sliding-puzzle-board-card">
                                <div className="sliding-puzzle-board-card__top">
                                    <div className="sliding-puzzle-status-wrap">
                                        <span className="sliding-puzzle-status-label">Live Status</span>
                                        <h2 className="sliding-puzzle-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="sliding-puzzle-board">
                                    {board.map((value, index) => (
                                        <button
                                            key={`${value}-${index}`}
                                            type="button"
                                            className={`sliding-puzzle-tile ${value === EMPTY_TILE ? "is-empty" : ""
                                                } ${canMoveTile(board, index) ? "is-movable" : ""}`}
                                            onClick={() => handleTileClick(index)}
                                            disabled={value === EMPTY_TILE || isGameWon}
                                        >
                                            {value === EMPTY_TILE ? "" : value}
                                        </button>
                                    ))}
                                </div>

                                {isGameWon && (
                                    <div className="sliding-puzzle-result-banner">
                                        <div className="sliding-puzzle-result-banner__content">
                                            <h3>Puzzle solved</h3>
                                            <p>
                                                You finished the board in {moves} moves and {formattedTime}.
                                            </p>
                                        </div>

                                        <div className="sliding-puzzle-result-banner__actions">
                                            <button
                                                type="button"
                                                className="sliding-puzzle-btn sliding-puzzle-btn--primary"
                                                onClick={() => handleShuffle(true)}
                                            >
                                                Play Again
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