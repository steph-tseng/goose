import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import Button from "@material-ui/core/Button";
import topicActions from "../redux/actions/topic.actions";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "4rem",
  },
  textBox: {
    height: "18vh",
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "center",
    alignContent: "center",
    boxShadow: "2px 2px 4px #1b1e21",
    borderRadius: "10px",
    marginBottom: "5vh",
  },
}));

const TopicPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const topicId = params.topicId;
  const topic = useSelector((state) => state.topic.selectedTopic);
  console.log(topic);

  useEffect(() => {
    dispatch(topicActions.getSelctedTopic(topicId));
  }, [dispatch, topicId]);

  const handleDelete = () => {
    dispatch(topicActions.deleteTopic(topicId));
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div className={classes.textBox}>
        <h1 className="pt-2 mt-1">{topic?.title}</h1>
        <p>{topic?.description}</p>
      </div>
      <Button
        variant="contained"
        color="secondary"
        style={{ borderRadius: "10px" }}
        onClick={handleDelete}
      >
        Delete
      </Button>
    </div>
  );
};

export default TopicPage;
