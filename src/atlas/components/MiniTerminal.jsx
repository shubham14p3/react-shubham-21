import { useState } from "react";
import { useNavigate } from "react-router-dom";
const commands = {
  work: "/work",
  skills: "/stack",
  about: "/about",
  resume: "/resume",
  contact: "/contact",
  lab: "/lab",
  github: "/work#github",
};
export default function MiniTerminal() {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState(["Atlas terminal. Type help to begin."]);
  const navigate = useNavigate();
  function run(event) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    setInput("");
    if (command === "clear") {
      setLines([]);
      return;
    }
    let response =
      command === "help"
        ? "about · skills · work · github · resume · contact · lab · clear"
        : command === "sudo make it pop"
          ? "Already in progress. Taste is the dependency."
          : commands[command]
            ? `Opening ${command}…`
            : "Unknown command. Try help. No shell commands are executed.";
    setLines((value) => [
      ...value.slice(-10),
      `› ${input.slice(0, 100)}`,
      response,
    ]);
    if (commands[command]) navigate(commands[command]);
  }
  return (
    <details className="mini-terminal">
      <summary>
        For the keyboard people <span>~/atlas ↗</span>
      </summary>
      <div className="terminal-output" role="log" aria-label="Terminal output">
        {lines.map((line, index) => (
          <p key={`${index}-${line}`}>{line}</p>
        ))}
      </div>
      <form onSubmit={run}>
        <label htmlFor="terminal-command">sr@atlas:~$</label>
        <input
          id="terminal-command"
          autoComplete="off"
          spellCheck="false"
          maxLength={100}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="help"
        />
        <button type="submit">Run ↵</button>
      </form>
    </details>
  );
}
