import React from "react";

function CheckBoard({ board }) {
  // Function to check if the board is valid
  let isValidSudoku = () => {
    // to check row
    for (let r = 0; r < 9; r++) {
      let seen = new Set();
      for (let c = 0; c < 9; c++) {
        let val = board[r][c];
        if (val === 0) return "inComplete";
        if (seen.has(val)) return "inValid";
        seen.add(val);
      }
    }

    // to check row
    for (let c = 0; c < 9; c++) {
      let seen = new Set();
      for (let r = 0; r < 9; r++) {
        let val = board[r][c];
        if (val === 0) return "inComplete";
        if (seen.has(val)) return "inValid";
        seen.add(val);
      }
    }

    // to check 3x3 grid
    for (let br = 0; br < 9; br += 3) {
      for (let bc = 0; bc < 9; bc += 3) {
        let seen = new Set();
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            let val = board[br + r][bc + c];
            if (val === 0) return "inComplete";
            if (seen.has(val)) return "inValid";
            seen.add(val);
          }
        }
      }
    }

    return 'valid';
  };

  let checkHandel = () =>{
        let result = isValidSudoku();

        if(result === 'valid'){
            alert("🎉 Correct Sudoku! Well done!");
        }else if(result === 'inValid'){
            alert("❌ Incorrect Sudoku! Please check your numbers.");
        } else{
            alert("🟡 Sudoku is incomplete. Fill all cells.");
        }
    }

  return (
    <div  className="m-auto lg:ml-[700px] mt-[-80px] mb-6 text-center">
      <button
        className="px-4 py-2 bg-green-600 text-white rounded-md hover:opacity-70"
        onClick={checkHandel}
      >
        Check Sudoku
      </button>
    </div>
  );
}

export default CheckBoard;
