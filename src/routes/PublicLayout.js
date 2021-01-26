import React from "react";
import { Switch, Route, useHistory } from "react-router-dom";
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
import ProjectsOfFollowingPage from "../pages/ProjectsOfFollowingPage";
import { IconButton, Tooltip } from "@material-ui/core";
import honk from "../images/circle-cropped.png";

// import PublicNavbar from "../components/PublicNavbar";
// import LoginPage from "../pages/LoginPage";
// import RegisterPage from "../pages/RegisterPage";

const PublicLayout = () => {
  const history = useHistory();
  const handleHonk = () => {
    // alert("honk honk");
    history.push("/admin/messages");
  };
  return (
    <>
      <PublicNavbar />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/topics/:topicId" component={TopicPage} />
        <Route exact path="/projects/:projectId" component={ProjectPage} />
        <Route exact path="/projects" component={ProjectListPage} />
        <PrivateRoute path="/evil" component={TextEditorPage} />
        <PrivateRoute path="/edittopic" component={AddEditTopicPage} />
        <PrivateRoute path="/editproject" component={AddEditProjectPage} />
        <PrivateRoute
          path="/following/projects"
          component={ProjectsOfFollowingPage}
        />
        <Route component={NotFoundPage} />
      </Switch>
      {/* <div
        style={{
          position: "sticky",
          left: 0,
          top: "85vh",
        }}
      >
        <Tooltip title="Honk Chat">
          <IconButton onClick={() => handleHonk()}>
            <img
              src={honk}
              alt="honk"
              style={{ height: "80px", width: "80px" }}
            />
          </IconButton>
        </Tooltip>
      </div> */}
    </>
  );
};

export default PublicLayout;
