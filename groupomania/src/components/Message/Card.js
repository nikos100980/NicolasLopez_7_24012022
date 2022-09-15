import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import DeleteCard from "./DeleteCard";
import Edit from "../assets/icons/icons8-modifier-16.png";
import Picture from "../../components/assets/icons/picture.svg";
import Bulle from "../assets/icons/message1.svg";
import { getComments } from "../../actions/comments.actions";
import LikeSystem from "./LikeSystem";
import { getMessages, updateMessages } from "../../actions/messages.actions";
import CardComments from "./CardComments";

import dayjs from "dayjs";

require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({ message }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [textUpdate, setTextUpdate] = useState(null);
  const [showComments, setShowComments] = useState(false);
  const [fileUpdate, setFileUpdate] = useState(null);

  const users = useSelector((state) => state.usersReducer);
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (showComments) {
      dispatch(getComments(message.id));
    }
  }, [showComments, message.id, dispatch]);

  const updateItem = async () => {
    if (textUpdate || fileUpdate) {
      const data = new FormData();
      data.append("messageId", message.id);
      if (textUpdate) data.append("content", textUpdate);
      if (fileUpdate) data.append("image", fileUpdate);

      await dispatch(updateMessages(message.id, data));
      dispatch(getMessages(message.id));
    }

    setIsUpdated(false);
  };
  const handlePicture = (e) => {
    setFileUpdate(e.target.files[0]);
  };
  return (
    <li className="card-container" key={message.id}>
      <div className="card-left">
        {users.map((user) => {
          if (user.id === message.userId && user.picture) {
            return <img src={user.picture} alt="user" key={user.id} />;
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
                  <h3 key={user.id}>
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

        {isUpdated === false && (
          <>
            <p>{message.content}</p>
            <img
              className="card-pic"
              src={message.imageUrl}
              alt="illustration du message"
              key={"messageImage" + user.id}
            />
          </>
        )}
        {isUpdated && (
          <div className="update-post">
            <textarea
              defaultValue={message.content}
              onChange={(e) => setTextUpdate(e.target.value)}
            />
            <div className="icon-update">
              <img className="icon-update-img" src={Picture} alt="img" />
              <input
                className="input-update-form"
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png .gifs"
                onChange={(e) => handlePicture(e)}
              />
            </div>
            <div className="button-container" onClick={updateItem}>
              <button className="btn">Valider les modifications</button>
            </div>
          </div>
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
          <LikeSystem message={message} />
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
