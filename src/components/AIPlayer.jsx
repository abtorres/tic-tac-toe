import { calculateWinner } from "../utils/GameLogic";

export const getAIMove = (squares, difficulty) => {
  if (difficulty === "Hard") return minimax(squares, 'O').index;
  if (difficulty === "Medium") return Math.random() > 0.5 ? minimax(squares, 'O').index : getRandomMove(squares);
  return getRandomMove(squares);
};

const minimax = (board, player) => {
  const availableMoves = board.map((val, index) => (val === null ? index : null)).filter((val) => val !== null);
  if (calculateWinner(board) === 'X') return { score: -10 };
  if (calculateWinner(board) === 'O') return { score: 10 };
  if (availableMoves.length === 0) return { score: 0 };

  const moves = availableMoves.map((move) => {
    const newBoard = [...board];
    newBoard[move] = player;
    const result = minimax(newBoard, player === 'O' ? 'X' : 'O');
    return { index: move, score: result.score };
  });

  return player === 'O' ? moves.reduce((best, move) => (move.score > best.score ? move : best), { score: -Infinity })
                        : moves.reduce((best, move) => (move.score < best.score ? move : best), { score: Infinity });
};

const getRandomMove = (squares) => {
  const availableMoves = squares.map((val, index) => val === null ? index : null).filter(val => val !== null);
  return availableMoves.length ? availableMoves[Math.floor(Math.random() * availableMoves.length)] : null;
};