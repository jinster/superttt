import React from "react";
import EachBoard from "../EachBoard"

class MainBoard extends React.Component {

  renderSquare(i) {
    return (
      <EachBoard
        boardnumber = {i}
        squares     = {this.props.squares}
        handleClick = {this.props.handleClick}
      />
    );
  }

  render() {
    return (
      <div className="main-board">
        <div className="main-board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="main-board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="main-board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default MainBoard;
