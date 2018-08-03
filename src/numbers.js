import React, { Component } from "react";
let _ = require("underscore");
class Numbers extends Component {
  render(props) {
    let checkSelectedOrNot = number => {
      if (this.props.selectedNumbersForAnswer.indexOf(number) >= 0) {
        return "selected";
      }
      if (this.props.usedNumbers.indexOf(number) >= 0) {
        return "used";
      }
    };
    let select = event => {
      this.props.selectNumbers(event.target.innerHTML);
    };
    return (
      <div className="numbers">
        {Numbers.list.map((number, i) => (
          <span key={i} onClick={select} className={checkSelectedOrNot(number)}>
            {number}
          </span>
        ))}
      </div>
    );
  }
}
Numbers.list = _.range(1, 10);
export default Numbers;
