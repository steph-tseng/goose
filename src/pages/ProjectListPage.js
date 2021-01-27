import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import projectActions from "../redux/actions/project.actions";
import ReactMarkdown from "react-markdown";
import Pagination from "@material-ui/lab/Pagination";
import {
  Button,
  Grid,
  IconButton,
  InputBase,
  Tooltip,
} from "@material-ui/core";
import userActions from "../redux/actions/user.actions";
import { Search } from "@material-ui/icons";
import SplitButton from "../components/MergeButtonMUI";
import topicActions from "../redux/actions/topic.actions";
import honk from "../images/circle-cropped.png";

const useStyles = makeStyles((theme) => ({
  root: {
    // marginTop: "5rem",
    display: "flex",
    flexDirection: "column",
    "& .MuiPaginationItem-outlined": {
      border: "1px solid #fff",
      borderRadius: "10px",
      color: "#fff",
      boxShadow: "2px 2px 4px #1b1e21",
      marginBottom: theme.spacing(1),
      marginTop: theme.spacing(5),
    },

    "& .Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    textAlign: "center",
    alignContent: "center",
  },
  main: {
    height: "120px",
    width: "80vw",
    backgroundColor: "#fff",
    alignContent: "center",
    textAlign: "center",
    boxShadow: "2px 2px 4px #1b1e21",
    borderRadius: "10px",
    // marginLeft: theme.spacing(16),
    // marginRight: theme.spacing(16),

    position: "relative",
    backgroundImage:
      "url(https://live.staticflickr.com/65535/50808353838_213a594c7d_b.jpg)",
    backgroundRepeat: "repeat",
    backgroundSize: "200px",
    color: "#fff",
    fontFamily: "langar",
    fontWeight: "5",
    "&:after": {
      zIndex: 5,
      backgroundColor: "#fff",
    },
  },
  list: {
    listStyle: "none",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    flexWrap: "wrap",
    marginLeft: theme.spacing(4),
  },
  listItem: {
    display: "flex",
    flexDirection: "row",
    marginTop: theme.spacing(3),
  },
  project: {
    width: "74vw",
    backgroundColor: "#fff",
    alignContent: "center",
    textAlign: "left",
    boxShadow: "2px 2px 4px #1b1e21",
    borderRadius: "10px",
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
    // marginRight: theme.spacing(18),
  },
  avatar: {
    marginLeft: theme.spacing(8),
    marginRight: theme.spacing(1),
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
  divBtn: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    // marginRight: theme.spacing(10),
    marginTop: theme.spacing(1),
  },
  btn: {
    color: "#fff",
    border: "1px solid #fff",
    width: "40px",
    height: "40px",
    borderRadius: "10px",
  },
  inputRoot: {
    color: "inherit",
    backgroundColor: "rgb(256, 256, 256, 0.4)",
    borderRadius: "10px",
    marginTop: theme.spacing(2),
    alignItems: "center",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
  spacing: {
    marginTop: theme.spacing(2),
  },
}));

const ProjectPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.project.projects);
  const totalPageNum = useSelector((state) => state.project.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const following = useSelector((state) => state.user.following).map(
    (item) => item._id
  );
  const [showSearch, setShowSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  console.log("following list", following);

  useEffect(() => {
    dispatch(userActions.getListOfFollowing());
  }, [dispatch]);

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  useEffect(() => {
    dispatch(projectActions.projectsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (searchBy && query) {
      dispatch(projectActions.projectsRequest(pageNum, query, searchBy));
    }
  }, [dispatch, pageNum, searchBy, query]);

  const startFollowing = (userId) => {
    dispatch(userActions.followRequest(userId));
  };

  const handleUnfollow = (userId) => {
    dispatch(userActions.unfollow(userId));
  };

  const addTopic = () => {
    dispatch(topicActions.cancelSelected());
    history.push(`/edittopic`);
  };

  const addProject = () => {
    dispatch(projectActions.cancelSelected());
    history.push(`/editproject`);
  };

  const options = ["Project", "Topic"];

  const searchOptions = ["Title", "Content", "Tags"];
  // const searchOptions = ["Title", "Description"];

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  return (
    <>
      {isAuthenticated && (
        <div
          style={{
            position: "sticky",
            left: "90vw",
            top: "85vh",
          }}
        >
          <Tooltip title="Honk Chat">
            <IconButton onClick={() => history.push("/admin/messages")}>
              <img
                src={honk}
                alt="honk"
                style={{ height: "80px", width: "80px" }}
              />
            </IconButton>
          </Tooltip>
        </div>
      )}
      <div
        className={classes.root}
        style={{ marginTop: isAuthenticated ? 0 : "5rem" }}
      >
        <Grid container justify="center">
          <div
            className={classes.main}
            style={{ paddingTop: isAuthenticated ? 0 : "1.5rem" }}
          >
            <h1 className="pt-2 mt-1">All Projects</h1>
            {isAuthenticated === true && (
              <SplitButton
                options={options}
                addTopic={addTopic}
                addProject={addProject}
              />
            )}
          </div>
          {showSearch ? (
            <Grid
              container={true}
              justify="flex-end"
              alignItems="center"
              direction="row"
              // sm={11}
              lg={11}
              spacing={1}
              // className={classes.search}
              classes={{ container: classes.search }}
            >
              <Grid item>
                <InputBase
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={query}
                  onChange={handleSearchText}
                  inputProps={{ "aria-label": "search" }}
                />
              </Grid>
              <Grid item sm={2} lg={1} className={classes.spacing}>
                <SplitButton
                  options={searchOptions}
                  setSearchBy={setSearchBy}
                />
                {/* <SplitButton options={["Title", "Content"]} /> */}
              </Grid>
              <Grid item sm={1} lg={1}></Grid>
            </Grid>
          ) : (
            <Grid
              container
              // className={classes.divBtn}
              xs={11}
              // sm={11}
              lg={11}
              classes={{ container: classes.divBtn }}
            >
              <Grid item sm={2} lg={1}>
                <IconButton
                  classes={{ root: classes.btn }}
                  onClick={() => setShowSearch("show")}
                >
                  <Search fontSize="medium" />
                </IconButton>
              </Grid>
            </Grid>
          )}
          <Grid container>
            <ul className={classes.list}>
              {projects?.map((project, index) => {
                // console.log(topic);
                return (
                  <Grid item sm={11} lg={12} key={project._id}>
                    <li className={classes.listItem} key={project._id}>
                      <Avatar
                        src={
                          project.author.avatarURL
                            ? project.author.avatarURL
                            : "data:image/jpeg;base64,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"
                        }
                        alt={project.author.name}
                        className={classes.avatar}
                      />
                      <div className={classes.project}>
                        <small>@{project.author.name}</small>{" "}
                        {!following.includes(project.author._id) ? (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => startFollowing(project.author._id)}
                          >
                            Follow
                          </Button>
                        ) : (
                          <Button
                            variant="text"
                            color="primary"
                            onClick={() => handleUnfollow(project.author._id)}
                          >
                            Unfollow
                          </Button>
                        )}
                        <hr />
                        <div
                          onClick={() =>
                            history.push(`/projects/${project._id}`)
                          }
                        >
                          <h3>{project.title}</h3>
                          <ReactMarkdown allowDangerousHtml>
                            {project.content}
                          </ReactMarkdown>
                        </div>
                        {project.tags
                          ? project.tags.map((tag) => <small>#{tag} </small>)
                          : ""}
                      </div>
                    </li>
                  </Grid>
                );
              })}
            </ul>
          </Grid>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2vh",
            }}
          >
            <Pagination
              count={totalPageNum}
              page={pageNum}
              variant="outlined"
              onChange={handlePageChange}
              shape="rounded"
              classes={{ root: classes.root }}
              size="large"
            />
          </div>
        </Grid>
      </div>
    </>
  );
};

export default ProjectPage;
