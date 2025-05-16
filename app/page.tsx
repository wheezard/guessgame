'use client';

import { useEffect, useState } from 'react';

export default function Home() {
  const [secretNumber, setSecretNumber] = useState(0);
  const [guess, setGuess] = useState('');
  const [feedback, setFeedback] = useState('');
  const [attemptsLeft, setAttemptsLeft] = useState(0);
  const [maxAttempts, setMaxAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');

  const generateSecret = () => Math.floor(Math.random() * 100) + 1;

  const startGame = () => {
    const attempts =
      difficulty === 'easy' ? 10 : difficulty === 'medium' ? 7 : 5;
    setSecretNumber(generateSecret());
    setAttemptsLeft(attempts);
    setMaxAttempts(attempts);
    setGameOver(false);
    setFeedback('');
    setGuess('');
  };

  useEffect(() => {
    startGame();
  }, [difficulty]);

  const handleGuess = () => {
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback('⚠ Please enter a number between 1 and 100');
      return;
    }

    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    if (num === secretNumber) {
      setFeedback('🎉 Correct! You won!');
      setGameOver(true);
    } else if (newAttempts === 0) {
      setFeedback(❌ You lost. The number was ${secretNumber});
      setGameOver(true);
    } else {
      setFeedback(num < secretNumber ? '🔻 Too low!' : '🔺 Too high!');
    }

    setGuess('');
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-6">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6 space-y-5 text-center">
        <h1 className="text-3xl font-bold text-indigo-600">Number Guessing Game</h1>

        <div className="space-y-2">
          <label className="block text-gray-700 font-medium">
            Select Difficulty:
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              disabled={attemptsLeft !== maxAttempts}
              className="ml-2 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            >
              <option value="easy">Easy (10 tries)</option>
              <option value="medium">Medium (7 tries)</option>
              <option value="hard">Hard (5 tries)</option>
            </select>
          </label>

          <p className="text-gray-600">Guess a number between 1 and 100</p>

          <input
            type="number"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            disabled={gameOver}
            className="w-full p-2 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter your guess"
          />

          <button
            onClick={handleGuess}
            disabled={gameOver}
            className="mt-2 w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-lg font-semibold transition"
          >
            Guess
          </button>
        </div>

        <div className="text-lg font-medium text-gray-800">{feedback}</div>
        <p className="text-sm text-gray-500">Attempts left: {attemptsLeft}</p>

        {gameOver && (
          <button
            onClick={startGame}
            className="mt-4 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            🔄 Restart Game
          </button>
        )}
      </div>
    </main>
  );
}