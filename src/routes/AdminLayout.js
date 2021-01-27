import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import MessageIcon from "@material-ui/icons/Message";
import { Link, Route, Switch, useHistory } from "react-router-dom";
import ProfilePage from "../pages/Admin/ProfilePage";
import { useDispatch } from "react-redux";
import authActions from "../redux/actions/auth.actions";
import ChatPage from "../pages/Admin/ChatPage";
import UpdateProfilePage from "../pages/Admin/UpdateProfilePage";
import UserListPage from "../pages/Admin/UserListPage";
import FollowingListPage from "../pages/Admin/FollowingListPage";
import { Group, GroupAdd } from "@material-ui/icons";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    fontSize: "20px",
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  link: {
    marginLeft: theme.spacing(2),
    fontFamily: "Langar",
    textDecoration: "none",
    color: "#bdbdbd",

    "&:hover": {
      textDecoration: "none",
      color: "#fff",
    },
  },
  align: {
    justifySelf: "end",
    textAlign: "right",
    alignSelf: "end",
    marginLeft: "70vw",
  },
}));

const AdminLayout = () => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap align="left">
            <Link to="/followig/projects" className={classes.link}>
              Projects
            </Link>
            <Link to="/" className={classes.link}>
              All Topics
            </Link>
            <Link to="/projects" className={classes.link}>
              All Projects
            </Link>
          </Typography>
          <Typography variant="h6" align="right">
            <Link
              href="#"
              className={clsx(classes.link, classes.align)}
              onClick={handleLogout}
            >
              Logout
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          {["Profile", "Messages", "Users", "Following"].map((text, index) => (
            <ListItem
              button
              key={text}
              onClick={() => history.push(`/admin/${text.toLowerCase()}`)}
            >
              <ListItemIcon>
                {index === 0 ? (
                  <AccountBoxIcon />
                ) : index === 1 ? (
                  <MessageIcon />
                ) : index === 2 ? (
                  <Group />
                ) : (
                  <GroupAdd />
                )}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <Switch>
          <Route exact path="/admin/profile" component={ProfilePage} />
          <Route exact path="/admin/messages" component={ChatPage} />
          <Route
            exact
            path="/admin/profile/edit"
            component={UpdateProfilePage}
          />
          <Route exact path="/admin/users" component={UserListPage} />
          <Route exact path="/admin/following" component={FollowingListPage} />
        </Switch>
      </main>
    </div>
  );
};

export default AdminLayout;
