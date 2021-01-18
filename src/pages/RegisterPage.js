import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import authActions from "../redux/actions/auth.actions";
import routeActions from "../redux/actions/route.actions";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";

const FB_APP_ID = process.env.REACT_APP_FB_APP_ID;
const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    avatarURL: "",
  });
  const redirectTo = useSelector((state) => state.route.redirectTo);
  const dispatch = useDispatch();
  const history = useHistory();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("formdata", formData);
    const { password, password2 } = formData;
    if (password !== password2) {
      toast.error("Passwords do not match");
    }
    const { name, email, avatarURL } = formData;
    console.log({ name, email, avatarURL, password });
    dispatch(authActions.registerAccount({ name, email, password, avatarURL }));
  };

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  const loginWithFacebook = (response) => {
    // console.log(response);
    dispatch(authActions.loginFacebook(response.accessToken));
  };
  const loginWithGoogle = (response) => {
    dispatch(authActions.loginGoogle(response.accessToken));
  };

  if (isAuthenticated) return <Redirect to="/" />;
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
                  value={formData.avatarURL}
                  name="avatarURL"
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
            <div className="d-flex flex-column text-center">
              <FacebookLogin
                appId={FB_APP_ID}
                fields="name,email,picture"
                callback={loginWithFacebook}
                icon="fa-facebook"
                onFailure={(err) => console.log("FB LOGIN ERROR", err)}
                containerStyle={{
                  textAlign: "center",
                  backgroundColor: "#3b5998",
                  borderColor: "#3b5998",
                  flex: 1,
                  display: "flex",
                  color: "#fff",
                  cursor: "pointer",
                  marginBottom: "3px",
                }}
                buttonStyle={{
                  flex: 1,
                  textTransform: "none",
                  padding: "12px",
                  background: "none",
                  border: "none",
                }}
              />
              <GoogleLogin
                className="google-btn d-flex justify-content-center"
                clientId={GOOGLE_CLIENT_ID}
                buttonText="Login with Google"
                onSuccess={loginWithGoogle}
                onFailure={(err) => console.log("GOOGLE LOGIN ERROR", err)}
                cookiePolicy="single_host_origin"
              />
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default RegisterPage;
