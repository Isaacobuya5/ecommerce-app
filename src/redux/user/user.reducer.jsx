const INITIAL_STATE = {
  currentUser: null
};

// state = INITIAL_STATE means that if a new state is not passed, the it would user the initial state
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "SET_CURRENT_USER":
      return {
        ...state,
        currentUser: action.payload
      };
    default:
      return state;
  }
};

export default userReducer;
