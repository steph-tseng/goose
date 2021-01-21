import { makeStyles } from "@material-ui/core";
import React from "react";
import Moment from "react-moment";
import ReactionMaterial from "./ReactionMaterial";

const useStyles = makeStyles((theme) => ({
  comment: {
    margin: theme.spacing(1),
  },
}));

const ReviewList = ({ reviews, handleEmojiClick, loading }) => {
  return (
    <>
      {reviews?.length > 0 && (
        <ul className="list-unstyled">
          {reviews.map((review) => (
            <ReviewContent
              key={review._id}
              review={review}
              handleEmojiClick={handleEmojiClick}
              loading={loading}
            />
          ))}
        </ul>
      )}
    </>
  );
};

const ReviewContent = ({ review, handleEmojiClick, loading }) => {
  const classes = useStyles();
  // console.log("review", review);
  return (
    <div className={classes.comment}>
      <hr />
      <span className="comment_body">{review?.content}</span>
      <br />
      <span className="comment_by">posted by </span>
      <span className="comment_author">{review?.user?.name}</span>
      <span className="comment_on"> on </span>
      <span className="comment_date">
        <Moment fromNow>{review?.createdAt}</Moment>
      </span>
      <ReactionMaterial
        reactionsData={review.reactions}
        targetType="Review"
        targetId={review._id}
        handleEmojiClick={handleEmojiClick}
        loading={loading}
        size="xs"
      />
    </div>
  );
};

export default ReviewList;
