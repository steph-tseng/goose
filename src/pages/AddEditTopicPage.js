import React, { useEffect, useState } from "react";
// import Markdown from "markdown-to-jsx";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import topicActions from "../redux/actions/topic.actions";
import routeActions from "../redux/actions/route.actions";
// import clsx from "clsx";

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
  disabledButton: {
    backgroundColor: "#99a2c7",
    color: "#fff",
  },
}));

const AddEditTopicPage = () => {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const topic = useSelector((state) => state.topic.selectedTopic);
  const addOrEdit = topic === null ? "Add" : "Edit";

  useEffect(() => {
    if (addOrEdit === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: topic.title,
        description: topic.description,
        image: topic.image,
      }));
    }
  }, [topic, dispatch, addOrEdit]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitTopic = (e) => {
    e.preventDefault();
    const { title, description, image } = formData;
    if (addOrEdit === "Add") {
      dispatch(topicActions.createNewTopic(title, description, image));
    } else {
      const topicId = topic._id;
      dispatch(topicActions.updateTopic(topicId, formData));
    }
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

  const handleCancelBtn = () => {
    dispatch(topicActions.cancelSelected());
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div className={classes.main}>
        <h2>{addOrEdit === "Edit" ? "Update Topic" : "New Topic"}</h2>
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
          <TextField
            id="outlined-textarea"
            label="Image Url"
            placeholder="Image Url"
            multiline
            rows={1}
            variant="outlined"
            className={classes.textBox}
            name="image"
            value={formData.image}
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
            disabled={!formData.description}
            classes={{ disabled: classes.disabledButton }}
          >
            {addOrEdit === "Edit" ? "Update" : "Submit"}
          </Button>
          <Button
            variant="outlined"
            className={classes.btnPadding}
            onClick={handleCancelBtn}
          >
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default AddEditTopicPage;
