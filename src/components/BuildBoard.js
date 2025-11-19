import React, { useState } from "react";
import FilledBoard from "./FilledBoard";

// Simple 9x9 sudoku input grid

export default function BuildBoard() {
  // create 9x9 empty array
  // const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  const[board,setBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  )

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4 text-green-500 text-center">SUDOKU GAME!</h2>
      
      <FilledBoard board={board} setBoard={setBoard} />

      <div className="grid grid-cols-9  w-fit border border-gray-400 mx-auto mt-1">
        {board.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={val || ""}
              className="w-10 h-10 text text-center border border-gray-300 outline-none focus:border-blue-500 "
              onChange={(e) => {
                const v = e.target.value.replace(/[^1-9]/g, "");
                e.target.value = v;
              }}
              style={{
                borderTop: r % 3 === 0 ? "2px solid black" : undefined,
                borderLeft: c % 3 === 0 ? "2px solid black" : undefined,
                borderRight: c === 8 ? "2px solid black" : undefined,
                borderBottom: r === 8 ? "2px solid black" : undefined,
              }}
            />
          ))
        )}
      </div>

     

    </div>
  );
}
