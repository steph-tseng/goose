import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avartarURL: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { password, password2 } = formData;
    if (password !== password2) {
      toast.error("Passwords do not match");
    }
    dispatch(authActions.registerAccount(formData));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  return (
    <Container
      className="pt-5 d-flex justify-content-center text-center"
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
              borderRadius: "20px",
              // backgroundColor: "#fff",
              // boxShadow: "2px 2px 4px #1b1e21",
            }}
            // className="p-4"
          >
            <h2 className="mb-2" style={{ fontFamily: "Langar" }}>
              Register
            </h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Control
                  placeholder="Your Avatar URL"
                  value={formData.avartarURL}
                  name="avartarURL"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Your Name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Control
                  placeholder="Confirm your password"
                  name="password2"
                  value={formData.password2}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button type="submit" variant="outline-light">
                Register
              </Button>
            </Form>
            <p className="mt-2">
              Already have an account?{" "}
              <Link
                className="font-weight-bold"
                style={{ color: "#fff" }}
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
