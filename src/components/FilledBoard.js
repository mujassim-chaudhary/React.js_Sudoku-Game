import React, { useState } from "react";

function FilledBoard({ board, setBoard, setPreset }) {
  let [difficulty, setDifficulty] = useState("medium");

  const isValid = (b, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (b[row][i] === num) return false; // to check the row
      if (b[i][col] === num) return false; // to check the column
    }

    // Check 3×3 box
    const br = Math.floor(row / 3) * 3;
    const bc = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (b[br + r][bc + c] === num) return false;
      }
    }

    return true;
  };

  // reShuffle the array
  const shuffle = (arr) => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Sudoku backtracking generator
  const fillSudoku = (b) => {
    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        if (b[r][c] === 0) {
          const nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

          for (let n of nums) {
            if (isValid(b, r, c, n)) {
              b[r][c] = n;

              if (fillSudoku(b)) {
                return true;
              } else {
                b[r][c] = 0;
              }
            }
          }

          return false;
        }
      }
    }

    return true;
  };

  // Difficulty logic
  const getRemoveCount = () => {
    switch (difficulty) {
      case "none":
        return 0;
      case "easy":
        return 30;
      case "medium":
        return 45;
      case "hard":
        return 60;
      default:
        return 45;
    }
  };

  function makePuzzle(board, emptyCells = 40) {
    let count = emptyCells;
    while (count > 0) {
      const row = Math.floor(Math.random() * 9);
      const col = Math.floor(Math.random() * 9);
      if (board[row][col] !== 0) {
        board[row][col] = 0;
        count--;
      }
    }
  }

  const generateSudoku = () => {
    const empty = Array.from({ length: 9 }, () => Array(9).fill(0));
    const newBoard = JSON.parse(JSON.stringify(empty));
    fillSudoku(newBoard);
    let removeCells = getRemoveCount();
    makePuzzle(newBoard, removeCells);
    setPreset(newBoard);
    setBoard(newBoard);
  };

  return (
    <div className="ml-20 mt-8">
      {/* Difficulty Selector */}
      <div className="flex gap-3 items-center mb-4">
        <span className="font-semibold text-xl">Difficulty:</span>
        <select
          className="p-2 rounded border-6 bg-green-300 border-gray-900"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option className="bg-blue-300" value="easy">
            Easy
          </option>
          <option className="bg-blue-300" value="medium">
            Medium
          </option>
          <option className="bg-blue-300" value="hard">
            Hard
          </option>
          <option className="bg-blue-300" value="none">
            None
          </option>
        </select>
      </div>

      <button
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:opacity-90"
        onClick={generateSudoku}
      >
        Generate Valid Sudoku
      </button>
    </div>
  );
}

export default FilledBoard;
