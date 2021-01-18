import { IconButton } from "@material-ui/core";
import {
  EmojiEmotions,
  Favorite,
  Help,
  PriorityHigh,
  ThumbDown,
  ThumbUp,
} from "@material-ui/icons";
import React from "react";

const ReactionMaterial = ({
  reactionsData,
  targetType,
  targetId,
  handleEmojiClick,
  loading,
  // size,
}) => {
  return (
    <ul className="list-unstyled">
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "love")}
          disabled={loading}
        >
          <Favorite />
        </IconButton>
        {reactionsData?.love}
      </li>
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "thumbup")}
          disabled={loading}
        >
          <ThumbUp />
        </IconButton>
        {reactionsData?.thumbup}
      </li>
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "thumbdown")}
          disabled={loading}
        >
          <ThumbDown />
        </IconButton>
        {reactionsData?.thumbdown}
      </li>
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "laugh")}
          disabled={loading}
        >
          <EmojiEmotions />
        </IconButton>
        {reactionsData?.laugh}
      </li>
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "emphasize")}
          disabled={loading}
        >
          <PriorityHigh />
        </IconButton>
        {reactionsData?.emphasize}
      </li>
      <li>
        <IconButton
          onClick={() => handleEmojiClick(targetType, targetId, "question")}
          disabled={loading}
        >
          <Help />
        </IconButton>
        {reactionsData?.question}
      </li>
    </ul>
  );
};

export default ReactionMaterial;
