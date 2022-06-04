import React from "react";
import { useDispatch } from "react-redux";
import { deleteMessage } from "../../actions/messages.actions";
import Trash from "../assets/icons/icons8-effacer-16.png";

const DeleteCard = (props) => {
  const dispatch = useDispatch();
  const deleteQuote = () => dispatch(deleteMessage(props.id));
  return (
    <div
      onClick={() => {
        if (window.confirm("Voulez-vous supprimer votre article ? ")) {
          deleteQuote();
        }
      }}
    >
      <img src={Trash} alt="trash" />
    </div>
  );
};

export default DeleteCard;
