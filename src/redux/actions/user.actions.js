import api from "../../apiService";
import * as types from "../constants/user.constants";
import routeActions from "./route.actions";

// the middleware functions will be here
const getCurrentUserInfo = (authToken) => async (dispatch) => {
  dispatch({ type: types.GET_CURRENT_USER_REQUEST, payload: null });
  try {
    const res = api.get(`/users/me`, authToken);
    dispatch({ type: types.GET_CURRENT_USER_SUCCESS, payload: res.data.data });
    console.log("actions", res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_CURRENT_USER_FAILURE, payload: null });
  }
};

const getUsers = (
  pageNum = 1,
  limit = 10,
  query = null,
  sortBy = null
) => async (dispatch) => {
  dispatch({ type: types.GET_USERS_REQUEST, payload: null });
  try {
    let queryString = "";
    if (query) {
      queryString = `&name[$regex]=${query}&name[$options]=i`;
    }
    let sortByString = "";
    if (sortBy?.key) {
      sortByString = `&sortBy[${sortBy.key}]=${sortBy.ascending}`;
    }
    const res = await api.get(
      `/users?page=${pageNum}&limit=${limit}${queryString}${sortByString}`
    );
    dispatch({
      type: types.GET_USERS_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({ type: types.GET_USERS_FAILURE, payload: error });
  }
};

const updateUserInfo = (authToken, name, password, avatarURL) => async (
  dispatch
) => {
  dispatch({ type: types.UPDATE_USER_REQUEST, payload: null });
  try {
    const res = api.put(`/users/`, authToken, name, password, avatarURL);
    dispatch({ type: types.UPDATE_USER_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect("/admin/Profile"));
  } catch (error) {
    dispatch({ type: types.UPDATE_USER_FAILURE, payload: null });
  }
};

const userActions = { getCurrentUserInfo, getUsers, updateUserInfo };
export default userActions;
