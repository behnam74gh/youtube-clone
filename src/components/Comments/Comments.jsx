import React, { useEffect, useState } from "react";
import SingleComment from "./SingleComment";
import ProfileFakeImg from "../../assets/images/pro-8.png";
import "./_Comments.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  getCommentsOfVideoById,
} from "../../redux/actions/comments.action";

const Comments = ({ videoId, totalComments }) => {
  const [textComment, setTextComment] = useState("");
  const { comments } = useSelector((state) => state.commentList);
  const { photoUrl } = useSelector((state) => state.userLogin?.user);
  const dispatch = useDispatch();

  const _comments = comments?.map(
    (comment) => comment.snippet.topLevelComment.snippet
  );

  const addCommentHandler = (e) => {
    e.preventDefault();

    if (textComment.length < 3) {
      return;
    }
    dispatch(addComment(videoId, textComment));
    setTextComment("");
  };

  useEffect(() => {
    dispatch(getCommentsOfVideoById(videoId));
  }, [dispatch, videoId]);

  return (
    <div className="comments">
      <p>{totalComments} comments</p>
      <div className="comments__form">
        <img
          src={photoUrl || ProfileFakeImg}
          alt="profile-img"
          className="rounded-circle mr-3"
        />
        <form onSubmit={addCommentHandler} className="d-flex flex-grow-1">
          <input
            type="text"
            className="flex-grow-1"
            placeholder="Write a comment..."
            value={textComment}
            onChange={(e) => setTextComment(e.target.value)}
          />
          <button className="border-0 p-2">comment</button>
        </form>
      </div>

      <div className="comments__list">
        {_comments?.map((item, i) => (
          <SingleComment key={i} comment={item} />
        ))}
      </div>
    </div>
  );
};

export default Comments;
