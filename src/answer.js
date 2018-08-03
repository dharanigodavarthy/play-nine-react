
import React, { Component } from "react";
class Answer extends Component {
  render(props) {
    let unSelect = event => {
      this.props.unSelectNumber(event.target.innerHTML);
    };
    return (
      <div className="col-3">
        {this.props.selectedNumbersForAnswer.map((number, i) => (
          <span key={i} onClick={unSelect}>
            {number}
          </span>
        ))}
      </div>
    );
  }
}

export default Answer;
