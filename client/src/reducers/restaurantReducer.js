const INITIAL_STATE = {
  menu: [],
  id: null,
  name: null,
  display: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_RESTAURANT_MENU":
      return {
        ...state,
        menu: action.payload.menu,
        name: action.payload.name,
      };
    case "SORT_DISPLAY":
      return {
        ...state,
        display: [
          ...state.menu.filter((item) => item.category === action.payload),
        ],
      };
    case "CLEAR_SORTED":
      return { ...state, display: [...state.menu] };
    default:
      return state;
  }
};
