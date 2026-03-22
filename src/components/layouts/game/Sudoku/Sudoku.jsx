import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./Sudoku.css";

const DIFFICULTY_LEVELS = {
    easy: {
        label: "Easy",
        puzzles: [
            {
                puzzle:
                    "530070000600195000098000060800060003400803001700020006060000280000419005000080079",
                solution:
                    "534678912672195348198342567859761423426853791713924856961537284287419635345286179",
            },
            {
                puzzle:
                    "200080300060070084030500209000105408000000000402706000301007040720040060004010003",
                solution:
                    "245986371169273584837541269976125438513498627482736915391657842728349156654812793",
            },
        ],
    },
    medium: {
        label: "Medium",
        puzzles: [
            {
                puzzle:
                    "000260701680070090190004500820100040004602900050003028009300074040050036703018000",
                solution:
                    "435269781682571493197834562826195347374682915951743628519326874248957136763418259",
            },
            {
                puzzle:
                    "300000000005009000200504000020000700160000058704310600000890100000067080000005437",
                solution:
                    "391672845645189273278534961523948716169723458784316529437891162952467381816255437",
            },
        ],
    },
    hard: {
        label: "Hard",
        puzzles: [
            {
                puzzle:
                    "000000907000420180000705026100904000050000040000507009920108000034059000507000000",
                solution:
                    "483651927659423187271795326138964572957312648246587319925148763314259865567836491",
            },
            {
                puzzle:
                    "030000080009000500000207000700010000053000790000080004000705000001000600040000030",
                solution:
                    "237459186469138572815267943784916325153824796926583714398745261571392648642671839",
            },
        ],
    },
};

function getRandomPuzzle(level) {
    const items = DIFFICULTY_LEVELS[level].puzzles;
    return items[Math.floor(Math.random() * items.length)];
}

function toGrid(value) {
    const chars = value.split("");
    const rows = [];

    for (let row = 0; row < 9; row += 1) {
        rows.push(chars.slice(row * 9, row * 9 + 9));
    }

    return rows;
}

function getSubgridCells(row, col) {
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    const cells = [];

    for (let r = startRow; r < startRow + 3; r += 1) {
        for (let c = startCol; c < startCol + 3; c += 1) {
            cells.push(`${r}-${c}`);
        }
    }

    return cells;
}

