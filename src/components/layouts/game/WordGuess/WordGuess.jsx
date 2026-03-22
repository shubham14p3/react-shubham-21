import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./WordGuess.css";

const MAX_ATTEMPTS = 6;
const WORD_LENGTH = 5;

const WORD_BANK = [
    "REACT",
    "ROUTE",
    "STATE",
    "STORE",
    "ARRAY",
    "STACK",
    "MOUSE",
    "BOARD",
    "LOGIC",
    "INPUT",
    "TOKEN",
    "SCORE",
    "LEVEL",
    "GAMER",
    "STYLE",
];

const KEYBOARD_ROWS = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACK"],
];

function getRandomWord() {
    return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function createEmptyGuesses() {
    return Array.from({ length: MAX_ATTEMPTS }, () => "");
}

function evaluateGuess(guess, answer) {
    const result = Array.from({ length: WORD_LENGTH }, () => "absent");
    const answerChars = answer.split("");
    const guessChars = guess.split("");

    for (let index = 0; index < WORD_LENGTH; index += 1) {
        if (guessChars[index] === answerChars[index]) {
            result[index] = "correct";
            answerChars[index] = null;
            guessChars[index] = null;
        }
    }

    for (let index = 0; index < WORD_LENGTH; index += 1) {
        if (!guessChars[index]) continue;

        const foundIndex = answerChars.indexOf(guessChars[index]);

        if (foundIndex !== -1) {
            result[index] = "present";
            answerChars[foundIndex] = null;
        }
    }

    return result;
}

function getKeyboardStateMap(evaluations, guesses) {
    const priority = {
        absent: 1,
        present: 2,
        correct: 3,
    };

    const nextMap = {};

    guesses.forEach((guess, guessIndex) => {
        if (!guess || guess.length !== WORD_LENGTH) return;

        const rowEvaluation = evaluations[guessIndex];
        if (!rowEvaluation) return;

        guess.split("").forEach((letter, letterIndex) => {
            const state = rowEvaluation[letterIndex];
            const current = nextMap[letter];

            if (!current || priority[state] > priority[current]) {
                nextMap[letter] = state;
            }
        });
    });

    return nextMap;
}

export default function WordGuess() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [answer, setAnswer] = useState(getRandomWord());
    const [guesses, setGuesses] = useState(createEmptyGuesses);
    const [evaluations, setEvaluations] = useState([]);
    const [currentRow, setCurrentRow] = useState(0);
    const [currentInput, setCurrentInput] = useState("");
    const [message, setMessage] = useState("Type a 5-letter word to begin.");
    const [isGameWon, setIsGameWon] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [wins, setWins] = useState(0);
    const [streak, setStreak] = useState(0);

    const keyboardState = useMemo(
        () => getKeyboardStateMap(evaluations, guesses),
        [evaluations, guesses]
    );

    const attemptsUsed = evaluations.length;
    const attemptsLeft = MAX_ATTEMPTS - attemptsUsed;

    useEffect(() => {
        if (!gameStarted) return undefined;

        const handleKeyDown = (event) => {
            const key = event.key.toUpperCase();

            if (isGameWon || isGameOver) return;

            if (/^[A-Z]$/.test(key)) {
                handleLetterInput(key);
                return;
            }

            if (key === "BACKSPACE") {
                handleBackspace();
                return;
            }

            if (key === "ENTER") {
                handleSubmitGuess();
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [gameStarted, currentInput, currentRow, isGameWon, isGameOver, guesses, evaluations, answer]);

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const handleRestart = (keepStarted = false) => {
        setAnswer(getRandomWord());
        setGuesses(createEmptyGuesses());
        setEvaluations([]);
        setCurrentRow(0);
        setCurrentInput("");
        setMessage("Type a 5-letter word to begin.");
        setIsGameWon(false);
        setIsGameOver(false);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setWins(0);
            setStreak(0);
        }
    };

    const handleLetterInput = (letter) => {
        if (isGameWon || isGameOver) return;
        if (currentInput.length >= WORD_LENGTH) return;

        setCurrentInput((prev) => `${prev}${letter}`);
        setMessage("Build your guess and submit.");
    };

    const handleBackspace = () => {
        if (isGameWon || isGameOver) return;

        setCurrentInput((prev) => prev.slice(0, -1));
    };

    const handleSubmitGuess = () => {
        if (isGameWon || isGameOver) return;

        if (currentInput.length !== WORD_LENGTH) {
            setMessage("Guess must be 5 letters.");
            return;
        }

        const guess = currentInput.toUpperCase();
        const nextEvaluation = evaluateGuess(guess, answer);

        setGuesses((prev) =>
            prev.map((item, index) => (index === currentRow ? guess : item))
        );
        setEvaluations((prev) => [...prev, nextEvaluation]);

        if (guess === answer) {
            setIsGameWon(true);
            setWins((prev) => prev + 1);
            setStreak((prev) => prev + 1);
            setMessage(`Excellent, ${playerName}. You guessed the word.`);
            setCurrentInput("");
            return;
        }

        if (currentRow + 1 >= MAX_ATTEMPTS) {
            setIsGameOver(true);
            setStreak(0);
            setMessage(`Round over. The word was ${answer}.`);
            setCurrentInput("");
            return;
        }

        setCurrentRow((prev) => prev + 1);
        setCurrentInput("");
        setMessage("Keep going. Use the tile colors as hints.");
    };

    const handleKeyboardPress = (key) => {
        if (key === "ENTER") {
            handleSubmitGuess();
            return;
        }

        if (key === "BACK") {
            handleBackspace();
            return;
        }

        handleLetterInput(key);
    };

    const statusText = isGameWon
        ? `${playerName} solved the word in ${attemptsUsed} attempt${attemptsUsed > 1 ? "s" : ""}.`
        : isGameOver
            ? `No attempts left. The answer was ${answer}.`
            : message;

    return (
        <>
            <Header />

            <main className={`word-guess-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="word-guess-shell">
                    <div className="word-guess-hero">
                        <span className="word-guess-eyebrow">Game Zone</span>
                        <h1 className="word-guess-title">Word Guess</h1>
                        <p className="word-guess-copy">
                            A polished Wordle-style game with keyboard support, attempt tracking,
                            evaluation states, responsive layout, and clean game feedback.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="word-guess-card word-guess-setup-card">
                            <div className="word-guess-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the 5-letter challenge.</p>
                            </div>

                            <form className="word-guess-form" onSubmit={handleStartGame}>
                                <label className="word-guess-field">
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
                                    className="word-guess-btn word-guess-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="word-guess-game-layout">
                            <aside className="word-guess-card word-guess-sidebar">
                                <div>
                                    <div className="word-guess-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track attempts, streak, wins, and round progress.</p>
                                    </div>

                                    <div className="word-guess-player">
                                        <div className="word-guess-player__avatar">🔤</div>
                                        <div className="word-guess-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Word challenger</span>
                                        </div>
                                    </div>

                                    <div className="word-guess-stats">
                                        <div className="word-guess-stat">
                                            <span>Attempts Left</span>
                                            <strong>{attemptsLeft}</strong>
                                        </div>
                                        <div className="word-guess-stat">
                                            <span>Used</span>
                                            <strong>{attemptsUsed}</strong>
                                        </div>
                                        <div className="word-guess-stat">
                                            <span>Wins</span>
                                            <strong>{wins}</strong>
                                        </div>
                                        <div className="word-guess-stat">
                                            <span>Streak</span>
                                            <strong>{streak}</strong>
                                        </div>
                                    </div>

                                    <div className="word-guess-help">
                                        <span>How it works</span>
                                        <ul>
                                            <li>Green means correct letter and position</li>
                                            <li>Yellow means correct letter, wrong position</li>
                                            <li>Dark means the letter is not in the word</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="word-guess-side-actions">
                                    <button
                                        type="button"
                                        className="word-guess-btn word-guess-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="word-guess-btn word-guess-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="word-guess-card word-guess-board-card">
                                <div className="word-guess-board-card__top">
                                    <div className="word-guess-status-wrap">
                                        <span className="word-guess-status-label">Live Status</span>
                                        <h2 className="word-guess-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="word-guess-grid">
                                    {guesses.map((guess, rowIndex) => {
                                        const isActiveRow = rowIndex === currentRow && !isGameWon && !isGameOver;
                                        const displayValue = isActiveRow ? currentInput : guess;
                                        const evaluation = evaluations[rowIndex] || [];

                                        return (
                                            <div className="word-guess-row" key={`row-${rowIndex}`}>
                                                {Array.from({ length: WORD_LENGTH }, (_, cellIndex) => {
                                                    const letter = displayValue[cellIndex] || "";
                                                    const state = guess ? evaluation[cellIndex] : "";

                                                    return (
                                                        <div
                                                            key={`cell-${rowIndex}-${cellIndex}`}
                                                            className={`word-guess-tile ${state ? `is-${state}` : ""
                                                                } ${isActiveRow && letter ? "is-filled" : ""}`}
                                                        >
                                                            {letter}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="word-guess-keyboard">
                                    {KEYBOARD_ROWS.map((row, rowIndex) => (
                                        <div className="word-guess-keyboard__row" key={`keyboard-row-${rowIndex}`}>
                                            {row.map((key) => (
                                                <button
                                                    key={key}
                                                    type="button"
                                                    className={`word-guess-key ${keyboardState[key] ? `is-${keyboardState[key]}` : ""
                                                        } ${key === "ENTER" || key === "BACK" ? "is-wide" : ""}`}
                                                    onClick={() => handleKeyboardPress(key)}
                                                    disabled={isGameWon || isGameOver}
                                                >
                                                    {key === "BACK" ? "⌫" : key}
                                                </button>
                                            ))}
                                        </div>
                                    ))}
                                </div>

                                {(isGameWon || isGameOver) && (
                                    <div className="word-guess-result-banner">
                                        <div className="word-guess-result-banner__content">
                                            <h3>{isGameWon ? "Word solved" : "Round over"}</h3>
                                            <p>
                                                {isGameWon
                                                    ? `You guessed ${answer} successfully.`
                                                    : `The correct word was ${answer}.`}
                                            </p>
                                        </div>

                                        <div className="word-guess-result-banner__actions">
                                            <button
                                                type="button"
                                                className="word-guess-btn word-guess-btn--primary"
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