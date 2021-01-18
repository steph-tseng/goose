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
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { useDispatch, useSelector } from "react-redux";
import authActions from "./redux/actions/auth.actions";
import NotFoundPage from "./pages/NotFoundPage";
import MessengerCustomerChat from "react-messenger-customer-chat";

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
  faLink,
  faAngry,
  faLaugh,
  faSadCry,
  faThumbsUp,
  faHeart
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
            <PrivateRoute path="/admin" component={AdminLayout} />
            <Route path="/" component={PublicLayout} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      )}
      <MessengerCustomerChat
        pageId="m.me/goosethefaketumblr"
        appId="244178857089279"
      />
    </>
  );
};

export default App;
