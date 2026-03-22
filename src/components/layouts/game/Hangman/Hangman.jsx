import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./Hangman.css";

const WORD_BANK = [
    { word: "REACT", category: "Frontend" },
    { word: "JAVASCRIPT", category: "Language" },
    { word: "COMPONENT", category: "Architecture" },
    { word: "HOOKS", category: "React" },
    { word: "ROUTER", category: "Navigation" },
    { word: "VITE", category: "Tooling" },
    { word: "BROWSER", category: "Platform" },
    { word: "FUNCTION", category: "Programming" },
    { word: "STYLING", category: "UI" },
    { word: "STATE", category: "React" },
];

const MAX_WRONG_GUESSES = 6;
const ALPHABETS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function getRandomWord() {
    return WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)];
}

function getUniqueLetters(word) {
    return [...new Set(word.split(""))];
}

function getHangmanStage(wrongGuesses) {
    const stages = [
        { head: false, body: false, leftArm: false, rightArm: false, leftLeg: false, rightLeg: false },
        { head: true, body: false, leftArm: false, rightArm: false, leftLeg: false, rightLeg: false },
        { head: true, body: true, leftArm: false, rightArm: false, leftLeg: false, rightLeg: false },
        { head: true, body: true, leftArm: true, rightArm: false, leftLeg: false, rightLeg: false },
        { head: true, body: true, leftArm: true, rightArm: true, leftLeg: false, rightLeg: false },
        { head: true, body: true, leftArm: true, rightArm: true, leftLeg: true, rightLeg: false },
        { head: true, body: true, leftArm: true, rightArm: true, leftLeg: true, rightLeg: true },
    ];

    return stages[Math.min(wrongGuesses, MAX_WRONG_GUESSES)];
}

