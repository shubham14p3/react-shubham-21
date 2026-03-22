import resumeOne from "../../assets/resume/resume.pdf";

const menus = [
  {
    id: "about",
    label: "About",
    href: "#about",
  },
  {
    id: "experience",
    label: "Experience",
    href: "#experience",
  },
  {
    id: "credentials",
    label: "Credentials",
    children: [
      {
        id: "education",
        label: "Education",
        href: "#education",
      },
      {
        id: "certificates",
        label: "Certificates",
        href: "#certificates",
      },
    ],
  },
  {
    id: "testimonial",
    label: "Testimonial",
    href: "#recommendations",
  },
  {
    id: "components",
    label: "Components",
    children: [
      {
        id: "games",
        label: "Games",
        children: [
          {
            id: "game-tic-tac-toe",
            label: "Tic Tac Toe",
            href: "/game/tic-tac-toe",
          },
          {
            id: "game-connect-four",
            label: "Connect Four",
            href: "/game/ConnectFour",
          },
          {
            id: "game-2048",
            label: "2048",
            href: "/game/Game2048",
          },
          {
            id: "game-hangman",
            label: "Hangman",
            href: "/game/Hangman",
          },
          {
            id: "game-memory-match",
            label: "Memory Match",
            href: "/game/MemoryMatch",
          },
          {
            id: "game-minesweeper",
            label: "Minesweeper",
            href: "/game/Minesweeper",
          },
          {
            id: "game-rock-paper-scissors",
            label: "Rock Paper Scissors",
            href: "/game/RockPaperScissors",
          },
          {
            id: "game-sliding-puzzle",
            label: "Sliding Puzzle",
            href: "/game/SlidingPuzzle",
          },
          {
            id: "game-snake",
            label: "Snake",
            href: "/game/Snake",
          },
          {
            id: "game-sudoku",
            label: "Sudoku",
            href: "/game/Sudoku",
          },
          {
            id: "game-word-guess",
            label: "Word Guess",
            href: "/game/WordGuess",
          },
        ],
      },
      {
        id: "loaders",
        label: "Loaders",
        children: [
          {
            id: "loader-neo-orbit",
            label: "Neo Orbit",
            href: "/loader/neo-orbit",
          },
          {
            id: "loader-terminal-boot",
            label: "Terminal Boot",
            href: "/loader/terminal-boot",
          },
          {
            id: "loader-glass-reveal",
            label: "Glass Reveal",
            href: "/loader/glass-reveal",
          },
          {
            id: "loader-node-network",
            label: "Node Network",
            href: "/loader/node-network",
          },
          // {
          //   id: "loader-combined",
          //   label: "Combined",
          //   href: "/loader/combined",
          // },
        ],
      },
    ],
  },
  {
    id: "resume",
    label: "Resume",
    href: resumeOne,
    external: true,
    download: true,
  },
];

export default menus;