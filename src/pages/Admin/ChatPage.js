import {
  Grid,
  makeStyles,
  Paper,
  TextField,
  Typography,
} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-end",
  },
  paper1: {
    height: "75vh",
    width: "78vw",
    display: "flex",
    flexDirection: "column",
    borderRadius: "10px",
  },
  h1: {
    margin: theme.spacing(2),
  },
  paper: {
    height: "70vh",
    width: "78vw",
    display: "flex",
    alignItems: "flex-end",
    borderRadius: "10px",
  },
  textField: {
    // alignContent: "flex-end",
    flexGrow: 1,
  },
}));

const ChatPage = () => {
  const classes = useStyles();

  const children = (
    <>
      <Typography variant="h4" gutterBottom className={classes.h1}>
        Global Chatroom
      </Typography>

      <Paper className={classes.paper}>
        <hr />
        <TextField
          className={classes.textField}
          variant="outlined"
          placeholder="Type something..."
        />
      </Paper>
    </>
  );

  return (
    <Grid container className={classes.root}>
      <Grid item lg={15}>
        <Paper className={classes.paper1} children={children} />
      </Grid>
    </Grid>
  );
};

export default ChatPage;
