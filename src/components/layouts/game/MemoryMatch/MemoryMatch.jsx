import React, { useEffect, useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./MemoryMatch.css";

const CARD_EMOJIS = ["🎯", "🚀", "🔥", "🎮", "⚡", "🏆", "💎", "🎲"];

function shuffleArray(items) {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
}

function createDeck() {
    const duplicated = [...CARD_EMOJIS, ...CARD_EMOJIS];

    return shuffleArray(duplicated).map((emoji, index) => ({
        id: `${emoji}-${index}-${Date.now()}`,
        emoji,
        isFlipped: false,
        isMatched: false,
    }));
}

export default function MemoryMatch() {
    const [playerName, setPlayerName] = useState("Player");
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [cards, setCards] = useState(() => createDeck());
    const [selectedCards, setSelectedCards] = useState([]);
    const [moves, setMoves] = useState(0);
    const [matchedPairs, setMatchedPairs] = useState(0);
    const [bestScore, setBestScore] = useState(null);
    const [lockBoard, setLockBoard] = useState(false);
    const [gameWon, setGameWon] = useState(false);
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    useEffect(() => {
        if (!gameStarted || gameWon) return undefined;

        const interval = window.setInterval(() => {
            setElapsedSeconds((prev) => prev + 1);
        }, 1000);

        return () => window.clearInterval(interval);
    }, [gameStarted, gameWon]);

    useEffect(() => {
        if (selectedCards.length !== 2) return undefined;

        setLockBoard(true);

        const [firstId, secondId] = selectedCards;
        const firstCard = cards.find((card) => card.id === firstId);
        const secondCard = cards.find((card) => card.id === secondId);

        if (!firstCard || !secondCard) {
            setSelectedCards([]);
            setLockBoard(false);
            return undefined;
        }

        if (firstCard.emoji === secondCard.emoji) {
            const timeout = window.setTimeout(() => {
                setCards((prev) =>
                    prev.map((card) =>
                        card.id === firstId || card.id === secondId
                            ? { ...card, isMatched: true }
                            : card
                    )
                );
                setMatchedPairs((prev) => prev + 1);
                setSelectedCards([]);
                setLockBoard(false);
            }, 500);

            return () => window.clearTimeout(timeout);
        }

        const timeout = window.setTimeout(() => {
            setCards((prev) =>
                prev.map((card) =>
                    card.id === firstId || card.id === secondId
                        ? { ...card, isFlipped: false }
                        : card
                )
            );
            setSelectedCards([]);
            setLockBoard(false);
        }, 900);

        return () => window.clearTimeout(timeout);
    }, [selectedCards, cards]);

    useEffect(() => {
        if (matchedPairs !== CARD_EMOJIS.length) return;

        setGameWon(true);

        setBestScore((prev) => {
            if (prev === null) return moves;
            return moves < prev ? moves : prev;
        });
    }, [matchedPairs, moves]);

    const accuracy = useMemo(() => {
        if (moves === 0) return 100;
        const idealMoves = CARD_EMOJIS.length;
        const score = Math.max(0, Math.round((idealMoves / moves) * 100));
        return score;
    }, [moves]);

    const statusText = gameWon
        ? `Excellent, ${playerName}. You matched all pairs in ${moves} moves.`
        : lockBoard
            ? "Checking cards..."
            : "Flip two cards and match all pairs.";

    const handleStart = (event) => {
        event.preventDefault();

        setPlayerName(draftName.trim() || "Player");
        setGameStarted(true);
        handleRestart(true);
    };

    const handleCardClick = (clickedCard) => {
        if (lockBoard || gameWon) return;
        if (clickedCard.isFlipped || clickedCard.isMatched) return;
        if (selectedCards.length === 2) return;

        setCards((prev) =>
            prev.map((card) =>
                card.id === clickedCard.id ? { ...card, isFlipped: true } : card
            )
        );

        setSelectedCards((prev) => [...prev, clickedCard.id]);

        setMoves((prev) => prev + 1);
    };

    const handleRestart = (keepStarted = false) => {
        setCards(createDeck());
        setSelectedCards([]);
        setMoves(0);
        setMatchedPairs(0);
        setLockBoard(false);
        setGameWon(false);
        setElapsedSeconds(0);

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(playerName === "Player" ? "" : playerName);
            setPlayerName("Player");
        }
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;

        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <>
            <Header />

            <main className={`memory-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="memory-shell">
                    <div className="memory-hero">
                        <span className="memory-eyebrow">Game Zone</span>
                        <h1 className="memory-title">Memory Match</h1>
                        <p className="memory-copy">
                            A polished card matching game built in React with responsive UI,
                            timer, move tracking, best score, and smooth flip interaction.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="memory-card memory-setup-card">
                            <div className="memory-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the memory challenge.</p>
                            </div>

                            <form className="memory-form" onSubmit={handleStart}>
                                <label className="memory-field">
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
                                    className="memory-btn memory-btn--primary"
                                >
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="memory-game-layout">
                            <aside className="memory-card memory-sidebar">
                                <div>
                                    <div className="memory-card__head">
                                        <h2>Match Stats</h2>
                                        <p>Track progress, score, timing, and performance.</p>
                                    </div>

                                    <div className="memory-player">
                                        <div className="memory-player__avatar">🧠</div>
                                        <div className="memory-player__meta">
                                            <strong>{playerName}</strong>
                                            <span>Memory challenger</span>
                                        </div>
                                    </div>

                                    <div className="memory-stats">
                                        <div className="memory-stat">
                                            <span>Moves</span>
                                            <strong>{moves}</strong>
                                        </div>
                                        <div className="memory-stat">
                                            <span>Matched</span>
                                            <strong>{matchedPairs}/{CARD_EMOJIS.length}</strong>
                                        </div>
                                        <div className="memory-stat">
                                            <span>Time</span>
                                            <strong>{formatTime(elapsedSeconds)}</strong>
                                        </div>
                                        <div className="memory-stat">
                                            <span>Accuracy</span>
                                            <strong>{accuracy}%</strong>
                                        </div>
                                    </div>

                                    <div className="memory-best">
                                        <span>Best Score</span>
                                        <strong>{bestScore === null ? "--" : `${bestScore} moves`}</strong>
                                    </div>
                                </div>

                                <div className="memory-side-actions">
                                    <button
                                        type="button"
                                        className="memory-btn memory-btn--secondary"
                                        onClick={() => handleRestart(true)}
                                    >
                                        Restart Match
                                    </button>

                                    <button
                                        type="button"
                                        className="memory-btn memory-btn--ghost"
                                        onClick={() => handleRestart(false)}
                                    >
                                        Reset Game
                                    </button>
                                </div>
                            </aside>

                            <div className="memory-card memory-board-card">
                                <div className="memory-board-card__top">
                                    <div className="memory-status-wrap">
                                        <span className="memory-status-label">Live Status</span>
                                        <h2 className="memory-status">{statusText}</h2>
                                    </div>
                                </div>

                                <div className="memory-grid">
                                    {cards.map((card) => (
                                        <button
                                            key={card.id}
                                            type="button"
                                            className={`memory-tile ${card.isFlipped || card.isMatched ? "is-flipped" : ""
                                                } ${card.isMatched ? "is-matched" : ""}`}
                                            onClick={() => handleCardClick(card)}
                                        >
                                            <div className="memory-tile__inner">
                                                <div className="memory-tile__face memory-tile__face--front">
                                                    <span>?</span>
                                                </div>
                                                <div className="memory-tile__face memory-tile__face--back">
                                                    <span>{card.emoji}</span>
                                                </div>
                                            </div>
                                        </button>
                                    ))}
                                </div>

                                {gameWon && (
                                    <div className="memory-result-banner">
                                        <div className="memory-result-banner__content">
                                            <h3>All pairs matched</h3>
                                            <p>
                                                You completed the board in {moves} moves and{" "}
                                                {formatTime(elapsedSeconds)}.
                                            </p>
                                        </div>

                                        <div className="memory-result-banner__actions">
                                            <button
                                                type="button"
                                                className="memory-btn memory-btn--primary"
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