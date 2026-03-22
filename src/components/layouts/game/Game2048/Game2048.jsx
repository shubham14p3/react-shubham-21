import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./Game2048.css";

const GRID_SIZE = 4;
const WIN_TILE = 2048;
const STORAGE_KEY = "game-2048-best-score";

function createEmptyBoard() {
    return Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => 0)
    );
}

function getEmptyCells(board) {
    const emptyCells = [];

    for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
            if (board[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    return emptyCells;
}

function addRandomTile(board) {
    const emptyCells = getEmptyCells(board);

    if (!emptyCells.length) return board;

    const { row, col } =
        emptyCells[Math.floor(Math.random() * emptyCells.length)];
    const nextBoard = board.map((boardRow) => [...boardRow]);

    nextBoard[row][col] = Math.random() < 0.9 ? 2 : 4;

    return nextBoard;
}

function createInitialBoard() {
    let board = createEmptyBoard();
    board = addRandomTile(board);
    board = addRandomTile(board);
    return board;
}

function boardsAreEqual(boardA, boardB) {
    for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
            if (boardA[row][col] !== boardB[row][col]) {
                return false;
            }
        }
    }

    return true;
}

function processLine(line) {
    const compact = line.filter((value) => value !== 0);
    const merged = [];
    let gainedScore = 0;

    for (let index = 0; index < compact.length; index += 1) {
        if (compact[index] === compact[index + 1]) {
            const mergedValue = compact[index] * 2;
            merged.push(mergedValue);
            gainedScore += mergedValue;
            index += 1;
        } else {
            merged.push(compact[index]);
        }
    }

    while (merged.length < GRID_SIZE) {
        merged.push(0);
    }

    return {
        line: merged,
        score: gainedScore,
    };
}

function moveLeft(board) {
    let gainedScore = 0;

    const nextBoard = board.map((row) => {
        const result = processLine(row);
        gainedScore += result.score;
        return result.line;
    });

    return { board: nextBoard, score: gainedScore };
}

function reverseRows(board) {
    return board.map((row) => [...row].reverse());
}

function transposeBoard(board) {
    return board[0].map((_, colIndex) => board.map((row) => row[colIndex]));
}

function moveRight(board) {
    const reversed = reverseRows(board);
    const moved = moveLeft(reversed);
    return {
        board: reverseRows(moved.board),
        score: moved.score,
    };
}

function moveUp(board) {
    const transposed = transposeBoard(board);
    const moved = moveLeft(transposed);
    return {
        board: transposeBoard(moved.board),
        score: moved.score,
    };
}

function moveDown(board) {
    const transposed = transposeBoard(board);
    const moved = moveRight(transposed);
    return {
        board: transposeBoard(moved.board),
        score: moved.score,
    };
}

function hasWon(board) {
    return board.some((row) => row.some((cell) => cell >= WIN_TILE));
}

function canMove(board) {
    if (getEmptyCells(board).length > 0) return true;

    for (let row = 0; row < GRID_SIZE; row += 1) {
        for (let col = 0; col < GRID_SIZE; col += 1) {
            const current = board[row][col];
            const right = col < GRID_SIZE - 1 ? board[row][col + 1] : null;
            const down = row < GRID_SIZE - 1 ? board[row + 1][col] : null;

            if (current === right || current === down) {
                return true;
            }
        }
    }

    return false;
}

function getStoredBestScore() {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return stored ? Number(stored) : 0;
}

function getTileClassName(value) {
    if (!value) return "tile-empty";
    if (value <= 4) return "tile-light";
    if (value <= 16) return "tile-mid";
    if (value <= 64) return "tile-strong";
    if (value <= 512) return "tile-bold";
    return "tile-max";
}

