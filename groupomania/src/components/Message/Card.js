import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteCard from "./DeleteCard";
import Edit from "../assets/icons/icons8-modifier-16.png";

import Bulle from "../assets/icons/message1.svg";
import { getComments } from "../../actions/comments.actions";
import LikeSystem from "./LikeSystem";
import { updateMessages } from "../../actions/messages.actions";
import CardComments from "./CardComments";

import dayjs from "dayjs";

require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({ message }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);

  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showComments) {
      dispatch(getComments(message.id));
    }
  }, [showComments, message.id, dispatch]);

  const updateItem = () => {
    if (textUpdate) {
      dispatch(updateMessages(message.id, textUpdate));
    }
    setIsUpdated(false);
  };

  return (
    <li className="card-container" key={message.id}>
      <div className="card-left">
        {users.map((user) => {
          if (user.id === message.userId && user.picture) {
            return (
              <img src={user.picture} alt="user" key={"id" + message.id} />
            );
          } else if (user.id === message.userId && !user.picture) {
            return null;
          } else {
            return null;
          }
        })}
      </div>
      <div className="card-right">
        <div className="card-header" >
          <div className="pseudo">
            {users.map((user) => {
              if (user.id === message.userId) {
                return (
                  <h3 >
                    {user.firstName} {user.lastName}
                  </h3>
                );
              } else {
                return null;
              }
            })}
          </div>
          <span>{dayjs().locale("fr").to(dayjs(message.createdAt))} </span>
        </div>

        {isUpdated === false && <p>{message.content}</p>}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={message.content}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="button-container" onClick={updateItem}>
              <button className="btn">Valider les modifications</button>
            </div>
          </div>
        )}
        {message.imageUrl && (
          <img
            src={message.imageUrl}
            alt="illustration du message"
            key={"messageImage" + user.id}
            className="card-pic"
          />
        )}
        {(user.isAdmin || user.id === message.userId) && (
          <div className="button-container">
            <div onClick={() => setIsUpdated(!isUpdated)}>
              <img src={Edit} alt="edit" />
            </div>
            <DeleteCard id={message.id} />
          </div>
        )}
        <div className="card-footer">
          <div className="comment-icon">
            <img
              onClick={() => setShowComments(!showComments)}
              src={Bulle}
              alt="logo des commentaires"
            />
            <span>commentaires</span>
          </div>
          <LikeSystem message={message}  />
        </div>
        {showComments && (
          <CardComments
            comments={message.comments}
            messageId={message.id}
            userId={user.id}
          />
        )}
      </div>
    </li>
  );
};
export default Card;
