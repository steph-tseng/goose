import React, { useEffect, useState } from "react";
// import Markdown from "markdown-to-jsx";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import topicActions from "../redux/actions/topic.actions";
import routeActions from "../redux/actions/route.actions";
// import clsx from "clsx";

const styles = (theme) => ({
  listItem: {
    marginTop: theme.spacing(1),
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  main: {
    marginTop: "5rem",
    marginLeft: "2rem",
    textAlign: "center",
    height: "100%",
    width: "70%",
    border: "solid",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textBox: {
    width: "95%",
    padding: "5px",
  },
  btnGroup: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  btn: {
    backgroundColor: "#6a75a3",
    color: "#fff",
    "&:hover": { backgroundColor: "#8b97cc" },
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },
  btnPadding: {
    paddingLeft: "10vw",
    paddingRight: "10vw",
  },
}));

const options = {
  overrides: {
    h1: {
      component: Typography,
      props: {
        gutterBottom: true,
        variant: "h5",
      },
    },
    h2: { component: Typography, props: { gutterBottom: true, variant: "h6" } },
    h3: {
      component: Typography,
      props: { gutterBottom: true, variant: "subtitle1" },
    },
    h4: {
      component: Typography,
      props: { gutterBottom: true, variant: "caption", paragraph: true },
    },
    p: { component: Typography, props: { paragraph: true } },
    a: { component: Link },
    li: {
      component: withStyles(styles)(({ classes, ...props }) => (
        <li className={classes.listItem}>
          <Typography component="span" {...props} />
        </li>
      )),
    },
  },
};

const AddEditTopicPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    const { title, description } = formData;
    dispatch(topicActions.createNewTopic(title, description));
  };

  useEffect(() => {
    if (redirectTo) {
      if (redirectTo === "__GO_BACK__") {
        history.goBack();
        dispatch(routeActions.removeRedirectTo());
      } else {
        history.push(redirectTo);
        dispatch(routeActions.removeRedirectTo());
      }
    }
  }, [redirectTo, dispatch, history]);

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <h2>New Topic</h2>
        {/* <Markdown children={content} options={options} /> */}
        <form className={classes.root} noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="Title"
            variant="outlined"
            name="title"
            className={classes.textBox}
            value={formData.title}
            onChange={handleChange}
          />
          <TextField
            id="outlined-textarea"
            label="Description"
            placeholder="Description"
            multiline
            rows={8}
            variant="outlined"
            className={classes.textBox}
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </form>
        <ButtonGroup
          color="primary"
          aria-label="outlined primary button group"
          className={classes.btnGroup}
        >
          <Button
            variant="outlined"
            className={classes.btn}
            onClick={handleSubmitTopic}
          >
            Submit
          </Button>
          <Button
            variant="outlined"
            className={classes.btnPadding}
            onClick={() => history.goBack()}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AddEditTopicPage;
