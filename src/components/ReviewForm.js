import React from "react";
import TextField from "@material-ui/core/TextField";
import { Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    // marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: "100%",
    // flexGrow: 1,
  },
  btn: {
    // marginLeft: theme.spacing(1),
    backgroundColor: "#6a75a3",
    // color: "#6a75a3",
    color: "#fff",
    "&:hover": { backgroundColor: "#8b97cc" },
    // paddingLeft: "10vw",
    // paddingRight: "10vw",
  },
}));

const ReviewForm = ({
  reviewText,
  handleInputChange,
  handleSubmitReview,
  loading,
}) => {
  const classes = useStyles();
  return (
    <form className={classes.root} onSubmit={handleSubmitReview}>
      <TextField
        id="review"
        type="text"
        variant="outlined"
        className={classes.textField}
        value={reviewText}
        onChange={handleInputChange}
      />
      {loading ? (
        <Button variant="contained" className={classes.btn} disabled>
          <span
            className="spinner-border spinner-border-sm"
            role="status"
            aria-hidden="true"
          ></span>
          Submitting...
        </Button>
      ) : (
        <Button
          variant="contained"
          className={classes.btn}
          // disabled={!reviewText}
        >
          Submit
        </Button>
      )}
    </form>
  );
};

export default ReviewForm;
