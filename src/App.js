import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AlertMsg from "./components/AlertMsg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AdminLayout from "./routes/AdminLayout";
import PrivateRoute from "./routes/PrivateRoute";
import PublicLayout from "./routes/PublicLayout";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faComments,
  faClock,
  faSearch,
  faBold,
  faItalic,
  faListUl,
  faLink,
  faList,
} from "@fortawesome/free-solid-svg-icons";
library.add(
  faUser,
  faRegistered,
  faChartLine,
  faSignOutAlt,
  faSignInAlt,
  faComments,
  faClock,
  faSearch,
  faBold,
  faItalic,
  faListUl,
  faList,
  faLink
);

const App = () => {
  return (
    <Router>
      <AlertMsg />
      <Switch>
        <PrivateRoute path="/admin" component={AdminLayout} />
        <Route path="/" component={PublicLayout} />
      </Switch>
    </Router>
  );
};

export default App;
