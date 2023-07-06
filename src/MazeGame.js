import React, { useState, useCallback } from 'react';


const MazeGame = () => {
  const [maze, setMaze] = useState([
    ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
    ['#', '.', '.', '.', '.', '.', '#', '.', '.', '.', '#', '.', '.'],
    ['#', '#', '.', '#', '#', '#', '#', '.', '#', '.', '#', '.', '#'],
    ['#', '.', '.', '.', '#', '#', '#', '.', '#', '.', '.', '.', '#'],
    ['#', '.', '#', '.', '.', '.', '.', '.', '#', '#', '#', '.', '#'],
    ['#', '#', '#', '#', '#', '#', '#', '.', '#', '.', '#', '.', '#'],
    ['#', '.', '.', '#', '#', '.', '.', '.', '.', '.', '#', '.', '#'],
    ['#', '#', '.', '#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ]);
  const [playerRow, setPlayerRow] = useState(1);
  const [playerCol, setPlayerCol] = useState(1);
  const [gameOver, setGameOver] = useState(false);

  const isValidPosition = useCallback((row, col) => {
    return row >= 0 && row < maze.length && col >= 0 && col < maze[row].length;
  }, [maze]);

  const isOpenPath = useCallback((row, col) => {
    return maze[row][col] === '.';
  }, [maze]);

  const solveMaze = useCallback((row, col) => {
    if (!isValidPosition(row, col) || !isOpenPath(row, col)) {
      return false;
    }

    if (row === maze.length - 2 && col === maze[row].length - 2) {
      setGameOver(true);
      return true;
    }

    const updatedMaze = [...maze];
    updatedMaze[row][col] = 'X';
    setMaze(updatedMaze);

    if (
      solveMaze(row - 1, col) ||
      solveMaze(row + 1, col) ||
      solveMaze(row, col - 1) ||
      solveMaze(row, col + 1)
    ) {
      return true;
    }

    updatedMaze[row][col] = '.';
    setMaze(updatedMaze);
    return false;
  }, [maze, isValidPosition, isOpenPath]);

  const handleSolve = () => {
    solveMaze(playerRow, playerCol);
  };


  const handleKeyDown = (event) => {
    if (gameOver) return;

    let newRow = playerRow;
    let newCol = playerCol;

    if (event.key === 'ArrowUp') newRow--;
    if (event.key === 'ArrowDown') newRow++;
    if (event.key === 'ArrowLeft') newCol--;
    if (event.key === 'ArrowRight') newCol++;

    if (isValidMove(newRow, newCol)) {
      setPlayerRow(newRow);
      setPlayerCol(newCol);
    }
  };

  const isValidMove = (row, col) => {
    if (row < 0 || row >= maze.length || col < 0 || col >= maze[row].length) {
      return false;
    }
    return maze[row][col] !== '#';
  };

  // ...

  const handleClick = (rowIndex, colIndex) => {
    if (gameOver) return;

    let newRow = rowIndex;
    let newCol = colIndex;

    if (isValidMove(newRow, newCol)) {
      setPlayerRow(newRow);
      setPlayerCol(newCol);
    }
  };

  const renderMaze = () => {
    return maze.map((row, rowIndex) => (
      <div key={rowIndex}>
        {row.map((cell, colIndex) => (
          <span
            key={colIndex}
            className={`cell ${cell === '#' ? 'wall' : ''} ${playerRow === rowIndex && playerCol === colIndex ? 'player' : ''}`}
            onClick={() => handleClick(rowIndex, colIndex)}
          >
            {cell}
          </span>
        ))}
      </div>
    ));
  };

  // ...



  return (
    <div className="maze" tabIndex={0} onKeyDown={handleKeyDown}>
      <button onClick={handleSolve}>Solve Maze</button>
      {gameOver ? (
        <div className="game-over">Congratulations! You solved the maze! Now, Fork my heart because I'm ready to commit! Be my girl or nah?</div>
      ) : (
        renderMaze()
      )}
    </div>
  );

};

export default MazeGame;




