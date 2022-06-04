import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comments.actions";

import DeleteComment from "./DeleteComment";
import dayjs from "dayjs";
require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const CardComments = ({ comments, messageId, userId }) => {
  const [content, setContent] = useState("");
  const [loadComment, setLoadComment] = useState(false);
  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (content) {
      dispatch(addComment(messageId, userId, content))
        .then(() => dispatch(getComments()))
        .then(() => setContent(""));
    }
  };

  useEffect(() => {
    if (loadComment) dispatch(getComments()).then(() => setLoadComment(true));
  }, [dispatch, loadComment]);

  //   console.log(user.isAdmin);

  return (
    <div className="comments-container">
      {loadComment && <i className="fas fa-spinner fa-spin"></i>}
      <ul>
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div className="comment-container">
                <div className="left-part">
                  {users.map((user) => {
                    if (user.id === comment.userId && user.picture) {
                      return (
                        <img
                          src={user.picture}
                          alt="user"
                           key={"id" + comment.id}
                        />
                      );
                    } else if (user.id === comment.userId && !user.picture) {
                      return null;
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className="right-part">
                  <div className="comment-header ">
                    <div className="pseudo">
                      {users.map((user) => {
                        if (user.id === comment.userId && user.firstname) {
                          return (
                            <h3>
                              {user.firstname} {user.lastname}
                            </h3>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <span>
                      {dayjs().locale("fr").to(dayjs(comment.createdAt))}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>

                {(user.isAdmin || user.id === comment.userId) && (
                  <div className="button-container">
                    <DeleteComment id={comment.id} messageId={messageId} />
                  </div>
                )}
              </div>
            );
          })}
        {user.id && (
          <form action="" onSubmit={handleComment} className="comment-form">
            <input
              type="text"
              name="content"
              onChange={(e) => setContent(e.target.value)}
              value={content}
              placeholder="Laisser un commentaire"
            />
            <br />
            <input type="submit" value="Envoyer" />
          </form>
        )}{" "}
      </ul>
    </div>
  );
};

export default CardComments;
