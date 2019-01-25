import React, { Component } from "react";
import Choices from "./components/Choices";
import uuid from "uuid";
import { connect } from "react-redux";
import { actionPlay, actionTick } from "./actions/gameAction";

class App extends Component {
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
    this.props.actionPlay({
      choices: initChoices,
      question: question,
      gameStatus: "play",
      time: 10
    });
    this.interval = setInterval(this.tick, 1000);
  };

  tick = () => {
    // console.log("this.props", this.props);
    let updatedTick = {
      gameStatus: this.props.gameStatus,
      time: this.props.time
    };
    if (this.props.time <= 0) {
      updatedTick.gameStatus = "fail";
      clearInterval(this.interval);
    } else {
      // this.props.actionTick(this.props.time - 1);
      updatedTick.time -= 1;
    }
    // console.log("this.props.time", this.props.time);
    this.props.actionTick(updatedTick);
  };

  stopTick = () => {
    clearInterval(this.interval);
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
                  this.props.gameStatus === "win"
                    ? "card yellow pulse"
                    : this.props.gameStatus === "fail"
                    ? "card deep-orange white-text"
                    : "card"
                }
              >
                <div className="card-content">
                  <h1 className="center">{this.props.question}</h1>
                </div>
              </div>
            </div>
          </div>
          <div className="progress ">
            <div
              className="determinate"
              style={{ width: `${this.props.time}0%` }}
            />
          </div>
          <Choices clearInterval={this.stopTick} />
          <div className="center">
            {/* <button className="btn btn-large" onClick={this.play}>
              Play
            </button> */}
            <a
              onClick={this.play}
              href="#!"
              className={`btn-floating btn-large cyan ${
                this.props.gameStatus !== "play" &&
                this.props.gameStatus !== "win"
                  ? "pulse"
                  : ""
              }`}
            >
              <i className="material-icons">
                {this.props.gameStatus ? "loop" : "play_arrow"}
              </i>
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  choices: state.choices,
  question: state.question,
  gameStatus: state.gameStatus,
  time: state.time
});

const mapDispatchToProps = {
  actionPlay: gameState => actionPlay(gameState),
  actionTick: updatedTick => actionTick(updatedTick)
};

// const mapDispatchToProps = dispatch => {
//   return {
//     deletePost: id => dispatch(deletePost(id))
//   };
// };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
