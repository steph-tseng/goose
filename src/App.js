import React, { useEffect } from "react";
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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/auth.actions";
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
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken !== "undefined") {
      dispatch(authActions.getCurrentUser(accessToken));
    } else {
      dispatch(authActions.logout());
    }
  }, [dispatch]);

  return (
    <>
      {isAuthenticated !== null && (
        <Router>
          <AlertMsg />
          <Switch>
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route path="/" component={PublicLayout} />
            <PrivateRoute path="/admin" component={AdminLayout} />
          </Switch>
        </Router>
      )}
    </>
  );
};

export default App;
