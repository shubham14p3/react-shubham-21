import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./Minesweeper.css";

const DIFFICULTY_CONFIG = {
    easy: { rows: 8, cols: 8, mines: 10, label: "Easy" },
    medium: { rows: 10, cols: 10, mines: 18, label: "Medium" },
    hard: { rows: 12, cols: 12, mines: 28, label: "Hard" },
};

function createEmptyBoard(rows, cols) {
    return Array.from({ length: rows }, (_, row) =>
        Array.from({ length: cols }, (_, col) => ({
            id: `${row}-${col}`,
            row,
            col,
            isMine: false,
            isRevealed: false,
            isFlagged: false,
            adjacentMines: 0,
        }))
    );
}

function getNeighbors(row, col, rows, cols) {
    const neighbors = [];

    for (let rowOffset = -1; rowOffset <= 1; rowOffset += 1) {
        for (let colOffset = -1; colOffset <= 1; colOffset += 1) {
            if (rowOffset === 0 && colOffset === 0) continue;

            const nextRow = row + rowOffset;
            const nextCol = col + colOffset;

            if (
                nextRow >= 0 &&
                nextRow < rows &&
                nextCol >= 0 &&
                nextCol < cols
            ) {
                neighbors.push({ row: nextRow, col: nextCol });
            }
        }
    }

    return neighbors;
}

function buildBoard(rows, cols, mines) {
    const board = createEmptyBoard(rows, cols);
    const allPositions = [];

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            allPositions.push({ row, col });
        }
    }

    for (let i = allPositions.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [allPositions[i], allPositions[j]] = [allPositions[j], allPositions[i]];
    }

    const minePositions = allPositions.slice(0, mines);

    minePositions.forEach(({ row, col }) => {
        board[row][col].isMine = true;
    });

    for (let row = 0; row < rows; row += 1) {
        for (let col = 0; col < cols; col += 1) {
            if (board[row][col].isMine) continue;

            const neighbors = getNeighbors(row, col, rows, cols);
            const count = neighbors.reduce((total, neighbor) => {
                return total + (board[neighbor.row][neighbor.col].isMine ? 1 : 0);
            }, 0);

            board[row][col].adjacentMines = count;
        }
    }

    return board;
}

function revealAllMines(board) {
    return board.map((row) =>
        row.map((cell) =>
            cell.isMine ? { ...cell, isRevealed: true } : cell
        )
    );
}

function revealConnectedCells(board, startRow, startCol) {
    const rows = board.length;
    const cols = board[0].length;
    const nextBoard = board.map((row) => row.map((cell) => ({ ...cell })));
    const queue = [{ row: startRow, col: startCol }];
    const visited = new Set();

    while (queue.length) {
        const current = queue.shift();
        if (!current) continue;

        const key = `${current.row}-${current.col}`;
        if (visited.has(key)) continue;
        visited.add(key);

        const currentCell = nextBoard[current.row][current.col];
        if (currentCell.isFlagged || currentCell.isRevealed) continue;

        currentCell.isRevealed = true;

        if (currentCell.adjacentMines !== 0 || currentCell.isMine) {
            continue;
        }

        const neighbors = getNeighbors(current.row, current.col, rows, cols);

        neighbors.forEach((neighbor) => {
            const neighborCell = nextBoard[neighbor.row][neighbor.col];
            if (!neighborCell.isRevealed && !neighborCell.isMine) {
                queue.push(neighbor);
            }
        });
    }

    return nextBoard;
}

function countFlags(board) {
    return board.flat().filter((cell) => cell.isFlagged).length;
}

function countRevealedSafeCells(board) {
    return board
        .flat()
        .filter((cell) => cell.isRevealed && !cell.isMine).length;
}

function getNumberClass(count) {
    if (count === 1) return "is-one";
    if (count === 2) return "is-two";
    if (count === 3) return "is-three";
    if (count === 4) return "is-four";
    if (count === 5) return "is-five";
    return "is-many";
}

