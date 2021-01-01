import React from "react";
import { Card } from "react-bootstrap";

const TopicCard = ({ topic, clickTopic }) => {
  return (
    <Card
      style={{
        width: "18rem",
        fontFamily: "Academia",
        boxShadow: "2px 2px 4px #1b1e21",
        borderRadius: "10px",
        backgroundColor: "#fff",
      }}
      className="mr-4 ml-4 cardclass"
    >
      {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
      <Card.Body style={{ borderRadius: "10px" }}>
        <Card.Title>{topic.title}</Card.Title>
        <Card.Text>{topic.description}</Card.Text>
        {/* <Button variant="info">See projects</Button> */}
      </Card.Body>
    </Card>
  );
};

export default TopicCard;
