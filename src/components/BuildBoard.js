import React, { useState, useEffect } from "react";
import FilledBoard from "./FilledBoard";
import CheckBoard from "./CheckBoard";
import ResetBoard from "./ResetBoard";
import LogoutButton from "./LogoutButton";
// Simple 9x9 sudoku input grid

function BuildBoard() {
  // create 9x9 empty array
  // const board = Array.from({ length: 9 }, () => Array(9).fill(0));
  let [board, setBoard] = useState(
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  const [progressId, setProgressId] = useState(null);

 // console.log(board);

  let [preset, setPreset] = useState(
    //tTo presist the value
    Array.from({ length: 9 }, () => Array(9).fill(0))
  );

  let [difficulty, setDifficulty] = useState("medium");

  // console.log(preset);

 // to connect the backend api here and create a document of the preset board of sudoku
    useEffect(() => {
    const savePresetBoard = async () => {
      await fetch("http://localhost:3002/sudoku/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          preset,
          difficulty,
        }),
      });
    };

    savePresetBoard();
  }, [preset]); 

  // Create documnet once
  useEffect(() => {
    const createProgress = async () => {
     let res =  await fetch("http://localhost:3002/progress/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ progress: board }),
      });

      const data = await res.json();
      setProgressId(data.id);  //to store mongo ID
    };

    createProgress();
  }, [preset]); // run when preset board 

  // Update on every user input or whenever board changes
  useEffect(() => {
    // if(!progressId) return;


    let updateProgress = async () => {
      await fetch(`http://localhost:3002/progress/update/${progressId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          progress: board,
        }),
      });
    };

    updateProgress();
  }, [board, progressId]);

  // load saved progress on refresh
  useEffect(() =>{
    let loadProgress = async () =>{
      try{
        let res = await fetch("http://localhost:3002/progress/");
        let data = await res.json();

        if(res.status === 200){
          setBoard(data.progress); // load the progress data into the board
          setProgressId(data.id) // restore ID
        } else{
         // console.log("No saved progress");
        }
      } catch (err) {
       // console.log("error loading progress:",err);
      }
    };

    loadProgress();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-3xl font-bold mb-4 text-blue-500 -500 text-center">
        SUDOKU GAME!
      </h2>

      <FilledBoard
        board={board}
        setBoard={setBoard}
        setPreset={setPreset}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
      />
      <CheckBoard board={board} />
      <ResetBoard board={board} preset={preset} setBoard={setBoard} />

      <div className="grid grid-cols-9  w-fit border border-gray-400 mx-auto mt-{-8px}">
        {board.map((row, r) =>
          row.map((val, c) => (
            <input
              key={`${r}-${c}`}
              type="text"
              maxLength={1}
              inputMode="numeric"
              value={val || ""}
              // readOnly = "true"
              readOnly={preset[r][c]} // ⬅ PRESET = NOT EDITABLE
              className={`w-10 h-10 text text-center border border-gray-300 outline-none focus:border-blue-500 text-xl ${
                preset[r][c]
                  ? "bg-red-400 text-black font-bold"
                  : val === 0
                  ? "bg-blue-300 text-black"
                  : "bg-red-500 text-white"
              }`}
              onChange={(e) => {
                if (preset[r][c]) return; // ⬅ EXTRA safety
                const v = e.target.value.replace(/[^1-9]/g, "");
                const newBoard = board.map((row) => [...row]);
                newBoard[r][c] = v === "" ? 0 : parseInt(v);
                setBoard(newBoard);
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
      <LogoutButton />
    </div>
  );
}

export default BuildBoard;