export default function Minesweeper() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [difficulty, setDifficulty] = useState("easy");
    const [board, setBoard] = useState(() => {
        const config = DIFFICULTY_CONFIG.easy;
        return buildBoard(config.rows, config.cols, config.mines);
    });

    const [isFlagMode, setIsFlagMode] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [timer, setTimer] = useState(0);
    const [wins, setWins] = useState(0);

    const config = DIFFICULTY_CONFIG[difficulty];

    useEffect(() => {
        if (!gameStarted || isGameOver || isGameWon) return undefined;

        const interval = window.setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => window.clearInterval(interval);
    }, [gameStarted, isGameOver, isGameWon]);

    const flaggedCount = useMemo(() => countFlags(board), [board]);
    const minesLeft = Math.max(config.mines - flaggedCount, 0);

    useEffect(() => {
        const revealedSafeCells = countRevealedSafeCells(board);
        const totalSafeCells = config.rows * config.cols - config.mines;

        if (
            gameStarted &&
            !isGameOver &&
            revealedSafeCells === totalSafeCells &&
            totalSafeCells > 0
        ) {
            setIsGameWon(true);
            setWins((prev) => prev + 1);
        }
    }, [board, config, gameStarted, isGameOver]);

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true, difficulty);
    };

    const handleRestart = (keepStarted = false, nextDifficulty = difficulty) => {
        const nextConfig = DIFFICULTY_CONFIG[nextDifficulty];

        setBoard(buildBoard(nextConfig.rows, nextConfig.cols, nextConfig.mines));
        setDifficulty(nextDifficulty);
        setIsFlagMode(false);
        setIsGameOver(false);
        setIsGameWon(false);
        setTimer(0);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setWins(0);
        }
    };

    const handleDifficultyChange = (nextDifficulty) => {
        handleRestart(true, nextDifficulty);
    };

    const handleCellAction = (rowIndex, colIndex) => {
        if (isGameOver || isGameWon) return;

        const clickedCell = board[rowIndex][colIndex];
        if (clickedCell.isRevealed) return;

        if (isFlagMode) {
            if (clickedCell.isRevealed) return;

            setBoard((prevBoard) =>
                prevBoard.map((row, rowIdx) =>
                    row.map((cell, colIdx) =>
                        rowIdx === rowIndex && colIdx === colIndex
                            ? { ...cell, isFlagged: !cell.isFlagged }
                            : cell
                    )
                )
            );
            return;
        }

        if (clickedCell.isFlagged) return;

        if (clickedCell.isMine) {
            setBoard((prevBoard) => revealAllMines(prevBoard));
            setIsGameOver(true);
            return;
        }

        setBoard((prevBoard) => revealConnectedCells(prevBoard, rowIndex, colIndex));
    };

    const handleRightClick = (event, rowIndex, colIndex) => {
        event.preventDefault();

        if (isGameOver || isGameWon) return;

        const clickedCell = board[rowIndex][colIndex];
        if (clickedCell.isRevealed) return;

        setBoard((prevBoard) =>
            prevBoard.map((row, rowIdx) =>
                row.map((cell, colIdx) =>
                    rowIdx === rowIndex && colIdx === colIndex
                        ? { ...cell, isFlagged: !cell.isFlagged }
                        : cell
                )
            )
        );
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const statusText = isGameWon
        ? `Excellent, ${playerName}. You cleared the board.`
        : isGameOver
            ? "Mine triggered. Round lost."
            : isFlagMode
                ? "Flag mode is active. Tap cells to place or remove flags."
                : "Reveal safe cells and avoid all mines.";

    return (
        <>
            <Header />

            <main className={`minesweeper-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="minesweeper-shell">
                    <div className="minesweeper-hero">
                        <span className="minesweeper-eyebrow">Game Zone</span>
                        <h1 className="minesweeper-title">Minesweeper</h1>
                        <p className="minesweeper-copy">
                            A responsive Minesweeper game with difficulty levels, flag mode,
                            timer, mine tracking, and clean production-style UI.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="minesweeper-card minesweeper-setup-card">
                            <div className="minesweeper-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and choose a difficulty to begin.</p>
                            </div>

                            <form className="minesweeper-form" onSubmit={handleStartGame}>
                                <label className="minesweeper-field">
                                    <span>Player Name</span>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => setDraftName(e.target.value)}
                                        placeholder="Enter player name"
                                    />
                                </label>

                                <div className="minesweeper-difficulty-select">
                                    {Object.entries(DIFFICULTY_CONFIG).map(([key, value]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            className={`minesweeper-chip ${difficulty === key ? "is-active" : ""
                                                }`}
                                            onClick={() => setDifficulty(key)}
                                        >
                                            {value.label}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    type="submit"
                                    className="minesweeper-btn minesweeper-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="minesweeper-game-layout">
                            <aside className="minesweeper-card minesweeper-sidebar">
                                <div>
                                    <div className="minesweeper-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track mode, timer, mines left, and progress.</p>
                                    </div>

                                    <div className="minesweeper-player">
                                        <div className="minesweeper-player__avatar">💣</div>
                                        <div className="minesweeper-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Mine hunter</span>
                                        </div>
                                    </div>

                                    <div className="minesweeper-stats">
                                        <div className="minesweeper-stat">
                                            <span>Difficulty</span>
                                            <strong>{config.label}</strong>
                                        </div>
                                        <div className="minesweeper-stat">
                                            <span>Timer</span>
                                            <strong>{formatTime(timer)}</strong>
                                        </div>
                                        <div className="minesweeper-stat">
                                            <span>Mines Left</span>
                                            <strong>{minesLeft}</strong>
                                        </div>
                                        <div className="minesweeper-stat">
                                            <span>Wins</span>
                                            <strong>{wins}</strong>
                                        </div>
                                    </div>

                                    <div className="minesweeper-mode-wrap">
                                        <button
                                            type="button"
                                            className={`minesweeper-btn minesweeper-btn--mode ${isFlagMode ? "is-active" : ""
                                                }`}
                                            onClick={() => setIsFlagMode((prev) => !prev)}
                                            disabled={isGameOver || isGameWon}
                                        >
                                            {isFlagMode ? "Flag Mode On" : "Reveal Mode On"}
                                        </button>
                                    </div>

                                    <div className="minesweeper-difficulty-group">
                                        {Object.entries(DIFFICULTY_CONFIG).map(([key, value]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                className={`minesweeper-chip ${difficulty === key ? "is-active" : ""
                                                    }`}
                                                onClick={() => handleDifficultyChange(key)}
                                            >
                                                {value.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="minesweeper-help">
                                        <span>How to Play</span>
                                        <ul>
                                            <li>Tap to reveal cells</li>
                                            <li>Use flag mode to mark suspected mines</li>
                                            <li>Right click on desktop also toggles flag</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="minesweeper-side-actions">
                                    <button
                                        type="button"
                                        className="minesweeper-btn minesweeper-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="minesweeper-btn minesweeper-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="minesweeper-card minesweeper-board-card">
                                <div className="minesweeper-board-card__top">
                                    <div className="minesweeper-status-wrap">
                                        <span className="minesweeper-status-label">Live Status</span>
                                        <h2 className="minesweeper-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div
                                    className={`minesweeper-board difficulty-${difficulty}`}
                                    style={{
                                        gridTemplateColumns: `repeat(${config.cols}, minmax(0, 1fr))`,
                                    }}
                                >
                                    {board.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => (
                                            <button
                                                key={cell.id}
                                                type="button"
                                                className={`minesweeper-cell ${cell.isRevealed ? "is-revealed" : ""
                                                    } ${cell.isMine && cell.isRevealed ? "is-mine" : ""}`}
                                                onClick={() => handleCellAction(rowIndex, colIndex)}
                                                onContextMenu={(event) =>
                                                    handleRightClick(event, rowIndex, colIndex)
                                                }
                                            >
                                                {cell.isRevealed ? (
                                                    cell.isMine ? (
                                                        <span className="minesweeper-cell__mine">💣</span>
                                                    ) : cell.adjacentMines > 0 ? (
                                                        <span
                                                            className={`minesweeper-cell__count ${getNumberClass(
                                                                cell.adjacentMines
                                                            )}`}
                                                        >
                                                            {cell.adjacentMines}
                                                        </span>
                                                    ) : null
                                                ) : cell.isFlagged ? (
                                                    <span className="minesweeper-cell__flag">🚩</span>
                                                ) : null}
                                            </button>
                                        ))
                                    )}
                                </div>

                                {(isGameWon || isGameOver) && (
                                    <div className="minesweeper-result-banner">
                                        <div className="minesweeper-result-banner__content">
                                            <h3>{isGameWon ? "Board cleared" : "Mine exploded"}</h3>
                                            <p>
                                                {isGameWon
                                                    ? `You completed the ${config.label.toLowerCase()} board in ${formatTime(timer)}.`
                                                    : "A mine was revealed before the board was cleared."}
                                            </p>
                                        </div>

                                        <div className="minesweeper-result-banner__actions">
                                            <button
                                                type="button"
                                                className="minesweeper-btn minesweeper-btn--primary"
                                                onClick={() => handleRestart(true)}
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