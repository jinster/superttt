import React from "react";

class Square extends React.Component {
  render() {
    const boardnumber = this.props.boardnumber;
    const squarenumber = this.props.squarenumber;

    return (
      <button className="square" onClick={this.props.handleClick(boardnumber, squarenumber)}>
        {this.props.squares[boardnumber][squarenumber]}
      </button>
    );
  }
}

export default Square;
