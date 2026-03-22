import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./Snake.css";

const GRID_SIZE = 18;
const INITIAL_SPEED = 170;
const MIN_SPEED = 85;

const DIRECTIONS = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

function getRandomFood(snake) {
    let food = null;

    while (!food) {
        const next = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE),
        };

        const overlapsSnake = snake.some(
            (segment) => segment.x === next.x && segment.y === next.y
        );

        if (!overlapsSnake) {
            food = next;
        }
    }

    return food;
}

function getInitialSnake() {
    return [
        { x: 8, y: 9 },
        { x: 7, y: 9 },
        { x: 6, y: 9 },
    ];
}

function getStoredBestScore() {
    const stored = window.localStorage.getItem("snake-best-score");
    return stored ? Number(stored) : 0;
}

export default function Snake() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [snake, setSnake] = useState(getInitialSnake);
    const [food, setFood] = useState(() => getRandomFood(getInitialSnake()));
    const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
    const [queuedDirection, setQueuedDirection] = useState(DIRECTIONS.RIGHT);
    const [score, setScore] = useState(0);
    const [bestScore, setBestScore] = useState(0);
    const [speed, setSpeed] = useState(INITIAL_SPEED);
    const [isPaused, setIsPaused] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);

    const boardRef = useRef(null);

    useEffect(() => {
        setBestScore(getStoredBestScore());
    }, []);

    useEffect(() => {
        if (!gameStarted || isPaused || isGameOver) return undefined;

        const interval = window.setInterval(() => {
            setSnake((prevSnake) => {
                const currentDirection = queuedDirection;
                const head = prevSnake[0];
                const nextHead = {
                    x: head.x + currentDirection.x,
                    y: head.y + currentDirection.y,
                };

                const hitsWall =
                    nextHead.x < 0 ||
                    nextHead.x >= GRID_SIZE ||
                    nextHead.y < 0 ||
                    nextHead.y >= GRID_SIZE;

                const hitsSelf = prevSnake.some(
                    (segment) => segment.x === nextHead.x && segment.y === nextHead.y
                );

                if (hitsWall || hitsSelf) {
                    setIsGameOver(true);
                    return prevSnake;
                }

                const hasEatenFood =
                    nextHead.x === food.x && nextHead.y === food.y;

                const newSnake = [nextHead, ...prevSnake];

                if (!hasEatenFood) {
                    newSnake.pop();
                } else {
                    const nextScore = score + 1;
                    setScore(nextScore);

                    setBestScore((prev) => {
                        const updatedBest = nextScore > prev ? nextScore : prev;
                        window.localStorage.setItem(
                            "snake-best-score",
                            String(updatedBest)
                        );
                        return updatedBest;
                    });

                    setFood(getRandomFood(newSnake));
                    setSpeed((prev) => Math.max(MIN_SPEED, prev - 6));
                }

                setDirection(currentDirection);
                return newSnake;
            });
        }, speed);

        return () => window.clearInterval(interval);
    }, [food, gameStarted, isGameOver, isPaused, queuedDirection, score, speed]);

    useEffect(() => {
        if (!gameStarted) return undefined;

        const handleKeyDown = (event) => {
            const key = event.key.toLowerCase();

            if (key === " ") {
                event.preventDefault();
                if (!isGameOver) {
                    setIsPaused((prev) => !prev);
                }
                return;
            }

            if (key === "enter" && isGameOver) {
                event.preventDefault();
                handleRestart(true);
                return;
            }

            if (key === "arrowup" || key === "w") {
                event.preventDefault();
                updateDirection(DIRECTIONS.UP);
            }

            if (key === "arrowdown" || key === "s") {
                event.preventDefault();
                updateDirection(DIRECTIONS.DOWN);
            }

            if (key === "arrowleft" || key === "a") {
                event.preventDefault();
                updateDirection(DIRECTIONS.LEFT);
            }

            if (key === "arrowright" || key === "d") {
                event.preventDefault();
                updateDirection(DIRECTIONS.RIGHT);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameStarted, isGameOver, direction]);

    const updateDirection = (nextDirection) => {
        const isOpposite =
            (direction.x === 1 && nextDirection.x === -1) ||
            (direction.x === -1 && nextDirection.x === 1) ||
            (direction.y === 1 && nextDirection.y === -1) ||
            (direction.y === -1 && nextDirection.y === 1);

        if (isOpposite) return;

        setQueuedDirection(nextDirection);
        setIsPaused(false);
    };

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const handleRestart = (keepStarted = false) => {
        const initialSnake = getInitialSnake();

        setSnake(initialSnake);
        setFood(getRandomFood(initialSnake));
        setDirection(DIRECTIONS.RIGHT);
        setQueuedDirection(DIRECTIONS.RIGHT);
        setScore(0);
        setSpeed(INITIAL_SPEED);
        setIsPaused(false);
        setIsGameOver(false);

        window.requestAnimationFrame(() => {
            boardRef.current?.focus();
        });

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setBestScore(getStoredBestScore());
        }
    };

    const boardCells = useMemo(() => {
        const cells = [];

        for (let y = 0; y < GRID_SIZE; y += 1) {
            for (let x = 0; x < GRID_SIZE; x += 1) {
                const isSnakeHead = snake[0]?.x === x && snake[0]?.y === y;
                const isSnakeBody = snake
                    .slice(1)
                    .some((segment) => segment.x === x && segment.y === y);
                const isFood = food.x === x && food.y === y;

                cells.push({
                    key: `${x}-${y}`,
                    isSnakeHead,
                    isSnakeBody,
                    isFood,
                });
            }
        }

        return cells;
    }, [snake, food]);

    const statusText = isGameOver
        ? `Game over, ${playerName}. Press Enter or tap restart to play again.`
        : isPaused
            ? "Game paused. Press space or tap resume."
            : "Use arrow keys, WASD, or on-screen controls to move the snake.";

    return (
        <>
            <Header />

            <main className={`snake-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="snake-shell">
                    <div className="snake-hero">
                        <span className="snake-eyebrow">Game Zone</span>
                        <h1 className="snake-title">Snake</h1>
                        <p className="snake-copy">
                            A responsive arcade-style snake game with keyboard input,
                            mobile controls, score tracking, pause state, and local best score.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="snake-card snake-setup-card">
                            <div className="snake-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the arcade challenge.</p>
                            </div>

                            <form className="snake-form" onSubmit={handleStartGame}>
                                <label className="snake-field">
                                    <span>Player Name</span>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => setDraftName(e.target.value)}
                                        placeholder="Enter player name"
                                    />
                                </label>

                                <button type="submit" className="snake-btn snake-btn--primary">
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="snake-game-layout">
                            <aside className="snake-card snake-sidebar">
                                <div>
                                    <div className="snake-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track score, pace, game state, and best run.</p>
                                    </div>

                                    <div className="snake-player">
                                        <div className="snake-player__avatar">🐍</div>
                                        <div className="snake-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Arcade player</span>
                                        </div>
                                    </div>

                                    <div className="snake-stats">
                                        <div className="snake-stat">
                                            <span>Score</span>
                                            <strong>{score}</strong>
                                        </div>
                                        <div className="snake-stat">
                                            <span>Best Score</span>
                                            <strong>{bestScore}</strong>
                                        </div>
                                        <div className="snake-stat">
                                            <span>Speed</span>
                                            <strong>{Math.round((INITIAL_SPEED / speed) * 100)}%</strong>
                                        </div>
                                        <div className="snake-stat">
                                            <span>Status</span>
                                            <strong>
                                                {isGameOver ? "Over" : isPaused ? "Paused" : "Live"}
                                            </strong>
                                        </div>
                                    </div>

                                    <div className="snake-help">
                                        <span>Controls</span>
                                        <ul>
                                            <li>Arrow keys or WASD to move</li>
                                            <li>Space to pause or resume</li>
                                            <li>Enter to restart after game over</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="snake-side-actions">
                                    <button
                                        type="button"
                                        className="snake-btn snake-btn--secondary"
                                        onClick={() => setIsPaused((prev) => !prev)}
                                        disabled={isGameOver}
                                    >
                                        {isPaused ? "Resume" : "Pause"}
                                    </button>

                                    <button
                                        type="button"
                                        className="snake-btn snake-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="snake-btn snake-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="snake-card snake-board-card">
                                <div className="snake-board-card__top">
                                    <div className="snake-status-wrap">
                                        <span className="snake-status-label">Live Status</span>
                                        <h2 className="snake-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div
                                    className={`snake-board ${isGameOver ? "is-game-over" : ""}`}
                                    ref={boardRef}
                                    tabIndex={0}
                                    aria-label="Snake game board"
                                >
                                    {boardCells.map((cell) => (
                                        <div
                                            key={cell.key}
                                            className={`snake-cell ${cell.isSnakeHead
                                                    ? "is-head"
                                                    : cell.isSnakeBody
                                                        ? "is-body"
                                                        : cell.isFood
                                                            ? "is-food"
                                                            : ""
                                                }`}
                                        />
                                    ))}

                                    {isGameOver && (
                                        <div className="snake-overlay">
                                            <div className="snake-overlay__content">
                                                <h3>Game Over</h3>
                                                <p>Your final score was {score}.</p>
                                                <button
                                                    type="button"
                                                    className="snake-btn snake-btn--primary"
                                                    onClick={() => handleRestart(true)}
                                                >
                                                    Play Again
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div className="snake-mobile-controls">
                                    <button
                                        type="button"
                                        className="snake-control snake-control--up"
                                        onClick={() => updateDirection(DIRECTIONS.UP)}
                                        aria-label="Move up"
                                    >
                                        ↑
                                    </button>

                                    <div className="snake-mobile-controls__middle">
                                        <button
                                            type="button"
                                            className="snake-control"
                                            onClick={() => updateDirection(DIRECTIONS.LEFT)}
                                            aria-label="Move left"
                                        >
                                            ←
                                        </button>

                                        <button
                                            type="button"
                                            className="snake-control snake-control--center"
                                            onClick={() => setIsPaused((prev) => !prev)}
                                            aria-label="Pause or resume"
                                        >
                                            {isPaused ? "▶" : "❚❚"}
                                        </button>

                                        <button
                                            type="button"
                                            className="snake-control"
                                            onClick={() => updateDirection(DIRECTIONS.RIGHT)}
                                            aria-label="Move right"
                                        >
                                            →
                                        </button>
                                    </div>

                                    <button
                                        type="button"
                                        className="snake-control snake-control--down"
                                        onClick={() => updateDirection(DIRECTIONS.DOWN)}
                                        aria-label="Move down"
                                    >
                                        ↓
                                    </button>
                                </div>
                            </div>
                        </section>
                    )}
                </section>
            </main>

            <FooterSticky />
        </>
    );
}