import React from "react";
import { Container } from "react-bootstrap";
import { Switch, Route } from "react-router-dom";
import AlertMsg from "../components/AlertMsg";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import PublicNavbar from "../components/PublicNavbar";
import RegisterPage from "../pages/RegisterPage";
import TopicPage from "../pages/TopicPage";
import TextEditorPage from "../pages/TextEditorPage";
import ProjectPage from "../pages/ProjectPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Container>
        <AlertMsg />
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/topics/:topicId" component={TopicPage} />
          <Route exact path="/topics/:id/:projectId" component={ProjectPage} />
          <Route path="/edit" component={TextEditorPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Container>
    </>
  );
};

export default PublicLayout;
