const INITIAL_STATE = {
  items: [],
  name: null,
  display: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "FETCH_MENU":
      return {
        ...state,
        items: action.payload,
        display: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
        display: [...state.display, action.payload],
      };
    case "CHANGE_DISPLAY":
      return { ...state, display: action.payload };
    case "CLEAR_SORTED":
      return { ...state, display: [...state.items] };
    case "EDIT_ITEM":
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );
      const filteredDisplay = state.display.filter(
        (item) => item.id !== action.payload.id
      );
      return {
        ...state,
        items: [...filteredItems, action.payload.item],
        display: [...filteredDisplay, action.payload.item],
      };
    case "DELETE_ITEM":
      return {
        ...state,
        items: [...state.items.filter((item) => item.id !== action.payload)],
        display: [
          ...state.display.filter((item) => item.id !== action.payload),
        ],
      };
    default:
      return state;
  }
};
