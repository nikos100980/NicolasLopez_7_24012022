import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { isEmpty } from "../Utils";
import Bulle from "../assets/icons/message1.svg";
import dayjs from "dayjs";
import LikeSystem from "./LikeSystem";
require("dayjs/locale/fr");
let relativeTime = require("dayjs/plugin/relativeTime");
dayjs.extend(relativeTime);

const Card = ({ message }) => {
  const [isLoading, setIsLoading] = useState(true);

  const users = useSelector((state) => state.usersReducer);

  useEffect(() => {
    !isEmpty(users[0]) && setIsLoading(false);
  }, [users]);

  return (
    <li className="card-container" key={message.id}>
      {isLoading ? (
        <i className="fas fa-spinner fa-spin"></i>
      ) : (
        <>
          <div className="card-left">
            <img
              src={
                !isEmpty(users[0]) &&
                users
                  .map((user) => {
                    if (user.id === message.userId) return user.picture;
                    else return null;
                  })
                  .join("")
              }
              alt="les utilisateurs"
            />
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
            <p>{message.content} </p>
            {message.imageUrl && (
              <img
                src={message.imageUrl}
                alt="illustration du message"
                className="card-pic"
              />
            )}
          </div>
          <div className="card-footer">
            <div className="comment-icon">
              <img src={Bulle} alt="logo des commentaires" />
              <span>{message.Comments.length}</span>
            </div>
            <LikeSystem message= {message} />
          </div>
        </>
      )}
    </li>
  );
};
export default Card;
