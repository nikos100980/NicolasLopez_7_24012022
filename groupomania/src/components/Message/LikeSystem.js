import React, { useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { likeMessage } from '../../actions/messages.actions';

import { UidContext } from '../AppContext';
import Love from '../assets/icons/icons8-like-24.png';

const LikeSystem = ({message} ) => {
const [liked,setLiked]=useState(false);
const uid=useContext((UidContext));
const dispatch = useDispatch();

const like = () =>{
    dispatch(likeMessage(message.id, uid))
    setLiked(true);
};


useEffect(()=>{
if(message.Likes.includes(uid))setLiked(true)
},[uid, message.Likes, liked]
)

    return (
        <div className='like-container'>
            {uid && liked === false && (
                <img src={Love} alt='logo like' onClick={like} />
            )}
           
        </div>
    );
};

export default LikeSystem;