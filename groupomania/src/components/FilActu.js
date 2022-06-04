import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../actions/messages.actions";
import Card from "./Message/Card";
import { isEmpty } from "./Utils";

const FilActu = () => {
  const [loadMessage, setLoadMessage] = useState(true);
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.messageReducer);

  useEffect(() => {
    if (loadMessage) {
      dispatch(getMessages());
      setLoadMessage(false);
    }
  }, [loadMessage, dispatch]);

  return (
    <div className="thread-container">
      <ul>
        {!isEmpty(messages[0]) &&
          messages.map((message) => {
            return <Card message={message} key={message.id} />;
          })}
      </ul>
    </div>
  );
};

export default FilActu;
