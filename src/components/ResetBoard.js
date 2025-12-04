import React from "react";

function ResetBoard({ board, preset, setBoard }) {
  //   const resetUserInputs = () => {
  //     const newBoard = board.map((row, r) =>
  //       row.map((val, c) => (preset[r][c] ? val : 0))
  //       // ⬆ If preset → keep value
  //       // ⬆ If user-entered → reset to 0
  //     );

  //     setBoard(newBoard);
  //   };

  // delete api here
  const deleteBoard = async () => {
    const res = await fetch("http://localhost:3002/progress/delete", {
      method: "DELETE",
    });

    const data = await res.json();
    console.log("Delete result:", data);
  };

  let userInputHandeler = async () => {
    let newBoard = board.map((row, r) =>
      row.map((val, c) => (preset[r][c] ? val : 0))
    );

    // deleteBoard();
    setBoard(newBoard);

    await deleteBoard(); // delete on button click only
  };

  //  deleteBoard();

  return (
    <div className="m-auto lg:ml-[1000px] mt-[-80px] mb-6 text-center">
      <button
        onClick={userInputHandeler}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reset Board
      </button>
    </div>
  );
}

export default ResetBoard;
