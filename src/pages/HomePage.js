import React from "react";
import { Col, Container, Jumbotron, Row } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import TopicCard from "../components/TopicCard";

const HomePage = () => {
  const topicsList = [
    { id: "1", name: "cats" },
    { id: "2", name: "dogs" },
    { id: "3", name: "wittgenstein" },
    { id: "4", name: "wittgenstein" },
    { id: "5", name: "wittgenstein" },
    { id: "6", name: "wittgenstein" },
    { id: "7", name: "wittgenstein" },
    { id: "8", name: "wittgenstein" },
  ];
  const history = useHistory();

  const clickTopic = (topicId) => {
    history.push(`/topics/${topicId}`);
  };

  return (
    <Container
      className="text-center d-flex flex-column overflow-auto"
      // style={{ overflow: "scroll" }}
    >
      <Row>
        <Col sm={12}>
          <Jumbotron
            className=""
            style={{
              fontFamily: "Langar",
              fontSize: "40rem",
              boxShadow: "2px 2px 4px #1b1e21",
              borderRadius: "10px",
              backgroundColor: "#fff",
              marginTop: "4rem",
              // opacity: 0.7,
            }}
          >
            <h1>Goose</h1>
            {/* <h3>Peace was never an option</h3> */}
          </Jumbotron>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <SearchForm />
        </Col>
      </Row>
      <Row>
        <ul
          className="list-inline list-unstyled"
          // className="d-flex flex-wrap list-unstyled justify-content-center mt-5 justify-space-between"
        >
          {topicsList.map((topic) => {
            console.log(topic);
            return (
              <li
                className="list-inline-item mt-4"
                key={topic.id}
                onClick={() => clickTopic(topic.id)}
              >
                <TopicCard topic={topic} />
              </li>
            );
          })}
        </ul>
      </Row>
    </Container>
  );
};

export default HomePage;
