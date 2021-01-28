import React, { useEffect, useLayoutEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import AlertMsg from "./components/AlertMsg";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useHistory } from "react-router-dom";
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
// import MessengerCustomerChat from "react-messenger-customer-chat";
import { IconButton, makeStyles, Tooltip } from "@material-ui/core";
import honk from "../src/images/circle-cropped.png";

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

const useStyles = makeStyles((theme) => ({
  btn: {
    "& .Mui-selected": {
      border: "0",
    },
  },
}));

const App = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  // const classes = useStyles();
  const loading = useSelector((state) => state.auth.loading);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [value, setValue] = useState(null);

  useLayoutEffect(() => {
    if (!value) setValue(0);
  }, [value]);

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
        <>
          {loading ? (
            <img
              src="https://i.imgur.com/LyTz4RO.gif"
              alt="Dancing goose"
              style={{ height: "100vh", overflow: "hidden" }}
            />
          ) : (
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
        </>
      )}
    </>
  );
};

export default App;
