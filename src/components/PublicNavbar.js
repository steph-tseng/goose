import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
// import logo from "../images/cangoose.png";
import gooseLogo from "../images/gooseicon.png";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import authActions from "../redux/actions/auth.actions";
import topicActions from "../redux/actions/topic.actions";
import projectActions from "../redux/actions/project.actions";
import { Button, makeStyles, Menu, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  btn: {
    fontFamily: "Langar",
    fontSize: "20px",
    padding: 0,
  },
}));

const PublicNavbar = () => {
  const classes = useStyles();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(authActions.logout());
  };

  const addTopic = () => {
    handleClose();
    dispatch(topicActions.cancelSelected());
    history.push(`/edittopic`);
  };

  const addProject = () => {
    handleClose();
    dispatch(projectActions.cancelSelected());
    history.push(`/editproject`);
  };

  const authLinks = (
    <Nav>
      <Nav.Link as={Link} to="/admin/profile">
        <FontAwesomeIcon icon="chart-line" size="sm" /> Profile
      </Nav.Link>
      <Nav.Link as={Link} onClick={handleLogout}>
        <FontAwesomeIcon icon="sign-out-alt" size="sm" /> Logout
      </Nav.Link>
    </Nav>
  );

  const publicLinks = (
    <Nav>
      <Nav.Link as={Link} to="/register">
        <FontAwesomeIcon icon="registered" size="sm" /> Register
      </Nav.Link>
      <Nav.Link as={Link} to="/login">
        <FontAwesomeIcon icon="sign-in-alt" size="sm" /> Login
      </Nav.Link>
    </Nav>
  );

  return (
    <Navbar
      expand="lg"
      variant="dark"
      fixed="top"
      style={{
        minHeight: "64px",
        fontFamily: "Langar",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        position: "fixed",
        fontSize: "20px",
        top: 0,
        right: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Nav className="d-flex flex-row justify-content-start mr-auto navbar-dark">
        <Navbar.Brand as={Link} to="/" className="">
          <img src={gooseLogo} alt="Gooes" height="30px" />
        </Navbar.Brand>
        {isAuthenticated && (
          <Nav.Link as={Link} to="/following/projects">
            Projects
          </Nav.Link>
        )}
        <Nav.Link as={Link} to="/" className="ml-3 mr-2">
          All Topics
        </Nav.Link>
        <Nav.Link as={Link} to="/projects" className="mr-2">
          All Projects
        </Nav.Link>
        <Nav.Link>
          {isAuthenticated && (
            <>
              <Button
                aria-controls="simple-menu"
                aria-haspopup="true"
                onClick={handleClick}
                classes={{ root: classes.btn }}
              >
                <Nav.Link style={{ padding: 0 }}>Add new</Nav.Link>
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={addTopic}>Topic</MenuItem>
                <MenuItem onClick={addProject}>Project</MenuItem>
              </Menu>
            </>
          )}
        </Nav.Link>
        {/* <Nav.Link as={Link} to="/tags">
          All Tags
        </Nav.Link> */}
      </Nav>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto"></Nav>
        {!loading && <>{isAuthenticated ? authLinks : publicLinks}</>}
      </Navbar.Collapse>
    </Navbar>
  );
};

export default PublicNavbar;
