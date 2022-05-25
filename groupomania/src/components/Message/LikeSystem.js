import React, { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { UidContext } from "../AppContext";
import Love from "../assets/icons/icons8-like-24.png";
import iLove from "../assets/icons/icons8-like-24 (2).png";

import { likeMessages, unLikeMessages } from "../../actions/messages.actions";

const LikeSystem = ({ message }) => {
  const [liked, setLiked] = useState(false);
  const uid = useContext(UidContext);
  const dispatch = useDispatch();

  const onLikes = () => {
    dispatch(likeMessages(message.id, uid));
    setLiked(true);
  };
  const unLikes = () => {
    dispatch(unLikeMessages(message.id, uid));
    setLiked(false);
  };

  useEffect(() => {
    if (message.Likes.includes(uid)) setLiked(true);
    else setLiked(false);
  }, [uid, message.Likes]);

  return (
    <>
    
      { liked === false && (<button className="like-container">
        <img src={Love} alt="logo like" onClick={onLikes} />
        <span>{message.Likes.length}</span>
        </button>
      )}
      {liked && (<button className="like-container">
         <img src={iLove} alt="logo like" onClick={unLikes} />

      <span>{message.Likes.length}</span>
    </button>
)}
    </>
  );
};

export default LikeSystem;
