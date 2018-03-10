import React from "react";
import Square from "./Square.jsx";

class EachBoard extends React.Component {
  renderSquare(i) {
    return (
      <Square
        boardnumber={this.props.boardnumber}
        squarenumber={i}
        squares={this.props.squares}
        handleClick={this.props.handleClick}
      />
    );
  }

  render() {
    return (
      <div className={this.props.isValid ? "each-board isValid" : "each-board"}>
        <div>{this.props.boardnumber}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default EachBoard;
