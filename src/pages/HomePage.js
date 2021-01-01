import React, { useEffect, useState } from "react";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Dropdown,
  DropdownButton,
  Jumbotron,
  Row,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import TopicCard from "../components/TopicCard";
import topicActions from "../redux/actions/topic.actions";
import Pagination from "@material-ui/lab/Pagination";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
    },
    "& .MuiPaginationItem-outlined": {
      border: "1px solid #fff",
      borderRadius: "10px",
      color: "#fff",
      boxShadow: "2px 2px 4px #1b1e21",
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

  return (
    <>
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
                boxShadow: "2px 2px 4px #1b1e21",
                borderRadius: "10px",
                // backgroundColor: "#fff",
                marginTop: "5rem",
                opacity: 0.99,
              }}
            >
              <h1 style={{ fontSize: "4rem" }}>Goose</h1>
              {isAuthenticated === true && (
                <DropdownButton
                  as={ButtonGroup}
                  variant="outline-dark"
                  title="Create new"
                  id="bg-nested-dropdown"
                >
                  <Dropdown.Item
                    as={Button}
                    variant="outline-dark"
                    eventKey="1"
                    onClick={() => history.push(`/edittopic`)}
                  >
                    Topic
                  </Dropdown.Item>
                  <Dropdown.Item
                    as={Button}
                    variant="outline-dark"
                    eventKey="2"
                    onClick={() => history.push(`/editproject`)}
                  >
                    Project
                  </Dropdown.Item>
                </DropdownButton>
              )}
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
            {topics.map((topic) => {
              // console.log(topic);
              return (
                <li
                  className="list-inline-item mt-4"
                  key={topic._id}
                  onClick={() => clickTopic(topic._id)}
                >
                  <TopicCard topic={topic} />
                </li>
              );
            })}
          </ul>
        </Row>
        <Row className="d-flex justify-content-center">
          <div
          // style={{
          //   backgroundColor: "#fff",
          //   opacity: 0.5,
          //   borderRadius: "10px",
          // }}
          >
            <Pagination
              count={totalPageNum}
              page={pageNum}
              variant="outlined"
              onChange={handlePageChange}
              shape="rounded"
              classes={{ root: classes.root }}
              size="large"
            />
          </div>
        </Row>
      </Container>
    </>
  );
};

export default HomePage;
