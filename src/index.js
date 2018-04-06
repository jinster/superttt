import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import MainBoard from "./components/MainBoard";
import update from "immutability-helper";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.timer = null;
    this.state = {
      history: [
        {
          squares: Array.from({ length: 9 }, e => Array(9).fill(null)),
          validBoardNumbers: [0, 1, 2, 3, 4, 5, 6, 7, 8],
          eachBoardStatus: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
      /* eachBoardStatus -  null = board is still open or contested
                            'T'  = board is filled but no winner
                            'X'  = board is won by 'X' player
                            'O'  = board is won by 'O' player */
    };
  }

  handleClick = (boardnumber, squarenumber) => {
    /* Game state will only progress on a click, so okay to put logic in here instead of render()?  Maybe? */

    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const newSquares = current.squares.slice();
    const newEachBoardStatus = current.eachBoardStatus.slice();
    const newValidBoardNumbers = []; /* will be rebuilt every turn */

    /* check if square is filled, if so, do nothing on click */
    if (
      newSquares[boardnumber][squarenumber] ||
      !(current.validBoardNumbers.indexOf(boardnumber) > -1)
    ) {
      return;
    }

    const nextmove = this.state.xIsNext ? "X" : "O";

    /* if square is valid move, fill it */
    const squares = update(newSquares, {
      [boardnumber]: { [squarenumber]: { $set: nextmove } }
    });

    /* check if current EachBoard is won or filled */
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
      if (
        squares[boardnumber][a] &&
        squares[boardnumber][a] === squares[boardnumber][b] &&
        squares[boardnumber][a] === squares[boardnumber][c]
      ) {
        newEachBoardStatus[boardnumber] = squares[boardnumber][a];
      }
    }

    /* If no winner found, check if board is full */
    if (newEachBoardStatus[boardnumber] === null) {
      let i = 0;
      let filled = true;
      while (i < 9 && filled) {
        if (squares[boardnumber][i] === null) {
          filled = false;
        }
        i++;
      }
      if (filled) {
        newEachBoardStatus[boardnumber] = "T";
      }
    }

    /* check which moves are now legal and update newValidBoardnumbers */

    if (newEachBoardStatus[squarenumber] != null) {
      /* if clicked square leads to a filled EachBoard, every other non-filled board becomes a legal move */
      for (let i = 0; i < 9; i++) {
        if (newEachBoardStatus[i] === null) {
          newValidBoardNumbers.push(i);
        }
      }
    } else {
      /* if it leads to a non-filled board, that board is the only legal move */
      newValidBoardNumbers.push(squarenumber);
    }

    /* check if we have an overall winner */
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        newEachBoardStatus[a] &&
        newEachBoardStatus[a] === newEachBoardStatus[b] &&
        newEachBoardStatus[a] === newEachBoardStatus[c]
      ) {
        /* we have a winner...  no more moves are legal */
        newValidBoardNumbers.length = 0;
      }
    }

    this.setState({
      history: history.concat([
        {
          squares: squares,
          validBoardNumbers: newValidBoardNumbers,
          eachBoardStatus: newEachBoardStatus
        }
      ]),
      xIsNext: !this.state.xIsNext,
      stepNumber: history.length
    });
  };

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  replayMoves = () => {
    if (this.timer != null) {
      clearInterval(this.timer);
    }
    let currentStep = 0;

    this.timer = setInterval(() => {
      if (currentStep >= this.state.history.length) {
        clearInterval(this.timer);
        return;
      }
      this.jumpTo(currentStep);
      currentStep++;
    }, 100);
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)} id={move}>{desc}</button>
        </li>
      );
    });

    return (
      <div className="game">
        <div className="game-board">
          <MainBoard
            squares={current.squares}
            handleClick={this.handleClick}
            validBoardNumbers={current.validBoardNumbers}
            eachBoardStatus={current.eachBoardStatus}
          />
        </div>
        <div className="game-info">
          <button onClick={this.replayMoves}>Replay moves</button>
          Current Player: {this.state.xIsNext ? "X" : "O"}
          <br />
          Valid Boards: {this.state.validBoardNumbers}
          <br />
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
} 

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
