import React, { Component } from "react";
import Choices from "./components/Choices";
import uuid from "uuid";

class App extends Component {
  state = {
    choices: [
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      },
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      },
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      },
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      },
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      },
      {
        id: uuid.v4(),
        num: "?",
        selected: false
      }
    ],
    question: "?",
    gameStatus: null,
    time: 0
  };

  play = () => {
    clearInterval(this.interval);

    const choices = 6;
    const maxChoiceCombination = 4;

    // Initialize choices first
    let initChoices = [];
    for (let index = 0; index < choices; index++) {
      initChoices.push({
        id: uuid.v4(),
        num: Math.floor(Math.random() * (9 - 2 + 1) + 2),
        selected: false
      });
    }

    // Map only number into new array
    let filters = initChoices.map(filter => {
      return filter.num;
    });

    // Select number to be sum randomly
    // and move filter array alement to make it unique
    let selectFilters = [];
    for (var i = maxChoiceCombination - 1; i >= 0; i--) {
      const randomId = Math.floor(Math.random() * filters.length);
      selectFilters.push(filters[randomId]);
      filters.splice(randomId, 1);
      // console.log("filters", filters);
      // console.log("selectFilters", selectFilters);
    }

    // Sum selected filters to be question
    const question = selectFilters.reduce((prev, curr) => {
      return prev + curr;
    }, 0);

    // Set to state
    this.setState({
      choices: initChoices,
      question: question,
      gameStatus: "play",
      time: 10
    });
    this.interval = setInterval(this.tick, 1000);
  };

  handleToggle = id => {
    // console.log(id);

    if (this.state.gameStatus === "play") {
      const newChoice = this.state.choices.map(choice => {
        if (choice.id === id) {
          choice.selected = !choice.selected;
          // console.log("choice.num", choice.num);
        }
        return choice;
      });

      const totalToggled = this.state.choices.reduce((prev, curr) => {
        // console.log("curr.selected", curr.selected);
        return curr.selected ? prev + 1 : prev;
      }, 0);
      console.log("totalToggled", totalToggled);

      const totalChoosed = this.state.choices.reduce((prev, curr) => {
        return curr.selected ? prev + curr.num : prev;
      }, 0);
      console.log("totalChoosed", totalChoosed);

      let updatedGameStatus = this.state.gameStatus;

      if (totalChoosed === this.state.question) {
        updatedGameStatus = "win";
        clearInterval(this.interval);
        console.log("wiiiin");
      } else if (totalToggled >= 4) {
        updatedGameStatus = "fail";
        clearInterval(this.interval);
        console.log("faiiiiilll");
      }

      this.setState({
        choices: [...newChoice],
        question: this.state.question,
        gameStatus: updatedGameStatus
      });
    }
  };

  tick = () => {
    let updatedState = this.state;
    if (this.state.time <= 0) {
      updatedState.gameStatus = "fail";
      clearInterval(this.interval);
    } else {
      updatedState.time -= 1;
    }
    this.setState(updatedState);
  };

  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col s12">
              <div
                style={{ transition: "all 0.5s" }}
                className={
                  this.state.gameStatus === "win"
                    ? "card yellow pulse"
                    : this.state.gameStatus === "fail"
                    ? "card deep-orange white-text"
                    : "card"
                }
              >
                <div className="card-content">
                  <h1 className="center">{this.state.question}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="progress ">
            <div
              className="determinate"
              style={{ width: `${this.state.time}0%` }}
            />
          </div>
          <Choices props={this.state} toggle={this.handleToggle} />
          <div className="center">
            {/* <button className="btn btn-large" onClick={this.play}>
              Play
            </button> */}
            <a
              onClick={this.play}
              href="#!"
              className={`btn-floating btn-large cyan ${
                this.state.gameStatus !== "play" &&
                this.state.gameStatus !== "win"
                  ? "pulse"
                  : ""
              }`}
            >
              <i className="material-icons">
                {this.state.gameStatus ? "loop" : "play_arrow"}
              </i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
