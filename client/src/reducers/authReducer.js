const INITIAL_STATE = {
  isSignedIn: false,
  name: null,
  restaurant: null,
  id: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return {
        ...state,
        isSignedIn: true,
        name: action.payload.name,
        restaurant: action.payload.restaurant,
        phone: action.payload.phone,
        id: action.payload.id,
      };
    default:
      return state;
  }
};
