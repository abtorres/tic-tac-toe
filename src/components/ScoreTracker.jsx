import React from 'react';

const ScoreTracker = ({ scores, history }) => {
  return (
    <div className="score-tracker">
      <h3>Game Score</h3>
      <p>Player X Wins: {scores.xWins}</p>
      <p>AI Wins: {scores.oWins}</p>
      <p>Draws: {scores.draws}</p>

      <h3>Last 5 Games:</h3>
      <ul>
        {history.slice(-5).map((game, index) => (
          <li key={index}>{game}</li>
        ))}
      </ul>
    </div>
  );
};

export default ScoreTracker;