import { makeStyles } from "@material-ui/core";
import React from "react";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    display: "flex",
    width: "90%",
    marginBottom: theme.spacing(3),
    // justifyContent: "space-around",
  },
  card: {
    width: "20rem",
    height: "14rem",
    borderRadius: "15px",
    padding: "1.5rem",
    background: "#fff",
    position: "relative",
    display: "flex",
    alignItems: "flex-end",
    transition: "0.4s ease-out",
    boxShadow: "0px 7px 10px rgba(black, 0.5)",
    "&:hover": {
      transform: "translateY(20px)",
      // backgroundColor: "rgba(0,0,0)",
      "&:before": {
        opacity: 1,
      },
      info: {
        opacity: 1,
        transform: "translateY(0px)",
      },
    },
    "&:before": {
      content: "",
      position: "absolute",
      top: 0,
      left: 0,
      display: "block",
      width: "100%",
      height: "100%",
      borderRadius: "15px",
      background: "rgba(0, 0, 0, 0.6)",
      zIndex: 2,
      transition: "0.5s",
      opacity: 0,
    },
  },

  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    position: "absolute",
    top: 0,
    left: 0,
    borderRadius: "15px",
    // opacity: 0.8,
  },

  info: {
    position: "relative",
    zIndex: 3,
    color: "white",
    opacity: 0,
    transform: "translateY(30px)",
    transition: "0.5s",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",

    "&:hover": {
      opacity: 1,
    },
  },
}));

const TopicCard2 = ({ topic }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <div className="card-class" style={{ borderRadius: "15px" }}>
        <img
          className={classes.img}
          src={
            topic.image
              ? topic.image
              : "https://www.allaboutbirds.org/guide/assets/photo/59953131-480px.jpg"
          }
          alt="mountain"
        />
        <div className={clsx(classes.info, "info")}>
          <h1>
            <strong>{topic.title}</strong>
          </h1>
          <p>{topic.description}</p>
          {/* <button>Read more</button> */}
        </div>
      </div>
    </div>
  );
};

export default TopicCard2;
