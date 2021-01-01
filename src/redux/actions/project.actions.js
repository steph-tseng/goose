import * as types from "../constants/project.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "./route.actions";

const projectsRequest = () => async (dispatch) => {
  dispatch({ type: types.GET_PROJECTS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`projects`);
    dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_PROJECTS_FAILURE, payload: null });
    toast.error(error.message);
  }
};
// const projectsRequest = (
//   topicId,
//   pagenum,
//   query,
//   sortBy,
//   ascending,
//   searchBy
// ) => async (dispatch) => {
//   dispatch({ type: types.GET_PROJECTS_REQUEST, payload: null });
//   try {
//     // TODO
//     const res = await api.get(
//       `/${topicId}/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i&sortBy[${sortBy}]=${ascending}`
//     );
//     dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
//   } catch (error) {
//     dispatch({ type: types.GET_PROJECTS_FAILURE, payload: null });
//     toast.error(error.message);
//   }
// };

const getSelctedProject = (topicId, projectId) => async (dispatch) => {
  dispatch({ type: types.GET_SELECTED_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.get(`/${topicId}/${projectId}`);
    dispatch({
      type: types.GET_SELECTED_PROJECT_SUCCESS,
      payload: res.data.data,
    });
    // console.log(res.data.data);
  } catch (error) {
    dispatch({ type: types.GET_SELECTED_PROJECT_FAILURE, payload: null });
    toast.error(error);
  }
};

const createNewProject = (
  title,
  content,
  tags,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.CREATE_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.post(`projects`, { title, content, tags });
    dispatch({
      type: types.CREATE_PROJECT_SUCCESS,
      payload: res.data.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("New project has been created!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_PROJECT_FAILURE, payload: error });
  }
};

const updateProject = (
  topicId,
  title,
  content,
  images,
  projectId,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.CREATE_PROJECT_REQUEST, payload: null });
  try {
    const res = api.put(`${topicId}/${projectId}`, {
      title,
      content,
      images,
    });
    dispatch({ type: types.CREATE_PROJECT_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_PROJECT_FAILURE, payload: error });
  }
};

const deleteProject = (
  topicId,
  projectId,
  redirectTo = "__GO_BACK__"
) => async (dispatch) => {
  dispatch({ type: types.DELETE_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.delete(`${topicId}/${projectId}`);
    dispatch({
      type: types.DELETE_PROJECT_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The project has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_PROJECT_FAILURE, payload: error });
  }
};

const projectActions = {
  projectsRequest,
  getSelctedProject,
  createNewProject,
  updateProject,
  deleteProject,
};
export default projectActions;
