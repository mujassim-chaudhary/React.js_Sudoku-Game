import React, { useState } from "react";

function FilledBoard({board,setBoard}) {
  
  const isValid = (b, row, col, num) => {
    for (let i = 0; i < 9; i++) {
      if (b[row][i] === num) return false;
      if (b[i][col] === num) return false;
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


  const generateSudoku = () => {
    const newBoard = JSON.parse(JSON.stringify(board));
    fillSudoku(newBoard);
    setBoard(newBoard);     // ✔ NOW THE UI UPDATES
  };

  return (
    <div className="p-4">
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
