import React, { useContext, useEffect, useState } from "react";
import { UidContext } from "../AppContext";
import axios from "axios";
import iLove from "../assets/icons/icons8-like-24 (2).png";
import Love from "../assets/icons/icons8-like-24.png";

const LikeSystem = ({ message }) => {
  const uid = useContext(UidContext);
  const [likeCounter, setLikeCounter] = useState("");
  const userId = uid;
  const messageId = message.id;
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const likeNumber = async () => {
      await axios({
        method: "get",
        url: `${process.env.REACT_APP_API_URL}api/likes/${message.id}`,

        withCredentials: true,
      }).then((res) => {
        setLikeCounter(res.data.like);
        console.log(res.data.like);
      });
    };

    likeNumber();
  }, [isLoaded, message.id]);

  const likePost = async (e) => {
    e.preventDefault();

    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/messages/likes`,
      data: { userId, messageId },
      withCredentials: true,
    }).then(() => {
      const likemap = message.Likes.map((value) => {
        return value.userId;
      });
      console.log(likemap);
      if (isLoaded) {
        setIsLoaded(false);
      } else {
        setIsLoaded(true);
      }
    });
  };

  return (
    <div className="like-container">
      {isLoaded === false && (
        <img src={Love} alt="logo like" onClick={likePost} />
      )}
      {isLoaded && <img src={iLove} alt="logo like" onClick={likePost} />}
      <span>{likeCounter}</span>
    </div>
  );
};

export default LikeSystem;
