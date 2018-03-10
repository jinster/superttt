import React from "react";

class Square extends React.Component {
  render() {
    const boardnumber = this.props.boardnumber;
    const squarenumber = this.props.squarenumber;

    const hc = e => {
      this.props.handleClick(boardnumber, squarenumber);
    };

    return (
      <button className="square" onClick={hc}>
        {this.props.squares[boardnumber][squarenumber]}
      </button>
    );
  }
}

export default Square;
