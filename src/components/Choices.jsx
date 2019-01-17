import React from "react";

const Choice = ({ props, toggle }) => {
  // console.log("toggle", toggle);
  const choiceList = props.choices.length ? (
    props.choices.map(choice => {
      // console.log("choice", choice);
      return (
        <div className="col s6 m6" key={choice.id}>
          <div
            style={{ transition: "all 0.2s" }}
            className={
              choice.selected
                ? "noselect card hoverable teal white-text"
                : `noselect card ${
                    props.gameStatus === "play" ? "hoverable" : ""
                  }`
            }
            onClick={() => {
              toggle(choice.id);
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
};

export default Choice;
