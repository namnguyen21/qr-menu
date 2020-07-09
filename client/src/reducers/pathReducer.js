const INITIAL_STATE = {
  path: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "CURRENT_PATH":
      return { ...state, path: action.payload };
    default:
      return state;
  }
};
