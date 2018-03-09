import React from "react";
import EachBoard from "../EachBoard"

class MainBoard extends React.Component {

  renderBoard(i) {
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
          {this.renderBoard(0)}
          {this.renderBoard(1)}
          {this.renderBoard(2)}
        </div>
        <div className="main-board-row">
          {this.renderBoard(3)}
          {this.renderBoard(4)}
          {this.renderBoard(5)}
        </div>
        <div className="main-board-row">
          {this.renderBoard(6)}
          {this.renderBoard(7)}
          {this.renderBoard(8)}
        </div>
      </div>
    );
  }
}

export default MainBoard;
