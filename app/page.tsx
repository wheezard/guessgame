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
      setFeedback('Please enter a number between 1 and 100');
      return;
    }

    const newAttempts = attemptsLeft - 1;
    setAttemptsLeft(newAttempts);

    if (num === secretNumber) {
      setFeedback('Correct! You won!');
      setGameOver(true);
    } else if (newAttempts === 0) {
      setFeedback(You lost. The number was ${secretNumber});
      setGameOver(true);
    } else {
      setFeedback(num < secretNumber ? 'Too low!' : 'Too high!');
    }

    setGuess('');
  };

  return (
    <main>
      <h1>Number Guessing Game</h1>

      <label>
        Difficulty:
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          disabled={attemptsLeft !== maxAttempts}
        >
          <option value="easy">Easy (10 tries)</option>
          <option value="medium">Medium (7 tries)</option>
          <option value="hard">Hard (5 tries)</option>
        </select>
      </label>

      <p>Guess a number between 1 and 100</p>

      <input
        type="number"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        disabled={gameOver}
      />
      <button onClick={handleGuess} disabled={gameOver}>
        Guess
      </button>

      <p>{feedback}</p>
      <p>Attempts left: {attemptsLeft}</p>
    </main>
  );
}