import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, ButtonGroup, Container } from "react-bootstrap";

const TextEditorPage = () => {
  // const [linking, setLinking] = useState(false);

  // document.addEventListener("keydown", function (e) {
  //   localStorage.setItem(
  //     `text_in_title`,
  //     document.getElementById(`title`).innerHTML
  //   );
  // });

  // if (
  //   localStorage.getItem("text_in_title") !== null &&
  //   document.getElementById(`title`)
  // ) {
  //   document.getElementById(`title`).innerHTML = localStorage.getItem(
  //     `text_in_title`
  //   );
  // }
  // document.addEventListener("keydown", function (e) {
  //   localStorage.setItem(
  //     `text_in_editor`,
  //     document.getElementById(`editor`).innerHTML
  //   );
  // });

  // if (
  //   localStorage.getItem("text_in_editor") !== null &&
  //   document.getElementById(`editor`)
  // ) {
  //   document.getElementById(`editor`).innerHTML = localStorage.getItem(
  //     `text_in_editor`
  //   );
  // }
  // console.log(localStorage.getItem(`text_in_editor`));

  function format(command, value) {
    document.execCommand(command, false, value);
  }

  // function setUrl() {
  //   setLinking(true);
  // }

  // useEffect(() => {
  //   if (linking === true) {
  //     var url = document?.getElementById("txtUrl")?.value;
  //     var sText = document.getSelection();

  //     document.execCommand(
  //       "insertHTML",
  //       false,
  //       '<a href="' + url + '" target="_blank">' + sText + "</a>"
  //     );
  //     //format('createlink', url);
  //   }
  // }, [linking]);

  return (
    <Container style={{ marginTop: "5rem" }}>
      <div
        style={{
          height: "100%",
          width: "70%",
          border: "solid",
          borderWidth: "1px",
          padding: "15px",
          borderRadius: "10px",
          backgroundColor: "#fff",
        }}
      >
        <div
          id="title"
          contentEditable="true"
          style={{
            margin: "10",
            fontSize: "24px",
            fontFamily: "Academia",
            border: "solid 1px #ddd",
            borderRadius: "3px",
            paddingLeft: "8px",
          }}
          className="mb-3"
        ></div>

        <div
          className="d-flex flex-grow align-content-center mb-3"
          style={{
            backgroundColor: "#f4f4f4",
            height: "30px",
            border: "solid 1px #ddd",
            borderRadius: "3px",
          }}
        >
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
          style={{
            margin: "10",
            fontSize: "16px",
            fontFamily: "Academia",
            height: "20rem",
            border: "solid 1px #ddd",
            borderRadius: "3px",
            paddingTop: "4px",
            paddingLeft: "8px",
          }}
          className="mb-3"
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
          <Button variant="info">Submit</Button>
          <Button variant="light">Cancel</Button>
        </ButtonGroup>
      </div>
    </Container>
  );
};

export default TextEditorPage;
