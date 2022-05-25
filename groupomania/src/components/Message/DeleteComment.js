import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment } from "../../actions/comments.actions";
import Trash from '../assets/icons/icons8-effacer-16.png';

const DeleteComment = (props) => {
    const dispatch = useDispatch();
    const deleteQuote = () => {dispatch(deleteComment(props.id, props.messageId))
    }

  
    return (
        <div onClick={() => {
            if (window.confirm('Voulez-vous supprimer votre commentaire ? ')) {
                deleteQuote()
                
            }
        }}
        >
            <img src={Trash} alt="trash" />
        </div>
    );
};

export default DeleteComment;