export default function Hangman() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [currentWord, setCurrentWord] = useState(() => getRandomWord());
    const [guessedLetters, setGuessedLetters] = useState([]);
    const [wrongLetters, setWrongLetters] = useState([]);
    const [wins, setWins] = useState(0);

    const uniqueLetters = useMemo(
        () => getUniqueLetters(currentWord.word),
        [currentWord]
    );

    const wrongGuessCount = wrongLetters.length;
    const attemptsLeft = MAX_WRONG_GUESSES - wrongGuessCount;

    const isWon = uniqueLetters.every((letter) => guessedLetters.includes(letter));
    const isLost = wrongGuessCount >= MAX_WRONG_GUESSES;
    const isGameOver = isWon || isLost;

    const displayWord = currentWord.word.split("").map((letter) => ({
        letter,
        isVisible: guessedLetters.includes(letter) || isLost,
    }));

    const hangman = getHangmanStage(wrongGuessCount);

    const statusText = isWon
        ? `Excellent, ${playerName}. You guessed the word correctly.`
        : isLost
            ? `Game over. The word was ${currentWord.word}.`
            : "Guess the hidden word one letter at a time.";

    const handleStartGame = (event) => {
        event.preventDefault();
        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const handleLetterGuess = (letter) => {
        if (isGameOver) return;
        if (guessedLetters.includes(letter) || wrongLetters.includes(letter)) return;

        if (currentWord.word.includes(letter)) {
            const nextGuessedLetters = [...guessedLetters, letter];
            setGuessedLetters(nextGuessedLetters);

            const nextWon = uniqueLetters.every(
                (uniqueLetter) => nextGuessedLetters.includes(uniqueLetter)
            );

            if (nextWon) {
                setWins((prev) => prev + 1);
            }

            return;
        }

        setWrongLetters((prev) => [...prev, letter]);
    };

    const handleRestart = (keepStarted = false) => {
        setCurrentWord(getRandomWord());
        setGuessedLetters([]);
        setWrongLetters([]);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
            setWins(0);
        }
    };

    const handleNextWord = () => {
        setCurrentWord(getRandomWord());
        setGuessedLetters([]);
        setWrongLetters([]);
    };

    return (
        <>
            <Header />

            <main className={`hangman-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="hangman-shell">
                    <div className="hangman-hero">
                        <span className="hangman-eyebrow">Game Zone</span>
                        <h1 className="hangman-title">Hangman</h1>
                        <p className="hangman-copy">
                            A clean React word game with category hints, score tracking,
                            keyboard interactions, attempt management, and responsive gameplay.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="hangman-card hangman-setup-card">
                            <div className="hangman-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the word challenge.</p>
                            </div>

                            <form className="hangman-form" onSubmit={handleStartGame}>
                                <label className="hangman-field">
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
                                    className="hangman-btn hangman-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="hangman-game-layout">
                            <aside className="hangman-card hangman-sidebar">
                                <div>
                                    <div className="hangman-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track category, attempts left, score, and used letters.</p>
                                    </div>

                                    <div className="hangman-player">
                                        <div className="hangman-player__avatar">🕹️</div>
                                        <div className="hangman-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Word challenger</span>
                                        </div>
                                    </div>

                                    <div className="hangman-stats">
                                        <div className="hangman-stat">
                                            <span>Category</span>
                                            <strong>{currentWord.category}</strong>
                                        </div>
                                        <div className="hangman-stat">
                                            <span>Attempts Left</span>
                                            <strong>{attemptsLeft}</strong>
                                        </div>
                                        <div className="hangman-stat">
                                            <span>Wrong Letters</span>
                                            <strong>{wrongGuessCount}</strong>
                                        </div>
                                        <div className="hangman-stat">
                                            <span>Wins</span>
                                            <strong>{wins}</strong>
                                        </div>
                                    </div>

                                    <div className="hangman-used">
                                        <span>Used Letters</span>
                                        <div className="hangman-used__list">
                                            {[...guessedLetters, ...wrongLetters].length === 0 ? (
                                                <em>No guesses yet</em>
                                            ) : (
                                                [...guessedLetters, ...wrongLetters].map((letter) => (
                                                    <span
                                                        key={`${letter}-used`}
                                                        className={`hangman-used__chip ${wrongLetters.includes(letter) ? "is-wrong" : "is-correct"
                                                            }`}
                                                    >
                                                        {letter}
                                                    </span>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="hangman-side-actions">
                                    <button
                                        type="button"
                                        className="hangman-btn hangman-btn--secondary"
                                        onClick={handleNextWord}
                                    >
                                        New Word
                                    </button>

                                    <button
                                        type="button"
                                        className="hangman-btn hangman-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="hangman-card hangman-board-card">
                                <div className="hangman-board-card__top">
                                    <div className="hangman-status-wrap">
                                        <span className="hangman-status-label">Live Status</span>
                                        <h2 className="hangman-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="hangman-stage">
                                    <div className="hangman-gallows">
                                        <div className="hangman-gallows__base" />
                                        <div className="hangman-gallows__pole" />
                                        <div className="hangman-gallows__top" />
                                        <div className="hangman-gallows__rope" />

                                        {hangman.head && <div className="hangman-part hangman-part--head" />}
                                        {hangman.body && <div className="hangman-part hangman-part--body" />}
                                        {hangman.leftArm && <div className="hangman-part hangman-part--left-arm" />}
                                        {hangman.rightArm && <div className="hangman-part hangman-part--right-arm" />}
                                        {hangman.leftLeg && <div className="hangman-part hangman-part--left-leg" />}
                                        {hangman.rightLeg && <div className="hangman-part hangman-part--right-leg" />}
                                    </div>
                                </div>

                                <div className="hangman-word">
                                    {displayWord.map((item, index) => (
                                        <div key={`${item.letter}-${index}`} className="hangman-word__slot">
                                            <span>{item.isVisible ? item.letter : ""}</span>
                                        </div>
                                    ))}
                                </div>

                                <div className="hangman-keyboard">
                                    {ALPHABETS.map((letter) => {
                                        const isUsed =
                                            guessedLetters.includes(letter) || wrongLetters.includes(letter);

                                        const isCorrect = guessedLetters.includes(letter);
                                        const isWrong = wrongLetters.includes(letter);

                                        return (
                                            <button
                                                key={letter}
                                                type="button"
                                                className={`hangman-key ${isCorrect ? "is-correct" : ""
                                                    } ${isWrong ? "is-wrong" : ""}`}
                                                onClick={() => handleLetterGuess(letter)}
                                                disabled={isUsed || isGameOver}
                                            >
                                                {letter}
                                            </button>
                                        );
                                    })}
                                </div>

                                {isGameOver && (
                                    <div className="hangman-result-banner">
                                        <div className="hangman-result-banner__content">
                                            <h3>{isWon ? "You solved it" : "Round lost"}</h3>
                                            <p>
                                                {isWon
                                                    ? `Great work. ${currentWord.word} was the correct answer.`
                                                    : `Better luck next round. The word was ${currentWord.word}.`}
                                            </p>
                                        </div>

                                        <div className="hangman-result-banner__actions">
                                            <button
                                                type="button"
                                                className="hangman-btn hangman-btn--primary"
                                                onClick={handleNextWord}
                                            >
                                                Play Next
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