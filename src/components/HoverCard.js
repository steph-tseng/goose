import { makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#16384c",
  },
  container: {
    position: "relative",
    // width: "100vw",
    // height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    padding: "30px",
  },
  card: {
    position: "relative",
    maxWidth: "20rem",
    maxHeight: "14rem",
    background: "#fff",
    margin: "30px 10px",
    padding: "20px 15px",
    display: "flex",
    flexDirection: "column",
    boxShadow: "2px 2px 4px #1b1e21",
    transition: "0.3s ease-in-out",
    "&:hover": {
      content: {
        visibility: "visible",
        opacity: 1,
        marginTop: "-40px",
        transitionDelay: "0.3s",
      },
    },
  },
  imgBx: {
    position: "relative",
    width: "260px",
    height: "260px",
    top: "-60px",
    left: "20px",
    zIndex: 1,
    boxShadow: "2px 2px 4px #1b1e21",
  },
  img: {
    maxWidth: "100%",
    borderRadius: "4px",
  },
  content: {
    position: "relative",
    marginTop: "-140px",
    padding: "10px 15px",
    textAlign: "center",
    color: "#111",
    visibility: "hidden",
    opacity: 0,
    transition: "0.3s ease-in-out",
    "&:hover": {
      visibility: "visible",
      opacity: 1,
      marginTop: "-40px",
      transitionDelay: "0.3s",
    },
  },
}));

const HoverCard = ({ topic }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.card}>
          <div className={classes.imgBx}>
            <img className={classes.img} src="" alt="" />
          </div>
          <div className={classes.content}>
            <h2>{topic.title}</h2>
            <p>{topic.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HoverCard;
