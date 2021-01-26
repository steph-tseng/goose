import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import topicActions from "../redux/actions/topic.actions";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TopicCard2 from "../components/TopicCard2";
import {
  Grid,
  IconButton,
  InputBase,
  rgbToHex,
  Tooltip,
} from "@material-ui/core";
import projectActions from "../redux/actions/project.actions";
import clsx from "clsx";
import SplitButton from "../components/MergeButtonMUI";
import { createMuiTheme } from "@material-ui/core/styles";
import { Search } from "@material-ui/icons";
import honk from "../images/circle-cropped.png";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#6a75a3",
      dark: "#8b97cc",
      disabled: "#99a2c7",
      contrastText: "#fff",
    },
    secondary: {
      light: "#fff",
      main: "#bdbdbd",
      dark: "#424242",
      contrastText: "#000",
    },
  },
});

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
    // marginTop: theme.spacing(10),
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
    // marginLeft: theme.spacing(16),
    // marginRight: theme.spacing(20),
    // width: "40vw",

    borderRadius: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    flexGrow: 1,
  },
  card: {
    // marginLeft: theme.spacing(18),
    // marginRight: theme.spacing(12),
    paddingLeft: theme.spacing(16),
    paddingRight: theme.spacing(16),
  },
  divBtn: {
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
    // marginRight: theme.spacing(10),
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
}));

// AKA TopicsList page
const HomePage = () => {
  const classes = useStyles();
  const topics = useSelector((state) => state.topic.topics);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const totalPageNum = useSelector((state) => state.topic.totalPageNum);
  const [pageNum, setPageNum] = useState(1);
  const [showSearch, setShowSearch] = useState(null);
  const [query, setQuery] = useState("");
  const [searchBy, setSearchBy] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();

  const handlePageChange = (event, value) => {
    setPageNum(value);
  };

  const handleSearchText = (e) => {
    e.preventDefault();
    setQuery(e.target.value);
  };

  const clickTopic = (topicId) => {
    history.push(`/topics/${topicId}`);
    setShowSearch(null);
  };

  useEffect(() => {
    dispatch(topicActions.topicsRequest(pageNum));
  }, [dispatch, pageNum]);

  useEffect(() => {
    if (searchBy) {
      dispatch(topicActions.topicsRequest(pageNum, searchBy, query));
    }
  }, [dispatch, pageNum, searchBy, query]);

  const addTopic = () => {
    dispatch(topicActions.cancelSelected());
    history.push(`/edittopic`);
  };

  const addProject = () => {
    dispatch(projectActions.cancelSelected());
    history.push(`/editproject`);
  };

  const options = ["Project", "Topic"];
  const searchOptions = ["Title", "Description"];

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
        <SplitButton
          options={options}
          addTopic={addTopic}
          addProject={addProject}
        />
      )}
    </>
  );

  const handleHonk = () => {
    // alert("honk honk");
    history.push("/admin/messages");
  };

  return (
    <>
      <div
        style={{
          position: "sticky",
          left: "90vw",
          top: "85vh",
          zIndex: 1000,
        }}
      >
        <Tooltip title="Honk Chat">
          <IconButton onClick={() => handleHonk()}>
            <img
              src={honk}
              alt="honk"
              style={{ height: "80px", width: "80px" }}
            />
          </IconButton>
        </Tooltip>
      </div>
      <div className={classes.root}>
        <Paper
          variant="outlined"
          elevation={24}
          children={children}
          className={classes.paper}
        />
        {showSearch ? (
          <Grid
            container={true}
            justify="flex-end"
            alignItems="center"
            direction="row"
            // sm={11}
            // lg={11}
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
            <Grid item lg={1}>
              <SplitButton options={searchOptions} setSearchBy={setSearchBy} />
            </Grid>
            <Grid item sm={1} lg={2}></Grid>
          </Grid>
        ) : (
          <Grid
            container
            // className={classes.divBtn}

            // sm={11}
            // lg={11}
            classes={{ container: classes.divBtn }}
          >
            <Grid item xs={3} sm={3} lg={3}>
              <IconButton
                classes={{ root: classes.btn }}
                onClick={() => setShowSearch("show")}
              >
                <Search fontSize="large" />
              </IconButton>
            </Grid>
          </Grid>
        )}
        <Grid container spacing={3} className={classes.card} justify="center">
          {topics.map((topic) => {
            // console.log(topic);
            return (
              <Grid key={topic._id} item onClick={() => clickTopic(topic._id)}>
                {/* <TopicCard topic={topic} /> */}
                <TopicCard2 topic={topic} key={topic._id} />
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
