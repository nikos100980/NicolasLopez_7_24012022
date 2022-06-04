import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteCard from "./DeleteCard";
import Edit from "../assets/icons/icons8-modifier-16.png";

import Bulle from "../assets/icons/message1.svg";

import LikeSystem from "./LikeSystem";
import { updateMessages } from "../../actions/messages.actions";
import CardComments from "./CardComments";
import { getComments } from "../../actions/comments.actions";
import dayjs from "dayjs";
require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({ message }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const dispatch = useDispatch();
  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);

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
    <li className="card-container" >
      <div className="card-left">
        {users.map((user) => {
          if (user.id === message.userId && user.picture) {
            return <img src={user.picture} alt="user" />;
          } else if (user.id === message.userId && !user.picture) {
            return null;
          } else {
            return null;
          }
        })}
      </div>
      <div className="card-right">
        <div className="card-header">
          <div className="pseudo">
            {users.map((user) => {
              if (user.id === message.userId) {
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
            <span>Votre commentaire</span>
          </div>
          <LikeSystem message={message} />
        </div>
        {showComments && (
          <CardComments
            comments={message.Comments}
            messageId={message.id}
            userId={user.id}
          />
        )}
        
      </div>
    </li>
  );
};
export default Card;
