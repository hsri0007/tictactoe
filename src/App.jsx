import { useEffect, useState } from "react";
import "./App.css";



function Box({count, index, handleClick}){
  return (
    <div onClick={() => handleClick(index)} className="box">
          {count[index]}
    </div>
  )
}

function App() {
  const [count, setCount] = useState(Array(9).fill(null));
  const [touch, setTouch] = useState(false);
  const [invalid, setInvalid] = useState(false);

  const checkNull = count.every((el) => el !== null);
  const winner = calculateWinner(count);

  useEffect(() => {
    if (checkNull && !winner) {
      setInvalid(true);
    }
  }, [count]);

  const handleClick = (i) => {
    if (winner || checkNull || count[i]) {
      return;
    }
    let tempData = [...count];
    tempData[i] = touch ? "o" : "x";
    setTouch(!touch);
    setCount(tempData);
  };

  return (
    <div>
      <p>Tic Tac Toe</p>
      <p>{winner && `${winner} is the winner`} </p>
      {invalid && <p> game tied </p>}
      {(winner ||
        invalid) && (
          <button
          style={{
            marginBottom:"10px"
          }}
            onClick={() => {
              setCount(Array(9).fill(null));
              setInvalid(false);
            }}
          >
            restart
          </button>
        )}
      <div className="box-container">
        <Box count={count} index={0} handleClick={handleClick} />
        <Box count={count} index={1} handleClick={handleClick} />
        <Box count={count} index={2} handleClick={handleClick} />
      </div>
      <div className="box-container">
        <Box count={count} index={3} handleClick={handleClick} />
        <Box count={count} index={4} handleClick={handleClick} />
        <Box count={count} index={5} handleClick={handleClick} />
      </div>
      <div className="box-container">
        <Box count={count} index={6} handleClick={handleClick} />
        <Box count={count} index={7} handleClick={handleClick} />
        <Box count={count} index={8} handleClick={handleClick} />
      </div>
    </div>
  );
}

const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
};

export default App;
