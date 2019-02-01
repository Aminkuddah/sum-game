import uuid from "uuid";

const initialState = {
  choices: [...Array(6)].map(() => {
    return {
      id: uuid.v4(),
      num: "?",
      selected: false
    };
  }),
  question: "?",
  gameStatus: null,
  time: 0
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case "ACTION_PLAY":
      return { ...state, ...payload };

    case "ACTION_TICK":
      return { ...state, ...payload };

    case "TOGGLE_CHOICES":
      return { ...state, ...payload };

    default:
      return state;
  }
};
