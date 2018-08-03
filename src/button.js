import React, { Component } from "react";
class Button extends Component {
  render(props) {
    let button;
    let checkAnswerData = () => {
      this.props.checkAnswer();
    };
    let redraw = () => {
        this.props.redraw();
      };
    switch (this.props.answerIsCorrect) {
      case true:
        button = (
          <button className="btn btn-success" onClick={this.props.acceptAnswer}>
            <i className="fa fa-check" />
          </button>
        );
        break;
      case false:
        button = (
          <button className="btn btn-danger">
            <i className="fa fa-times" />
          </button>
        );
        break;
      default:
        button = (
          <button
            className="btn"
            onClick={checkAnswerData}
            disabled={this.props.selectedNumbersForAnswer.length === 0}
          >
            =
          </button>
        );
    }

    // return <div className="col-2">{button}<button><button/></div>;
    return (
      <div className="col-2 text-center">
        {button}
        <br />
        <br />
        <button onClick={this.props.redraw} className="btn btn-warning btn-sm"
         disabled={this.props.redraws=== 0}>
          <i className="fa fa-refresh" >{this.props.redraws}</i>
        </button>
      </div>
    );
  }
}

export default Button;