export default function Game2048() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [board, setBoard] = useState(createInitialBoard);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [hasGameWon, setHasGameWon] = useState(false);
    const [hasGameOver, setHasGameOver] = useState(false);
    const [moveCount, setMoveCount] = useState(0);

    const touchStartRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        setBestScore(getStoredBestScore());
    }, []);

    useEffect(() => {
        setHasGameWon(hasWon(board));
        setHasGameOver(!canMove(board));
    }, [board]);

    const maxTile = useMemo(() => {
        return Math.max(...board.flat());
    }, [board]);

    const updateBestScore = (nextScore) => {
        setBestScore((prev) => {
            const updated = nextScore > prev ? nextScore : prev;
            window.localStorage.setItem(STORAGE_KEY, String(updated));
            return updated;
        });
    };

    const applyMove = (direction) => {
        if (hasGameOver) return;

        let result;

        switch (direction) {
            case "left":
                result = moveLeft(board);
                break;
            case "right":
                result = moveRight(board);
                break;
            case "up":
                result = moveUp(board);
                break;
            case "down":
                result = moveDown(board);
                break;
            default:
                return;
        }

        if (boardsAreEqual(board, result.board)) {
            return;
        }

        const nextBoard = addRandomTile(result.board);
        const nextScore = score + result.score;

        setBoard(nextBoard);
        setScore(nextScore);
        setMoveCount((prev) => prev + 1);
        updateBestScore(nextScore);
    };

    useEffect(() => {
        if (!gameStarted) return undefined;

        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();

            if (key === "arrowleft" || key === "a") {
                event.preventDefault();
                applyMove("left");
            }

            if (key === "arrowright" || key === "d") {
                event.preventDefault();
                applyMove("right");
            }

            if (key === "arrowup" || key === "w") {
                event.preventDefault();
                applyMove("up");
            }

            if (key === "arrowdown" || key === "s") {
                event.preventDefault();
                applyMove("down");
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [board, gameStarted, hasGameOver, score]);

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const handleRestart = (keepStarted = false) => {
        setBoard(createInitialBoard());
        setScore(0);
        setMoveCount(0);
        setHasGameWon(false);
        setHasGameOver(false);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setBestScore(getStoredBestScore());
        }
    };

    const handleTouchStart = (event) => {
        const touch = event.touches[0];
        touchStartRef.current = {
            x: touch.clientX,
            y: touch.clientY,
        };
    };

    const handleTouchEnd = (event) => {
        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - touchStartRef.current.x;
        const deltaY = touch.clientY - touchStartRef.current.y;

        const absX = Math.abs(deltaX);
        const absY = Math.abs(deltaY);
        const threshold = 24;

        if (absX < threshold && absY < threshold) return;

        if (absX > absY) {
            applyMove(deltaX > 0 ? "right" : "left");
        } else {
            applyMove(deltaY > 0 ? "down" : "up");
        }
    };

    const statusText = hasGameOver
        ? `Game over, ${playerName}. No more moves available.`
        : hasGameWon
            ? `Nice one, ${playerName}. You reached 2048. Keep going for a bigger tile.`
            : "Use arrow keys, WASD, or swipe on mobile to merge matching tiles.";

    return (
        <>
            <Header />

            <main className={`game2048-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="game2048-shell">
                    <div className="game2048-hero">
                        <span className="game2048-eyebrow">Game Zone</span>
                        <h1 className="game2048-title">2048</h1>
                        <p className="game2048-copy">
                            A responsive React 2048 game with keyboard and swipe controls,
                            scoring, local best score, win state, and polished mobile-first UI.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="game2048-card game2048-setup-card">
                            <div className="game2048-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the number merging challenge.</p>
                            </div>

                            <form className="game2048-form" onSubmit={handleStartGame}>
                                <label className="game2048-field">
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
                                    className="game2048-btn game2048-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="game2048-game-layout">
                            <aside className="game2048-card game2048-sidebar">
                                <div>
                                    <div className="game2048-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track score, best score, total moves, and progress.</p>
                                    </div>

                                    <div className="game2048-player">
                                        <div className="game2048-player__avatar">🔢</div>
                                        <div className="game2048-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Merge strategist</span>
                                        </div>
                                    </div>

                                    <div className="game2048-stats">
                                        <div className="game2048-stat">
                                            <span>Score</span>
                                            <strong>{score}</strong>
                                        </div>
                                        <div className="game2048-stat">
                                            <span>Best Score</span>
                                            <strong>{bestScore}</strong>
                                        </div>
                                        <div className="game2048-stat">
                                            <span>Moves</span>
                                            <strong>{moveCount}</strong>
                                        </div>
                                        <div className="game2048-stat">
                                            <span>Max Tile</span>
                                            <strong>{maxTile}</strong>
                                        </div>
                                    </div>

                                    <div className="game2048-help">
                                        <span>Controls</span>
                                        <ul>
                                            <li>Arrow keys or WASD on desktop</li>
                                            <li>Swipe on the board on mobile</li>
                                            <li>Merge same tiles to reach 2048</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="game2048-side-actions">
                                    <button
                                        type="button"
                                        className="game2048-btn game2048-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="game2048-btn game2048-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="game2048-card game2048-board-card">
                                <div className="game2048-board-card__top">
                                    <div className="game2048-status-wrap">
                                        <span className="game2048-status-label">Live Status</span>
                                        <h2 className="game2048-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div
                                    className="game2048-board"
                                    onTouchStart={handleTouchStart}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    {board.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => (
                                            <div
                                                key={`${rowIndex}-${colIndex}`}
                                                className={`game2048-tile ${getTileClassName(cell)}`}
                                            >
                                                {cell || ""}
                                            </div>
                                        ))
                                    )}

                                    {hasGameOver && (
                                        <div className="game2048-overlay">
                                            <div className="game2048-overlay__content">
                                                <h3>Game Over</h3>
                                                <p>Your final score was {score}.</p>
                                                <button
                                                    type="button"
                                                    className="game2048-btn game2048-btn--primary"
                                                    onClick={() => handleRestart(true)}
                                                >
                                                    Play Again
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {hasGameWon && !hasGameOver && (
                                    <div className="game2048-result-banner">
                                        <div className="game2048-result-banner__content">
                                            <h3>2048 reached</h3>
                                            <p>You unlocked the winning tile. Keep playing for more.</p>
                                        </div>

                                        <div className="game2048-result-banner__actions">
                                            <button
                                                type="button"
                                                className="game2048-btn game2048-btn--primary"
                                                onClick={() => handleRestart(true)}
                                            >
                                                New Match
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