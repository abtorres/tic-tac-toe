import React, { useState } from 'react';
import Square from './Square';
import ResetButton from './ResetButton';
import { calculateWinner } from '../utils/GameLogic';
import { getAIMove } from './AIPlayer';
import '../App.css';



// Sound Effects
const clickSoundFile = "./public/sounds/click.wav";
const winSoundFile = "./public/sounds/win.wav";
const resetSoundFile = "./public/sounds/reset.wav";

const winSound = new Audio(winSoundFile);
const clickSound = new Audio(clickSoundFile);
const resetSound = new Audio(resetSoundFile);



const Board = ({ updateScore }) => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isMultiplayer, setIsMultiplayer] = useState(true);
  const [difficulty, setDifficulty] = useState("Hard"); // AI Difficulty

  const handleClick = (index) => {
    if (squares[index] || calculateWinner(squares)) return;

    const newSquares = [...squares];
    newSquares[index] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    
    clickSound.play(); // Play click sound

    const winner = calculateWinner(newSquares);
    if (winner) {
      winSound.play(); // Play win sound
      updateScore(winner);
      return;
    }

    if (!newSquares.includes(null)) {
      updateScore(null);
      return;
    }

    // AI Move (Only when Multiplayer Mode is OFF)
    if (!isMultiplayer) {
      setTimeout(() => {
        const aiMove = getAIMove(newSquares, difficulty);
        if (aiMove !== null) {
          newSquares[aiMove] = 'O';
          setSquares([...newSquares]);
          setXIsNext(true);

          const winner = calculateWinner(newSquares);
          if (winner) {
            winSound.play();
            updateScore(winner);
          }
        }
      }, 300);
    }
  };

  return (
    <div className="game-container">
      <h2>{calculateWinner(squares) ? `Winner: ${calculateWinner(squares)}` : `Next Player: ${xIsNext ? 'X' : 'O'}`}</h2>
      <button onClick={() => setIsMultiplayer(!isMultiplayer)}>
        {isMultiplayer ? "Switch to AI Mode" : "Switch to Multiplayer"}
      </button>
      <button onClick={() => setDifficulty(difficulty === "Hard" ? "Medium" : difficulty === "Medium" ? "Easy" : "Hard")}>
        AI Difficulty: {difficulty}
      </button>
      <div className="board">
        {squares.map((square, index) => (
          <Square key={index} value={square} onClick={() => handleClick(index)} />
        ))}
      </div>
      <ResetButton onReset={() => {
        setSquares(Array(9).fill(null));
        setXIsNext(true);
        resetSound.play();
      }} />
    </div>
  );
};

export default Board;