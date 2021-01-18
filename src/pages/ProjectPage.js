import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import projectActions from "../redux/actions/project.actions";
import { Divider, IconButton } from "@material-ui/core";
import { Chat, Delete, Edit } from "@material-ui/icons";
import ReviewForm from "../components/ReviewForm";
// import ReactionList from "../components/ReactionList";
import ReactionMaterial from "../components/ReactionMaterial";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "1rem",
    display: "flex",
    flexDirection: "column",
    padding: "4rem",
  },
  textBox: {
    // height: "18vh",
    width: "100%",
    backgroundColor: "#fff",
    textAlign: "left",
    alignContent: "center",
    boxShadow: "2px 2px 4px #1b1e21",
    borderRadius: "10px",
    marginBottom: "5vh",
    padding: theme.spacing(2),
  },
  btnGroup: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "end",
    width: "100%",
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const params = useParams();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const projectId = params.projectId;
  const project = useSelector((state) => state.project.selectedProject);
  const submitLoading = useSelector((state) => state.project.submitLoading);
  // console.log(project);
  const [reviewText, setReviewText] = useState("");
  const [showComments, setShowComments] = useState(false);
  const handleShowComments = () => {
    if (showComments === false) {
      setShowComments(true);
    } else {
      setShowComments(false);
    }
  };

  useEffect(() => {
    dispatch(projectActions.getSelctedProject(projectId));
  }, [dispatch, projectId]);

  const handleInputChange = (e) => {
    setReviewText(e.target.value);
  };
  const handleSubmitReview = (e) => {
    e.preventDefault();
    dispatch(projectActions.createReview(projectId, reviewText));
    setReviewText("");
  };

  const handleDelete = () => {
    dispatch(projectActions.deleteProject(projectId));
    history.goBack();
  };

  const handleEmojiClick = (targetType, targetId, emoji) => {
    dispatch(projectActions.postEmoji(targetType, targetId, emoji));
  };

  return (
    <div className={classes.root}>
      <div className={classes.textBox}>
        <p>{project?.author.name}</p>
        <Divider />
        <h1 className=" mt-1">{project?.title}</h1>
        <ReactMarkdown allowDangerousHtml>{project?.content}</ReactMarkdown>
        {project?.tags
          ? project?.tags?.map((tag) => <small>#{tag} </small>)
          : ""}

        {isAuthenticated && (
          <>
            <Divider />
            <div className={classes.btnGroup}>
              <hr />
              <IconButton aria-label="comment" onClick={handleShowComments}>
                <Chat />
              </IconButton>
              <IconButton aria-label="delete" onClick={handleDelete}>
                <Delete />
              </IconButton>
              <IconButton
                aria-label="edit"
                onClick={() => history.push(`/editproject/${projectId}`)}
              >
                <Edit />
              </IconButton>
            </div>
          </>
        )}
      </div>
      {showComments === true && (
        <div className={classes.textBox}>
          <ReactionMaterial
            reactionsData={project.reactions}
            targetType="Project"
            targetId={project._id}
            handleEmojiClick={handleEmojiClick}
            loading={submitLoading}
          />

          {/* <ReactionList
            reactionsData={project.reactions}
            targetType="Project"
            targetId={project._id}
            handleEmojiClick={handleEmojiClick}
            loading={submitLoading}
            size="sm"
          /> */}
          <h5 id="commentsSection" className="text-left">
            Comments:
          </h5>
          {isAuthenticated && (
            <ReviewForm
              reviewText={reviewText}
              handleInputChange={handleInputChange}
              handleSubmitReview={handleSubmitReview}
              loading={submitLoading}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
