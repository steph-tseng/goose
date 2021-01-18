import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import projectActions from "../redux/actions/project.actions";
import { Divider, IconButton } from "@material-ui/core";
import { Chat, Delete, Edit } from "@material-ui/icons";

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
  console.log(project);

  useEffect(() => {
    dispatch(projectActions.getSelctedProject(projectId));
  }, [dispatch, projectId]);

  const handleDelete = () => {
    dispatch(projectActions.deleteProject(projectId));
    history.goBack();
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
              <IconButton aria-label="edit">
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
    </div>
  );
};

export default ProjectPage;
