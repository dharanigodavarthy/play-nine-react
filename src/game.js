import React, { Component } from "react";
import Stars from "./stars";
import Button from "./button";
import Answer from "./answer";
import Numbers from "./numbers";
import DoneStatus from "./doneFrame";
let _ = require("underscore");

class Game extends Component {
  static randomNumber = () => 1 + Math.floor(Math.random() * 9);
  static intialState = () => ({
    selectedNumbersForAnswer: [],
    noOfStars: Game.randomNumber(),
    answerIsCorrect: null,
    usedNumbers: [],
    redraws: 5,
    doneStatus: null
  });
  state = Game.intialState();
  selectNumbers = number => {
    if (this.state.selectedNumbersForAnswer.indexOf(parseInt(number)) >= 0) {
      return;
    }
    this.setState(previousState => ({
      answerIsCorrect: null,
      selectedNumbersForAnswer: [
        ...previousState.selectedNumbersForAnswer,
        parseInt(number)
      ]
    }));
  };
  unSelectNumber = clickedNumber => {
    this.setState(previousState => ({
      answerIsCorrect: null,
      selectedNumbersForAnswer: previousState.selectedNumbersForAnswer.filter(
        number => number != parseInt(clickedNumber)
      )
    }));
  };
  checkAnswer = () => {
    this.setState(
      previousState => ({
        answerIsCorrect:
          previousState.noOfStars ===
          this.state.selectedNumbersForAnswer.reduce((acc, num) => {
            return acc + num;
          }, 0)
      }),
      this.updateDoneStatus
    );
  };
  acceptAnswer = () => {
    this.setState(
      previousState => ({
        usedNumbers: previousState.usedNumbers.concat(
          previousState.selectedNumbersForAnswer
        ),
        selectedNumbersForAnswer: [],
        answerIsCorrect: null,
        noOfStars: Game.randomNumber()
      }),
      this.updateDoneStatus
    );
  };
  redraw = () => {
    if (this.state.redraws === 0) {
      return;
    }
    this.setState(
      previousState => ({
        selectedNumbersForAnswer: [],
        answerIsCorrect: null,
        noOfStars: Game.randomNumber(),
        redraws: previousState.redraws - 1
      }),
      this.updateDoneStatus
    );
  };
  possibleCombinationSum = (arr, n) => {
    if (arr.indexOf(n) >= 0) {
      return true;
    }
    if (arr[0] > n) {
      return false;
    }
    if (arr[arr.length - 1] > n) {
      arr.pop();
      return this.possibleCombinationSum(arr, n);
    }
    var listSize = arr.length,
      combinationsCount = 1 << listSize;
    for (var i = 1; i < combinationsCount; i++) {
      var combinationSum = 0;
      for (var j = 0; j < listSize; j++) {
        if (i & (1 << j)) {
          combinationSum += arr[j];
        }
      }
      if (n === combinationSum) {
        return true;
      }
    }
    return false;
  };
  resetGame = () => this.setState(Game.intialState());
  possibleSolutions = ({ noOfStars, usedNumbers }) => {
    const possibleNumbers = _.range(1, 10).filter(number => {
      return usedNumbers.indexOf(number) === -1;
    });
    return this.possibleCombinationSum(possibleNumbers, noOfStars);
  };
  updateDoneStatus = () => {
    this.setState(previousState => {
      if (previousState.usedNumbers.length === 9) return { doneStatus: "Done Nice!!" };
      if (previousState.redraws === 0 && !this.possibleSolutions(previousState))
        return { doneStatus: "Game Over!!" };
    });
  };

  render() {
    const {
      selectedNumbersForAnswer,
      noOfStars,
      answerIsCorrect,
      usedNumbers,
      redraws,
      doneStatus
    } = this.state;
    return (
      <div>
        <h1>Play Nine</h1>
        <div className="row">
          <Stars noOfStars={noOfStars} />
          <Button
            selectedNumbersForAnswer={selectedNumbersForAnswer}
            answerIsCorrect={answerIsCorrect}
            checkAnswer={this.checkAnswer}
            acceptAnswer={this.acceptAnswer}
            redraw={this.redraw}
            redraws={redraws}
          />
          <Answer
            selectedNumbersForAnswer={selectedNumbersForAnswer}
            unSelectNumber={this.unSelectNumber}
          />
        </div>
        <br />
        {doneStatus ? (
          <DoneStatus doneStatus={doneStatus} resetGame={this.resetGame} />
        ) : (
          <Numbers
            selectedNumbersForAnswer={selectedNumbersForAnswer}
            selectNumbers={this.selectNumbers}
            usedNumbers={usedNumbers}
          />
        )}
        <br />
      </div>
    );
  }
}

export default Game;
