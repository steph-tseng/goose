import React from "react";
import { Switch, Route } from "react-router-dom";
import NotFoundPage from "../pages/NotFoundPage";
import HomePage from "../pages/HomePage";
import TopicPage from "../pages/TopicPage";
import TextEditorPage from "../pages/TextEditorPage";
import ProjectPage from "../pages/ProjectPage";
import PublicNavbar from "../components/PublicNavbar";
import PrivateRoute from "./PrivateRoute";
import AddEditTopicPage from "../pages/AddEditTopicPage";
import AddEditProjectPage from "../pages/AddEditProjectPage";
import ProjectListPage from "../pages/ProjectListPage";

// import PublicNavbar from "../components/PublicNavbar";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";

const PublicLayout = () => {
  return (
    <>
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/topics/:topicId" component={TopicPage} />
        <Route exact path="/topics/:id/:projectId" component={ProjectPage} />
        <Route exact path="/projects" component={ProjectListPage} />
        <PrivateRoute path="/evil" component={TextEditorPage} />
        <PrivateRoute path="/edittopic" component={AddEditTopicPage} />
        <PrivateRoute path="/editproject" component={AddEditProjectPage} />
        <Route component={NotFoundPage} />
      </Switch>
    </>
  );
};

export default PublicLayout;
