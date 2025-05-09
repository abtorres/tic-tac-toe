import React, { useState } from 'react';
import Board from './components/Board';
import ScoreTracker from './components/ScoreTracker';
import './App.css';

const App = () => {
  const [scores, setScores] = useState({ xWins: 0, oWins: 0, draws: 0 });
  const [history, setHistory] = useState([]);

  const updateScore = (winner) => {
    setScores((prev) => ({
      xWins: winner === 'X' ? prev.xWins + 1 : prev.xWins,
      oWins: winner === 'O' ? prev.oWins + 1 : prev.oWins,
      draws: winner === null ? prev.draws + 1 : prev.draws,
    }));

    setHistory((prev) => [...prev.slice(-4), winner ? `${winner} Wins!` : "Draw!"]); // Keep last 5 games
  };

  return (
    <div className="app">
      <h1>Tic-Tac-Toe</h1>
      <ScoreTracker scores={scores} history={history} />
      <Board updateScore={updateScore} />
    </div>
  );
};

export default App;