export default function Sudoku() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [difficulty, setDifficulty] = useState("easy");
    const [puzzle, setPuzzle] = useState(() => getRandomPuzzle("easy"));
    const [board, setBoard] = useState(() => toGrid(getRandomPuzzle("easy").puzzle));
    const [selectedCell, setSelectedCell] = useState(null);
    const [mistakes, setMistakes] = useState(0);
    const [wins, setWins] = useState(0);
    const [timer, setTimer] = useState(0);
    const [isWon, setIsWon] = useState(false);

    useEffect(() => {
        if (!gameStarted || isWon) return undefined;

        const interval = window.setInterval(() => {
            setTimer((prev) => prev + 1);
        }, 1000);

        return () => window.clearInterval(interval);
    }, [gameStarted, isWon]);

    useEffect(() => {
        if (!gameStarted) return;

        const boardString = board.flat().join("");
        if (boardString === puzzle.solution) {
            setIsWon(true);
            setWins((prev) => prev + 1);
        }
    }, [board, gameStarted, puzzle.solution]);

    useEffect(() => {
        if (!gameStarted) return undefined;

        const handleKeyDown = (event) => {
            if (isWon || !selectedCell) return;

            const { row, col } = selectedCell;
            const cellValue = puzzle.puzzle[row * 9 + col];

            if (cellValue !== "0") return;

            if (/^[1-9]$/.test(event.key)) {
                fillCell(event.key);
            }

            if (event.key === "Backspace" || event.key === "Delete" || event.key === "0") {
                clearCell();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameStarted, isWon, selectedCell, board, puzzle]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true, difficulty);
    };

    const handleRestart = (keepStarted = false, nextDifficulty = difficulty) => {
        const nextPuzzle = getRandomPuzzle(nextDifficulty);

        setDifficulty(nextDifficulty);
        setPuzzle(nextPuzzle);
        setBoard(toGrid(nextPuzzle.puzzle));
        setSelectedCell(null);
        setMistakes(0);
        setTimer(0);
        setIsWon(false);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setWins(0);
        }
    };

    const fillCell = (value) => {
        if (!selectedCell || isWon) return;

        const { row, col } = selectedCell;
        const originalValue = puzzle.puzzle[row * 9 + col];

        if (originalValue !== "0") return;

        const solutionValue = puzzle.solution[row * 9 + col];

        setBoard((prev) =>
            prev.map((boardRow, rowIndex) =>
                boardRow.map((cell, colIndex) =>
                    rowIndex === row && colIndex === col ? value : cell
                )
            )
        );

        if (value !== solutionValue) {
            setMistakes((prev) => prev + 1);
        }
    };

    const clearCell = () => {
        if (!selectedCell || isWon) return;

        const { row, col } = selectedCell;
        const originalValue = puzzle.puzzle[row * 9 + col];

        if (originalValue !== "0") return;

        setBoard((prev) =>
            prev.map((boardRow, rowIndex) =>
                boardRow.map((cell, colIndex) =>
                    rowIndex === row && colIndex === col ? "0" : cell
                )
            )
        );
    };

    const selectedValue = selectedCell ? board[selectedCell.row][selectedCell.col] : null;

    const highlightData = useMemo(() => {
        if (!selectedCell) {
            return {
                selectedKey: null,
                row: -1,
                col: -1,
                subgrid: [],
                matchingValue: null,
            };
        }

        const value = board[selectedCell.row][selectedCell.col];

        return {
            selectedKey: `${selectedCell.row}-${selectedCell.col}`,
            row: selectedCell.row,
            col: selectedCell.col,
            subgrid: getSubgridCells(selectedCell.row, selectedCell.col),
            matchingValue: value !== "0" ? value : null,
        };
    }, [selectedCell, board]);

    const statusText = isWon
        ? `Excellent, ${playerName}. You completed the ${DIFFICULTY_LEVELS[difficulty].label.toLowerCase()} puzzle.`
        : selectedCell
            ? "Use the keypad or keyboard numbers 1 to 9 to fill the selected cell."
            : "Select an empty cell to begin solving the puzzle.";

    return (
        <>
            <Header />

            <main className={`sudoku-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="sudoku-shell">
                    <div className="sudoku-hero">
                        <span className="sudoku-eyebrow">Game Zone</span>
                        <h1 className="sudoku-title">Sudoku</h1>
                        <p className="sudoku-copy">
                            A responsive Sudoku game with difficulty levels, keypad input,
                            timer, mistake tracking, and a clean production-style layout.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="sudoku-card sudoku-setup-card">
                            <div className="sudoku-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and choose a difficulty to begin.</p>
                            </div>

                            <form className="sudoku-form" onSubmit={handleStartGame}>
                                <label className="sudoku-field">
                                    <span>Player Name</span>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => setDraftName(e.target.value)}
                                        placeholder="Enter player name"
                                    />
                                </label>

                                <div className="sudoku-difficulty-group">
                                    {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                                        <button
                                            key={key}
                                            type="button"
                                            className={`sudoku-chip ${difficulty === key ? "is-active" : ""}`}
                                            onClick={() => setDifficulty(key)}
                                        >
                                            {value.label}
                                        </button>
                                    ))}
                                </div>

                                <button type="submit" className="sudoku-btn sudoku-btn--primary">
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="sudoku-game-layout">
                            <aside className="sudoku-card sudoku-sidebar">
                                <div>
                                    <div className="sudoku-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track difficulty, time, mistakes, and wins.</p>
                                    </div>

                                    <div className="sudoku-player">
                                        <div className="sudoku-player__avatar">🔢</div>
                                        <div className="sudoku-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Sudoku solver</span>
                                        </div>
                                    </div>

                                    <div className="sudoku-stats">
                                        <div className="sudoku-stat">
                                            <span>Difficulty</span>
                                            <strong>{DIFFICULTY_LEVELS[difficulty].label}</strong>
                                        </div>
                                        <div className="sudoku-stat">
                                            <span>Time</span>
                                            <strong>{formatTime(timer)}</strong>
                                        </div>
                                        <div className="sudoku-stat">
                                            <span>Mistakes</span>
                                            <strong>{mistakes}</strong>
                                        </div>
                                        <div className="sudoku-stat">
                                            <span>Wins</span>
                                            <strong>{wins}</strong>
                                        </div>
                                    </div>

                                    <div className="sudoku-difficulty-group is-in-game">
                                        {Object.entries(DIFFICULTY_LEVELS).map(([key, value]) => (
                                            <button
                                                key={key}
                                                type="button"
                                                className={`sudoku-chip ${difficulty === key ? "is-active" : ""}`}
                                                onClick={() => handleRestart(true, key)}
                                            >
                                                {value.label}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="sudoku-help">
                                        <span>How to Play</span>
                                        <ul>
                                            <li>Each row must contain numbers 1 to 9</li>
                                            <li>Each column must contain numbers 1 to 9</li>
                                            <li>Each 3x3 box must also contain 1 to 9</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="sudoku-side-actions">
                                    <button
                                        type="button"
                                        className="sudoku-btn sudoku-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="sudoku-btn sudoku-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="sudoku-card sudoku-board-card">
                                <div className="sudoku-board-card__top">
                                    <div className="sudoku-status-wrap">
                                        <span className="sudoku-status-label">Live Status</span>
                                        <h2 className="sudoku-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="sudoku-board">
                                    {board.map((row, rowIndex) =>
                                        row.map((cell, colIndex) => {
                                            const key = `${rowIndex}-${colIndex}`;
                                            const originalValue = puzzle.puzzle[rowIndex * 9 + colIndex];
                                            const isFixed = originalValue !== "0";
                                            const isSelected = highlightData.selectedKey === key;
                                            const isHighlighted =
                                                highlightData.row === rowIndex ||
                                                highlightData.col === colIndex ||
                                                highlightData.subgrid.includes(key);
                                            const isMatching =
                                                highlightData.matchingValue &&
                                                board[rowIndex][colIndex] === highlightData.matchingValue;

                                            return (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`sudoku-cell
                            ${isFixed ? "is-fixed" : "is-editable"}
                            ${isSelected ? "is-selected" : ""}
                            ${isHighlighted ? "is-highlighted" : ""}
                            ${isMatching ? "is-matching" : ""}
                            ${colIndex === 2 || colIndex === 5 ? "has-right-border" : ""}
                            ${rowIndex === 2 || rowIndex === 5 ? "has-bottom-border" : ""}
                          `}
                                                    onClick={() => setSelectedCell({ row: rowIndex, col: colIndex })}
                                                >
                                                    {cell !== "0" ? cell : ""}
                                                </button>
                                            );
                                        })
                                    )}
                                </div>

                                <div className="sudoku-keypad">
                                    {Array.from({ length: 9 }, (_, index) => String(index + 1)).map((num) => (
                                        <button
                                            key={num}
                                            type="button"
                                            className={`sudoku-key ${selectedValue === num ? "is-active" : ""
                                                }`}
                                            onClick={() => fillCell(num)}
                                            disabled={isWon}
                                        >
                                            {num}
                                        </button>
                                    ))}

                                    <button
                                        type="button"
                                        className="sudoku-key sudoku-key--clear"
                                        onClick={clearCell}
                                        disabled={isWon}
                                    >
                                        Clear
                                    </button>
                                </div>

                                {isWon && (
                                    <div className="sudoku-result-banner">
                                        <div className="sudoku-result-banner__content">
                                            <h3>Puzzle solved</h3>
                                            <p>
                                                You completed the puzzle in {formatTime(timer)} with {mistakes} mistake
                                                {mistakes !== 1 ? "s" : ""}.
                                            </p>
                                        </div>

                                        <div className="sudoku-result-banner__actions">
                                            <button
                                                type="button"
                                                className="sudoku-btn sudoku-btn--primary"
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