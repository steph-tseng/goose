import * as types from "../constants/user.constants";
const initialState = {
  users: [],
  totalPageNum: 1,
  selectedUser: {},
  loading: false,
};

const userReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_CURRENT_USER_REQUEST:
    case types.GET_USERS_REQUEST:
    case types.UPDATE_USER_REQUEST:
      return { ...state, loading: true };
    case types.GET_CURRENT_USER_SUCCESS:
      return { ...state, selectedUser: payload, loading: false };
    case types.GET_USERS_SUCCESS:
      return {
        ...state,
        users: payload.users,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.UPDATE_USER_SUCCESS:
      return { ...state, loading: false };
    case types.GET_CURRENT_USER_FAILURE:
    case types.GET_USERS_FAILURE:
    case types.UPDATE_USER_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default userReducer;
