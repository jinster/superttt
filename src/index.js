import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainBoard from "./components/MainBoard";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(Array(9).fill(null)),
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(boardnumber, squarenumber) {
    /*
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];*/
    const squares = this.state.squares;

    if (calculateWinner(squares) || squares[boardnumber]) {
      return;
    }
    squares[boardnumber][squarenumber] = 'O';
    console.log('clicked');
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });
  }

  render() {
    const current = this.state.squares;
    const winner = calculateWinner(current);
/*
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move :
        'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });
*/
    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <MainBoard
            squares     = {this.state.squares}
            handleClick = {(e,i,j) => this.handleClick(e,i,j)}
            stepNumber  = {this.state.stepNumber}
            xIsNext     = {this.state.xIsNext}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol></ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
