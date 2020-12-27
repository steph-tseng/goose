import React from "react";
import { Container } from "react-bootstrap";

const TopicPage = () => {
  return (
    <Container style={{ marginTop: "4rem" }} className="d-flex flex-column">
      <div
        style={{ height: "80px", width: "100%", backgroundColor: "#fff" }}
        className="text-center align-content-center box-shadow"
      >
        <h1 className="pt-2 mt-1">Topic Name</h1>
      </div>
    </Container>
  );
};

export default TopicPage;
