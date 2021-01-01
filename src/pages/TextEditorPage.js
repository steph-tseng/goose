import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    opacity: 0.7,
  },
  main: { backgroundColor: "#fff", opacity: 1 },
  contentBox: {
    height: "100%",
    width: "70%",
    border: "solid",
    borderWidth: "1px",
    padding: "15px",
    borderRadius: "10px",
    backgroundColor: "#fff",
  },
  editableBox: {
    margin: "10",
    fontSize: "24px",
    fontFamily: "Academia",
    border: "solid 1px #ddd",
    borderRadius: "3px",
    paddingLeft: "8px",
    marginBottom: "1rem",
    backgroundColor: "#fff",
  },
  textBox: {
    margin: "10",
    fontSize: "16px",
    fontFamily: "Academia",
    height: "20rem",
    border: "solid 1px #ddd",
    borderRadius: "3px",
    paddingTop: "4px",
    paddingLeft: "8px",
    marginBottom: "1rem",
  },
  toolbar: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "#f4f4f4",
    height: "30px",
    border: "solid 1px #ddd",
    borderRadius: "3px",
    alignContent: "center",
    marginBottom: "1rem",
  },
}));

const TextEditorPage = () => {
  const classes = useStyles();
  const history = useHistory();

  function format(command, value) {
    document.execCommand(command, false, value);
  }

  return (
    <Container style={{ marginTop: "5rem" }}>
      <div className={classes.contentBox}>
        <div
          id="title"
          contentEditable="true"
          className={classes.editableBox}
        ></div>

        <div className={classes.toolbar}>
          <ButtonGroup>
            <Button
              className="d-flex"
              variant="outline-secondary"
              onClick={() => format("bold")}
            >
              <FontAwesomeIcon icon="bold" size="sm" />
            </Button>
            <Button
              className="d-flex"
              variant="outline-secondary"
              onClick={() => format("italic")}
            >
              <FontAwesomeIcon icon="italic" size="sm" />
            </Button>
            <Button
              className="d-flex"
              variant="outline-secondary"
              onClick={() => format("insertunorderedlist")}
            >
              <FontAwesomeIcon icon="list" size="sm" />
            </Button>
            <Button
              className="d-flex"
              variant="outline-secondary"
              // onClick={setUrl()}
            >
              <FontAwesomeIcon icon="link" size="sm" />
            </Button>
          </ButtonGroup>
        </div>

        <div
          id="editor"
          contentEditable="true"
          className={classes.textBox}
        ></div>
        <div
          id="tags"
          contentEditable="true"
          style={{
            margin: "10",
            fontSize: "16px",
            fontFamily: "Academia",
            border: "solid 1px #ddd",
            borderRadius: "3px",
          }}
          className="mb-3 tags"
        >
          #
        </div>
        <ButtonGroup className="d-flex">
          <Button
            variant="outline-light"
            style={{ backgroundColor: "#6a75a3" }}
          >
            Submit
          </Button>
          <Button variant="light" onClick={() => history.push(`/`)}>
            Cancel
          </Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default TextEditorPage;
