import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";

const LoginPage = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(authActions.loginRequest(formData));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container
      className="pt-5 d-flex justify-content-center text-center "
      // eslint-disable-next-line no-restricted-globals
      style={{ marginTop: "5rem", color: "#fff" }}
    >
      <Row
        className="glass-effect"
        style={{ width: "350px", borderRadius: "20px" }}
      >
        <Col>
          <div
            style={{
              padding: 20,

              // backgroundColor: "#fff",
              // boxShadow: "2px 2px 4px #1b1e21",
            }}
          >
            <h2 className="mb-2" style={{ fontFamily: "Langar" }}>
              Login
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="password"
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="outline-light">
                Login
              </Button>
            </Form>
            <p className="mt-2">
              Don't have an account?{" "}
              <Link
                className="font-weight-bold"
                style={{ color: "#fff" }}
                to="/register"
              >
                Sign up
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
