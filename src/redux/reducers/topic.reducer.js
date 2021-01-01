import * as types from "../constants/topic.constants";

const initialState = {
  topics: [],
  totalPageNum: 1,
  selectedTopic: null,
  loading: false,
  submitLoading: false,
};

const topicReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_TOPICS_REQUEST:
      return { ...state, loading: true };
    case types.GET_TOPICS_SUCCESS:
      return {
        ...state,
        totalPageNum: payload.totalPages,
        topics: payload.topics,
        loading: false,
      };
    case types.GET_TOPICS_FAILURE:
      return { ...state, loading: false };

    case types.GET_TOPIC_REQUEST:
      return { ...state, loading: true };
    case types.GET_TOPIC_SUCCESS:
      return { ...state, selectedTopic: payload, loading: false };
    case types.GET_TOPIC_FAILURE:
      return { ...state, loading: false };

    case types.CREATE_TOPIC_REQUEST:
      return { ...state, loading: true };
    case types.CREATE_TOPIC_SUCCESS:
      return { ...state, loading: false };
    case types.CREATE_TOPIC_FAILURE:
      return { ...state, loading: false };

    default:
      return state;
  }
};

export default topicReducer;
