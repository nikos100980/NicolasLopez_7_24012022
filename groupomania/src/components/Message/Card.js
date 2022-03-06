import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { isEmpty } from "../Utils";

const Card = ({ message }) => {
  const [isLoading, setIsLoading] = useState(false);

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
              alt="poster-pic"
            />
          </div>
        </>
      )}
    </li>
  );
};
export default Card;
