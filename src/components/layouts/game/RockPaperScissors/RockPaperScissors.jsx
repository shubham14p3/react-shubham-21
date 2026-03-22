import React, { useMemo, useState } from "react";
import Header from "../../Header/Header";
import FooterSticky from "../../Footer/FooterSticky/FooterSticky";
import "./RockPaperScissors.css";

const CHOICES = [
    {
        id: "rock",
        label: "Rock",
        emoji: "✊",
        description: "Strong against scissors",
    },
    {
        id: "paper",
        label: "Paper",
        emoji: "✋",
        description: "Covers rock",
    },
    {
        id: "scissors",
        label: "Scissors",
        emoji: "✌️",
        description: "Cuts paper",
    },
];

const DEFAULT_PLAYERS = {
    player: "Player",
    computer: "Computer",
};

function getRandomChoice() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function getRoundWinner(playerChoice, computerChoice) {
    if (!playerChoice || !computerChoice) {
        return {
            winner: null,
            result: "idle",
            message: "Pick your move to start the round.",
        };
    }

    if (playerChoice.id === computerChoice.id) {
        return {
            winner: null,
            result: "draw",
            message: `It's a draw. Both picked ${playerChoice.label}.`,
        };
    }

    const playerWins =
        (playerChoice.id === "rock" && computerChoice.id === "scissors") ||
        (playerChoice.id === "paper" && computerChoice.id === "rock") ||
        (playerChoice.id === "scissors" && computerChoice.id === "paper");

    if (playerWins) {
        return {
            winner: "player",
            result: "win",
            message: `${playerChoice.label} beats ${computerChoice.label}. You win this round.`,
        };
    }

    return {
        winner: "computer",
        result: "lose",
        message: `${computerChoice.label} beats ${playerChoice.label}. Computer wins this round.`,
    };
}

