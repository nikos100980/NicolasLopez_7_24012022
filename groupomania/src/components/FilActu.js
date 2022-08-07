import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getMessages } from "../actions/messages.actions";
import Card from "./Message/Card";

const FilActu = () => {
  const [loadMessage, setLoadMessage] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (loadMessage) {
      dispatch(getMessages());

      setLoadMessage(false);
    }
  }, [dispatch, loadMessage]);

  return (
    <div className="thread-container">
      {loadMessage && <i className="fas fa-spinner fa-spin"></i>}
      <ul>
        {messages.length > 0 &&
          messages.map((message) => {
            return <Card message={message} key={message.id} />;
          })}
      </ul>
    </div>
  );
};

export default FilActu;
