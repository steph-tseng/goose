import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Button, Col, Form } from "react-bootstrap";

const SearchForm = ({
  loading,
  searchInput,
  handleSearchChange,
  handleSubmit,
}) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Row>
        <Col>
          <Form.Control
            placeholder="Search..."
            value={searchInput}
            onChange={handleSearchChange}
            style={{
              boxShadow: "2px 2px 4px #1b1e21",
              borderRadius: "10px",
              opacity: 0.6,
              // backgroundColor: "#fff",
            }}
          />
        </Col>
        {loading ? (
          <Button disabled>
            <span
              className="spinner-border spinner-border-sm"
              role="status"
              aria-hidden="true"
            ></span>
            Searching..
          </Button>
        ) : (
          <Button
            variant="outline-light"
            type="submit"
            style={{
              boxShadow: "2px 2px 4px #1b1e21",
              borderRadius: "10px",
            }}
          >
            <FontAwesomeIcon icon="search" size="sm" />
          </Button>
        )}
      </Form.Row>
    </Form>
  );
};

export default SearchForm;