export default function RockPaperScissors() {
    const [players, setPlayers] = useState(DEFAULT_PLAYERS);
    const [draftName, setDraftName] = useState("");
    const [gameStarted, setGameStarted] = useState(false);

    const [playerChoice, setPlayerChoice] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [round, setRound] = useState(1);
    const [lastResult, setLastResult] = useState("idle");
    const [history, setHistory] = useState([]);

    const [score, setScore] = useState({
        player: 0,
        computer: 0,
        draw: 0,
    });

    const summary = useMemo(
        () => getRoundWinner(playerChoice, computerChoice),
        [playerChoice, computerChoice]
    );

    const leadingSide = useMemo(() => {
        if (score.player === score.computer) return "tie";
        return score.player > score.computer ? "player" : "computer";
    }, [score]);

    const handleStartGame = (event) => {
        event.preventDefault();

        setPlayers({
            player: draftName.trim() || "Player",
            computer: "Computer",
        });

        setGameStarted(true);
        handleResetAll(true);
    };

    const handleChoice = (choice) => {
        const nextComputerChoice = getRandomChoice();
        const result = getRoundWinner(choice, nextComputerChoice);

        setPlayerChoice(choice);
        setComputerChoice(nextComputerChoice);
        setLastResult(result.result);

        setScore((prev) => ({
            ...prev,
            ...(result.result === "win" && { player: prev.player + 1 }),
            ...(result.result === "lose" && { computer: prev.computer + 1 }),
            ...(result.result === "draw" && { draw: prev.draw + 1 }),
        }));

        setHistory((prev) => [
            {
                id: `${Date.now()}-${choice.id}-${nextComputerChoice.id}`,
                round,
                playerChoice: choice.label,
                computerChoice: nextComputerChoice.label,
                result: result.result,
            },
            ...prev.slice(0, 5),
        ]);

        setRound((prev) => prev + 1);
    };

    const handleNextRound = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setLastResult("idle");
    };

    const handleRestartMatch = () => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setLastResult("idle");
    };

    const handleResetAll = (keepStarted = false) => {
        setPlayerChoice(null);
        setComputerChoice(null);
        setRound(1);
        setLastResult("idle");
        setHistory([]);
        setScore({
            player: 0,
            computer: 0,
            draw: 0,
        });

        if (!keepStarted) {
            setGameStarted(false);
            setDraftName(players.player === "Player" ? "" : players.player);
            setPlayers(DEFAULT_PLAYERS);
        }
    };

    const statusText =
        lastResult === "idle"
            ? "Choose Rock, Paper, or Scissors to play the next round."
            : summary.message;

    return (
        <>
            <Header />

            <main className={`rps-page ${gameStarted ? "is-game-active" : ""}`}>
                <section className="rps-shell">
                    <div className="rps-hero">
                        <span className="rps-eyebrow">Game Zone</span>
                        <h1 className="rps-title">Rock Paper Scissors</h1>
                        <p className="rps-copy">
                            A polished React game with responsive layout, scoreboard, round
                            history, restart flow, and quick one-tap gameplay for desktop and
                            mobile.
                        </p>
                    </div>

                    {!gameStarted ? (
                        <section className="rps-card rps-setup-card">
                            <div className="rps-card__head">
                                <h2>Start a new match</h2>
                                <p>Enter your name and begin the battle against the computer.</p>
                            </div>

                            <form className="rps-form" onSubmit={handleStartGame}>
                                <label className="rps-field">
                                    <span>Player Name</span>
                                    <input
                                        type="text"
                                        value={draftName}
                                        onChange={(e) => setDraftName(e.target.value)}
                                        placeholder="Enter player name"
                                    />
                                </label>

                                <button type="submit" className="rps-btn rps-btn--primary">
                                    Start Game
                                </button>
                            </form>
                        </section>
                    ) : (
                        <section className="rps-game-layout">
                            <aside className="rps-card rps-sidebar">
                                <div>
                                    <div className="rps-card__head">
                                        <h2>Match Overview</h2>
                                        <p>Live score, round tracking, and current leader.</p>
                                    </div>

                                    <div className="rps-player-list">
                                        <div
                                            className={`rps-player ${leadingSide === "player" ? "is-active" : ""
                                                }`}
                                        >
                                            <div className="rps-player__avatar">👤</div>
                                            <div className="rps-player__meta">
                                                <strong>{players.player}</strong>
                                                <span>You</span>
                                            </div>
                                        </div>

                                        <div
                                            className={`rps-player ${leadingSide === "computer" ? "is-active" : ""
                                                }`}
                                        >
                                            <div className="rps-player__avatar">🤖</div>
                                            <div className="rps-player__meta">
                                                <strong>{players.computer}</strong>
                                                <span>AI Opponent</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rps-scoreboard">
                                        <div className="rps-score">
                                            <span>{players.player}</span>
                                            <strong>{score.player}</strong>
                                        </div>
                                        <div className="rps-score">
                                            <span>Computer</span>
                                            <strong>{score.computer}</strong>
                                        </div>
                                        <div className="rps-score">
                                            <span>Draws</span>
                                            <strong>{score.draw}</strong>
                                        </div>
                                    </div>

                                    <div className="rps-meta-grid">
                                        <div className="rps-meta-card">
                                            <span>Current Round</span>
                                            <strong>{round}</strong>
                                        </div>
                                        <div className="rps-meta-card">
                                            <span>Leader</span>
                                            <strong>
                                                {leadingSide === "tie"
                                                    ? "Level"
                                                    : leadingSide === "player"
                                                        ? players.player
                                                        : "Computer"}
                                            </strong>
                                        </div>
                                    </div>
                                </div>

                                <div className="rps-history">
                                    <div className="rps-history__head">
                                        <h3>Recent Rounds</h3>
                                    </div>

                                    {history.length === 0 ? (
                                        <p className="rps-history__empty">
                                            No rounds played yet. Make your first move.
                                        </p>
                                    ) : (
                                        <div className="rps-history__list">
                                            {history.map((item) => (
                                                <div key={item.id} className="rps-history__item">
                                                    <div>
                                                        <strong>Round {item.round}</strong>
                                                        <span>
                                                            {item.playerChoice} vs {item.computerChoice}
                                                        </span>
                                                    </div>
                                                    <em
                                                        className={`rps-history__badge is-${item.result}`}
                                                    >
                                                        {item.result === "win"
                                                            ? "Won"
                                                            : item.result === "lose"
                                                                ? "Lost"
                                                                : "Draw"}
                                                    </em>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </aside>

                            <div className="rps-card rps-board-card">
                                <div className="rps-board-card__top">
                                    <div className="rps-status-wrap">
                                        <span className="rps-status-label">Live Status</span>
                                        <h2 className="rps-status">{statusText}</h2>
                                    </div>

                                    <div className="rps-actions">
                                        <button
                                            type="button"
                                            className="rps-btn rps-btn--secondary"
                                            onClick={handleRestartMatch}
                                        >
                                            Restart Round
                                        </button>
                                        <button
                                            type="button"
                                            className="rps-btn rps-btn--ghost"
                                            onClick={() => handleResetAll(false)}
                                        >
                                            Reset Game
                                        </button>
                                    </div>
                                </div>

                                <div className="rps-arena">
                                    <div className="rps-picked-panel">
                                        <span className="rps-picked-panel__label">{players.player}</span>
                                        <div className="rps-picked-panel__choice">
                                            {playerChoice ? (
                                                <>
                                                    <strong>{playerChoice.emoji}</strong>
                                                    <span>{playerChoice.label}</span>
                                                </>
                                            ) : (
                                                <span className="rps-picked-panel__placeholder">
                                                    No move selected
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="rps-versus">VS</div>

                                    <div className="rps-picked-panel">
                                        <span className="rps-picked-panel__label">
                                            {players.computer}
                                        </span>
                                        <div className="rps-picked-panel__choice">
                                            {computerChoice ? (
                                                <>
                                                    <strong>{computerChoice.emoji}</strong>
                                                    <span>{computerChoice.label}</span>
                                                </>
                                            ) : (
                                                <span className="rps-picked-panel__placeholder">
                                                    Waiting...
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="rps-choice-grid">
                                    {CHOICES.map((choice) => (
                                        <button
                                            key={choice.id}
                                            type="button"
                                            className={`rps-choice ${playerChoice?.id === choice.id ? "is-selected" : ""
                                                }`}
                                            onClick={() => handleChoice(choice)}
                                        >
                                            <span className="rps-choice__emoji">{choice.emoji}</span>
                                            <strong>{choice.label}</strong>
                                            <span>{choice.description}</span>
                                        </button>
                                    ))}
                                </div>

                                {lastResult !== "idle" && (
                                    <div className="rps-result-banner">
                                        <div className="rps-result-banner__content">
                                            <h3>
                                                {lastResult === "win"
                                                    ? "Great round"
                                                    : lastResult === "lose"
                                                        ? "Computer takes it"
                                                        : "Even match"}
                                            </h3>
                                            <p>{summary.message}</p>
                                        </div>

                                        <div className="rps-result-banner__actions">
                                            <button
                                                type="button"
                                                className="rps-btn rps-btn--primary"
                                                onClick={handleNextRound}
                                            >
                                                Next Round
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