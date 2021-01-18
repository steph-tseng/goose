import * as types from "../constants/project.constants";
import api from "../../apiService";
import { toast } from "react-toastify";
import routeActions from "./route.actions";

const projectsRequest = (pagenum, query, searchBy = "topic") => async (
  dispatch
) => {
  dispatch({ type: types.GET_PROJECTS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`projects?page=${pagenum}`);
    if (searchBy && query) {
      // const res = await api.get(
      //   `/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i`
      // );
      const res = await api.get(
        `/projects?page=${pagenum}&limit=10&${searchBy}[$regex]=${query}&${searchBy}[$options]=i`
      );
      dispatch({ type: types.GET_PROJECTS_SUCCESS, payload: res.data.data });
    }
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

const getSelctedProject = (projectId) => async (dispatch) => {
  dispatch({ type: types.GET_SELECTED_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.get(`projects/${projectId}`);
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

const createNewProject = ({
  title,
  content,
  topicId,
  tags,
  redirectTo = "__GO_BACK__",
}) => async (dispatch) => {
  dispatch({ type: types.CREATE_PROJECT_REQUEST, payload: null });
  try {
    console.log("====", topicId);
    const res = await api.post(`projects`, { title, content, topicId, tags });
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
  projectId,
  { title, content, topicId, tags, redirectTo = "__GO_BACK__" }
) => async (dispatch) => {
  console.log("ooooo", projectId);
  dispatch({ type: types.CREATE_PROJECT_REQUEST, payload: null });
  try {
    const res = api.put(`projects/${projectId}`, {
      title,
      content,
      topicId,
      tags,
    });
    dispatch({ type: types.CREATE_PROJECT_SUCCESS, payload: res.data.data });
    dispatch(routeActions.redirect(redirectTo));
    toast.success("The blog has been updated!");
  } catch (error) {
    toast.error(error);
    dispatch({ type: types.CREATE_PROJECT_FAILURE, payload: error });
  }
};

const cancelSelected = () => async (dispatch) => {
  dispatch({ type: types.CANCEL_SELECTED_PROJECT, payload: null });
};

const deleteProject = (projectId, redirectTo = "__GO_BACK__") => async (
  dispatch
) => {
  dispatch({ type: types.DELETE_PROJECT_REQUEST, payload: null });
  try {
    const res = await api.delete(`projects/${projectId}`);
    dispatch({
      type: types.DELETE_PROJECT_SUCCESS,
      payload: res.data,
    });
    dispatch(routeActions.redirect(redirectTo));
    dispatch(projectActions.projectsRequest(1));
    toast.success("The project has been deleted!");
  } catch (error) {
    console.log(error);
    dispatch({ type: types.DELETE_PROJECT_FAILURE, payload: error });
  }
};

const createReview = (reviewText, projectId) => async (dispatch) => {
  dispatch({ type: types.CREATE_REVIEW_REQUEST, payload: null });
  try {
    const res = await api.post(`reviews/projects/${projectId}`, {
      content: reviewText,
    });
    dispatch({ type: types.CREATE_REVIEW_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.CREATE_REVIEW_FAILURE, payload: null });
    toast.error(error);
  }
};

const postEmoji = (targetType, targetId, emoji) => async (dispatch) => {
  dispatch({ type: types.SEND_REACTION_REQUEST, payload: null });
  try {
    const res = await api.post(`reactions`, { targetType, targetId, emoji });
    if (targetType === "Project") {
      dispatch({
        type: types.PROJECT_REACTION_SUCCESS,
        payload: res.data.data,
      });
    }
    if (targetType === "Review") {
      dispatch({
        type: types.REVIEW_REACTION_SUCCESS,
        payload: { reactions: res.data.data, reviewId: targetId },
      });
    }
  } catch (error) {
    dispatch({ type: types.SEND_REACTION_FAILURE, payload: error });
    toast.error(error);
  }
};

const projectActions = {
  projectsRequest,
  getSelctedProject,
  createNewProject,
  updateProject,
  cancelSelected,
  deleteProject,
  createReview,
  postEmoji,
};
export default projectActions;
