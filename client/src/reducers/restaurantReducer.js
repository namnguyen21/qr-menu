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
        id: action.payload.id,
        name: action.payload.restaurant,
        menu: action.payload.menu,
        display: action.payload.menu,
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
