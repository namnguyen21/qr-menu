const INITIAL_STATE = {
  isSignedIn: false,
  name: null,
  restaurant: null,
  email: null,
  phone: null,
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
        email: action.payload.email,
        phone: action.payload.phone,
        id: action.payload.id,
      };
    case "SIGN_OUT":
      return { ...INITIAL_STATE };
    case "EDIT_USER":
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
