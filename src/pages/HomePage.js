import React, { useEffect, useState } from "react";
import { Button, ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import topicActions from "../redux/actions/topic.actions";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TopicCard2 from "../components/TopicCard2";
import { Grid } from "@material-ui/core";
import projectActions from "../redux/actions/project.actions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(0),
    },
    "& .MuiPaginationItem-outlined": {
      border: "1px solid #fff",
      borderRadius: "10px",
      color: "#fff",
      boxShadow: "2px 2px 4px #1b1e21",
      marginBottom: theme.spacing(1),
    },
    "& .Mui-selected": {
      backgroundColor: "rgba(255, 255, 255, 0.2)",
    },
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    alignContent: "center",
  },
  paper: {
    marginTop: theme.spacing(10),
    marginLeft: theme.spacing(16),
    marginRight: theme.spacing(16),
    marginBottom: theme.spacing(2),
    borderRadius: "10px",
    padding: theme.spacing(4),
    boxShadow: "2px 2px 4px #1b1e21",
    width: "80vw",
    backgroundImage:
      "url(https://live.staticflickr.com/65535/50808353838_213a594c7d_b.jpg)",
    backgroundRepeat: "repeat",
    backgroundSize: "200px",
  },
  gridListRoot: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  search: {
    marginLeft: theme.spacing(16),
    width: "80vw",
  },
  card: {
    marginLeft: theme.spacing(18),
    marginRight: theme.spacing(12),
  },
}));

// AKA TopicsList page
const HomePage = () => {
  const classes = useStyles();
  const topics = useSelector((state) => state.topic.topics);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalPageNum = useSelector((state) => state.topic.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  const clickTopic = (topicId) => {
    history.push(`/topics/${topicId}`);
  };

  useEffect(() => {
    dispatch(topicActions.topicsRequest(pageNum));
  }, [dispatch, pageNum]);

  const addTopic = () => {
    dispatch(topicActions.cancelSelected());
    history.push(`/edittopic`);
  };

  const addProject = () => {
    dispatch(projectActions.cancelSelected());
    history.push(`/editproject`);
  };

  const children = (
    <>
      {/* <img
        src="https://live.staticflickr.com/65535/50808353838_213a594c7d_b.jpg"
        alt="prince waluigi"
      /> */}
      <h1
        style={{
          fontSize: "4rem",
          fontFamily: "Langar",
          color: "#fff",
          // backgroundColor: "black",
        }}
      >
        Goose
      </h1>
      {isAuthenticated === true && (
        <DropdownButton
          as={ButtonGroup}
          variant="outline-light"
          title="Create new"
          id="bg-nested-dropdown"
          style={{
            border: "2px solid #fff",
            borderRadius: "5px",
            fontWeight: "5px",
            backgroundColor: "rgb(256, 256, 256, .2)",
          }}
          // className="glass-effect"
        >
          <Dropdown.Item
            as={Button}
            variant="outline-light"
            eventKey="1"
            onClick={addTopic}
          >
            Topic
          </Dropdown.Item>
          <Dropdown.Item
            as={Button}
            variant="outline-light"
            eventKey="2"
            onClick={addProject}
          >
            Project
          </Dropdown.Item>
        </DropdownButton>
      )}
    </>
  );

  return (
    <>
      <div className={classes.root}>
        <Paper
          variant="outlined"
          elevation={24}
          children={children}
          className={classes.paper}
        />

        <div className={classes.search}>
          <SearchForm />
        </div>
        <Grid container spacing={3} className={classes.card}>
          {topics.map((topic) => {
            // console.log(topic);
            return (
              <Grid item onClick={() => clickTopic(topic._id)}>
                {/* <TopicCard topic={topic} /> */}
                <TopicCard2 topic={topic} />
                {/* <HoverCard topic={topic} /> */}
              </Grid>
            );
          })}
        </Grid>
        <Grid justify="center" container={true}>
          <Pagination
            count={totalPageNum}
            page={pageNum}
            variant="outlined"
            onChange={handlePageChange}
            shape="rounded"
            classes={{ root: classes.root }}
            size="large"
          />
        </Grid>
      </div>
    </>
  );
};

export default HomePage;
