import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import FormatItalicIcon from "@material-ui/icons/FormatItalic";
import FormatBoldIcon from "@material-ui/icons/FormatBold";
import FormatUnderlinedIcon from "@material-ui/icons/FormatUnderlined";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import FormatStrikethroughIcon from "@material-ui/icons/FormatStrikethrough";
import LinkIcon from "@material-ui/icons/Link";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import topicActions from "../redux/actions/topic.actions";
import routeActions from "../redux/actions/route.actions";
import projectActions from "../redux/actions/project.actions";
import {
  FormControl,
  InputLabel,
  NativeSelect,
  withStyles,
} from "@material-ui/core";
import InputBase from "@material-ui/core/InputBase";
import ReactMarkdown from "react-markdown";

const BootstrapInput = withStyles((theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    // backgroundColor: theme.palette.background.paper,
    border: "1px solid rgb(33, 37, 41, .35)",
    fontSize: 16,
    padding: "10px 26px 10px 12px",
    transition: theme.transitions.create(["border-color", "box-shadow"]),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:focus": {
      borderRadius: 4,
      borderColor: "#4051b5",
      borderWidth: "2px",
      // transform: "translate(14px, 20px) scale(1)",
      // boxShadow: "0 0 0 0.2rem rgba(106,117,163, .25)",
    },
    "&:hover": {
      border: "1px solid rgb(33, 37, 41, 1)",
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      // width: "25ch",
    },
  },
  spacing: {
    margin: theme.spacing(1),
  },
  main: {
    marginTop: "5rem",
    marginLeft: "2rem",
    textAlign: "center",
    height: "100vh",
    width: "60vw",
    border: "solid",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  preview: {
    marginTop: "5rem",
    marginLeft: "2rem",
    height: "100vh",
    width: "30vw",
    border: "solid",
    borderWidth: "1px",
    padding: "20px",
    borderRadius: "10px",
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  textBox: {
    width: "95%",
    // padding: "5px",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
    width: "95%",
  },
  tagsBox: {
    width: "95%",
    // padding: "5px",
    marginBottom: theme.spacing(2),
  },
  btnGroup: {
    display: "flex",
    justifyContent: "left",
    marginLeft: "1rem",
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

const AddEditProjectPage = () => {
  const textAreaRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    topicId: "",
    tags: [],
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const topics = useSelector((state) => state.topic.topics);
  const project = useSelector((state) => state.project.selectedProject);
  // console.log("project", project);

  const addOrEdit = project === null ? "Add" : "Edit";
  useEffect(() => {
    if (addOrEdit === "Edit") {
      setFormData((formData) => ({
        ...formData,
        title: project.title,
        content: project.content,
        topicId: project.topicId,
        tags: project.tags.join(", "),
      }));
    }
  }, [project, dispatch, addOrEdit]);

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(e);

    // if (e.target.name === "content") {
    //   console.log(e);
    //   console.log(textAreaRef.current.currentPosition);
    // }
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    const { title, content, topicId } = formData;
    const { tags } = formData;
    if (addOrEdit === "Add") {
      if (tags.includes(", ")) {
        const tagArray = tags.split(", ");
        dispatch(
          projectActions.createNewProject({ title, content, topicId, tagArray })
        );
      } else {
        dispatch(projectActions.createNewProject(formData));
      }
    } else if (addOrEdit === "Edit") {
      // console.log("form", formData);
      const projectId = project._id;
      // console.log(projectId);
      if (tags.includes(", ")) {
        const tagArray = tags.split(", ");
        dispatch(
          projectActions.updateProject({
            projectId,
            title,
            content,
            topicId,
            tagArray,
          })
        );
      } else {
        dispatch(projectActions.updateProject(project._id, formData));
      }
    }
  };

  useEffect(() => {
    dispatch(topicActions.allTopicsRequest());
  }, [dispatch]);

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

  const insertMetachars = (sStartTag, sEndTag) => {
    const oMsgInput = textAreaRef.current.childNodes[1].childNodes[0];
    const nSelStart = oMsgInput.selectionStart;
    const nSelEnd = oMsgInput.selectionEnd;
    const sOldText = oMsgInput.value;
    setFormData({
      ...formData,
      content:
        sOldText.substring(0, nSelStart) +
        (sStartTag + sOldText.substring(nSelStart, nSelEnd) + sEndTag) +
        sOldText.substring(nSelEnd),
    });

    oMsgInput.setSelectionRange(
      nSelStart === nSelEnd ? nSelStart + sStartTag.length : nSelStart,
      nSelEnd + sStartTag.length
    );
    oMsgInput.focus();
  };

  const handleCancelBtn = () => {
    dispatch(projectActions.cancelSelected());
    history.goBack();
  };

  return (
    <div className={classes.root}>
      <div className="d-flex">
        <div className={classes.main}>
          <form className={classes.root} noValidate autoComplete="off">
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              className={classes.textBox}
              name="title"
              value={formData.title}
              onChange={handleChange}
            />
            <ButtonGroup
              variant="text"
              color="primary"
              aria-label="text primary button group"
              className={classes.btnGroup}
            >
              <Button onClick={() => insertMetachars("**", "**")}>
                <FormatBoldIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("_", "_")}>
                <FormatItalicIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("<u>", "</u>")}>
                <FormatUnderlinedIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("<ul><li>", "</li></ul>")}>
                <FormatListBulletedIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("<del>", "</del>")}>
                <FormatStrikethroughIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("<small>", "</small>")}>
                <FormatSizeIcon fontSize="small" />
              </Button>
              <Button onClick={() => insertMetachars("[", "](link)")}>
                <LinkIcon fontSize="small" />
              </Button>
            </ButtonGroup>
            <TextField
              ref={textAreaRef}
              id="outlined-textarea"
              label="Content"
              placeholder="Content"
              name="content"
              multiline
              rows={15}
              variant="outlined"
              className={classes.textBox}
              value={formData.content}
              onChange={handleChange}
            />
            {/* <TextField
            id="outlined-basic"
            label="Project Id"
            variant="outlined"
            className={classes.textBox}
            name="topicId"
            value={formData.topicId}
            onChange={handleChange}
          /> */}
            <FormControl className={classes.formControl}>
              <InputLabel shrink htmlFor="age-native-label-placeholder">
                Topic
              </InputLabel>
              <NativeSelect
                id="demo-customized-select-native"
                name="topicId"
                value={formData.topicId}
                onChange={handleChange}
                input={<BootstrapInput />}
              >
                <option value="">None</option>
                {topics.map((topic) => (
                  <option key={topic._id} value={topic._id}>
                    {topic.title}
                  </option>
                ))}
              </NativeSelect>
              {/* <FormHelperText>
              Pick the topic your project belongs in
            </FormHelperText> */}
            </FormControl>
            <TextField
              id="outlined-basic"
              label="Tags"
              variant="outlined"
              className={classes.tagsBox}
              name="tags"
              value={formData.tags}
              onChange={handleChange}
            />
          </form>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
            // className={classes.btnGroup}
          >
            <Button
              variant="outlined"
              className={classes.btn}
              onClick={handleSubmitProject}
              disabled={!formData.textBox}
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
        <div className={classes.preview}>
          <h4>Preview</h4>
          <hr />
          <h4>{formData.title}</h4>
          <br />
          <ReactMarkdown allowDangerousHtml>{formData.content}</ReactMarkdown>
          <hr />
          {/* <h6>{formData.topicId}</h6> */}
          <small>{formData.tags}</small>
        </div>
      </div>
    </div>
  );
};

export default AddEditProjectPage;
