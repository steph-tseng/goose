import React, { useEffect, useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
// import IconButton from "@material-ui/core/IconButton";
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
    // padding: "5px",
  },
  tagsBox: {
    width: "95%",
    padding: "5px",
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
}));

const AddEditProjectPage = () => {
  const textAreaRef = useRef(null);
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: [],
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === "content") {
      console.log(e);
      console.log(textAreaRef.current.currentPosition);
    }
  };

  const handleSubmitProject = (e) => {
    e.preventDefault();
    const { title, content, tags } = formData;
    dispatch(projectActions.createNewProject(title, content, tags));
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

  return (
    <div className={classes.root}>
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
            <Button onClick={() => insertMetachars("<ul>", "</ul>")}>
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
          <TextField
            id="outlined-basic"
            label="Tags"
            variant="outlined"
            className={classes.textBox}
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

export default AddEditProjectPage;
