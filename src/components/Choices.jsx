import React, { Component } from "react";
import { connect } from "react-redux";
import { toggleChoices } from "../actions/gameAction";

export class Choices extends Component {
  handleToggle = id => {
    if (this.props.gameStatus === "play") {
      const newChoice = this.props.choices.map(choice => {
        if (choice.id === id) {
          choice.selected = !choice.selected;
          // console.log("choice.num", choice.num);
        }
        return choice;
      });

      const totalToggled = this.props.choices.reduce((prev, curr) => {
        // console.log("curr.selected", curr.selected);
        return curr.selected ? prev + 1 : prev;
      }, 0);
      console.log("totalToggled", totalToggled);

      const totalChoosed = this.props.choices.reduce((prev, curr) => {
        return curr.selected ? prev + curr.num : prev;
      }, 0);
      console.log("totalChoosed", totalChoosed);

      let updatedGameStatus = this.props.gameStatus;

      if (totalChoosed === this.props.question) {
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
        question: this.props.question,
        gameStatus: updatedGameStatus
      });
    }
  };

  render() {
    // console.log("asdasdsadsad", this.props);
    // console.log("toggle", toggle);

    const choiceList = this.props.choices.length ? (
      this.props.choices.map(choice => {
        // console.log("choice", choice);
        return (
          <div className="col s6 m6" key={choice.id}>
            <div
              style={{ transition: "all 0.2s" }}
              className={
                choice.selected
                  ? "noselect card hoverable teal white-text"
                  : `noselect card ${
                      this.props.gameStatus === "play" ? "hoverable" : ""
                    }`
              }
              onClick={() => {
                this.handleToggle(choice.id);
              }}
            >
              <div className="card-action">
                <h4 className="center">{choice.num}</h4>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <div className="col s12 center">
        <div className="card hoverable red">
          <div className="card-action">
            <h4 className="center white-text">No Choices</h4>
          </div>
        </div>
      </div>
    );

    return <div className="row">{choiceList}</div>;
  }
}

const mapStateToProps = state => ({
  choices: state.choices,
  question: state.question,
  gameStatus: state.gameStatus
});

const mapDispatchToProps = {
  toggleChoices: updatedState => toggleChoices(updatedState)
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Choices);
