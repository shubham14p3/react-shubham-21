import React from "react";
import { Route } from "react-router-dom";
import Game2048 from "../components/layouts/game/Game2048/Game2048";
import TicTacToe from "../components/layouts/game/tic-tac-toe/TicTacToe";
import ConnectFour from "../components/layouts/game/ConnectFour/ConnectFour";
import Hangman from "../components/layouts/game/Hangman/Hangman";
import MemoryMatch from "../components/layouts/game/MemoryMatch/MemoryMatch";
import Minesweeper from "../components/layouts/game/Minesweeper/Minesweeper";
import RockPaperScissors from "../components/layouts/game/RockPaperScissors/RockPaperScissors";
import SlidingPuzzle from "../components/layouts/game/SlidingPuzzle/SlidingPuzzle";
import Snake from "../components/layouts/game/Snake/Snake";
import Sudoku from "../components/layouts/game/Sudoku/Sudoku";
import WordGuess from "../components/layouts/game/WordGuess/WordGuess";

export default function GameRoutes() {
    return (
        <>
            <Route path="/game/tic-tac-toe" element={<TicTacToe />} />
            <Route path="/game/ConnectFour" element={<ConnectFour />} />
            <Route path="/game/Game2048" element={<Game2048 />} />
            <Route path="/game/Hangman" element={<Hangman />} />
            <Route path="/game/MemoryMatch" element={<MemoryMatch />} />
            <Route path="/game/Minesweeper" element={<Minesweeper />} />
            <Route path="/game/RockPaperScissors" element={<RockPaperScissors />} />
            <Route path="/game/SlidingPuzzle" element={<SlidingPuzzle />} />
            <Route path="/game/Snake" element={<Snake />} />
            <Route path="/game/Sudoku" element={<Sudoku />} />
            <Route path="/game/WordGuess" element={<WordGuess />} />
        </>
    );
}