import React from "react";
import moment from "moment";
import ProfileFakeImg from "../../assets/images/pro-8.png";
import "./_SingleComment.scss";

const SingleComment = ({ comment }) => {
  const { authorDisplayName, authorProfileImageUrl, publishedAt, textDisplay } =
    comment;
  return (
    <div className="comment p-2 d-flex">
      <img
        src={authorProfileImageUrl || ProfileFakeImg}
        alt="profile-img"
        className="rounded-circle mr-3"
      />

      <div className="comment__body">
        <p className="comment__header mb-1">
          {authorDisplayName} {moment(publishedAt).fromNow()}
        </p>

        <p className="mb-0">{textDisplay}</p>
      </div>
    </div>
  );
};

export default SingleComment;
