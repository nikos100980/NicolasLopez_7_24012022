import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, getComments } from "../../actions/comments.actions";

import DeleteComment from "./DeleteComment";

import dayjs from "dayjs";

require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const CardComments = ({ messageId, comments, userId }) => {
  const [content, setContent] = useState("");

  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const handleComment = (e) => {
    e.preventDefault();

    if (content) {
      dispatch(addComment(messageId, userId, content));
      setTimeout(() => {
        dispatch(getComments(messageId));
      }, 200);

      setContent("");
    } else {
      alert("Vous n'avez rien renseigné!");
    }
  };

  console.log(user.isAdmin);

  return (
    <div className="comments-container">
      <ul >
        {comments &&
          comments.length > 0 &&
          comments.map((comment) => {
            return (
              <div className="comment-container" >
                <div className="left-part" key={comment.id}>
                  {users.map((user) => {
                    if (user.id === comment.userId && user.picture) {
                      return <img src={user.picture} alt="user" key={user.id} />;
                    } else if (user.id === comment.id && !user.picture) {
                      return null;
                    } else {
                      return null;
                    }
                  })}
                </div>
                <div className="right-part">
                  <div className="comment-header">
                    <div className="pseudo">
                      {users.map((user) => {
                        if (user.id === comment.userId && user.firstName) {
                          return (
                            <h3>
                              {user.firstName} {user.lastName}
                            </h3>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </div>
                    <span>
                      {dayjs(comment.createdAt).locale("fr").fromNow()}
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
