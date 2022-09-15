import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, timestampParser } from "../Utils";
import { NavLink } from "react-router-dom";
import { addMessages, getMessages } from "../../actions/messages.actions";
import Picture from "../../components/assets/icons/picture.svg";

const NewMessage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState("");

  const [messageUrl, setMessageUrl] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userReducer);

  const handlePost = async () => {
    if (content && messageUrl) {
      const data = new FormData();
      data.append("content", content);

      data.append("userId", user.id);
      data.append("image", messageUrl);

      await dispatch(addMessages(data));

      dispatch(getMessages());
      cancelPost();
    } else {
      alert("Veuillez entrer un message et une image. Merci");
    }
  };

  const cancelPost = () => {
    setContent("");
    setMessageUrl("");
  };

  useEffect(() => {
    if (!isEmpty(user)) setIsLoading(false);
  }, [user, content, messageUrl]);

  return (
    <div className="post-container">
      {isLoading ? (
        <i className="fas fa-spinner fa-pulse"></i>
      ) : (
        <>
          <NavLink to="/profil">
            <div className="user-info">
              <img src={user.picture} alt="userpix" />
            </div>
          </NavLink>
          <div className="post-form">
            <textarea
              name="content"
              placeholder="Quoi de  neuf ?"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
            {content || messageUrl ? (
              <li className="card-container">
                <div className="card-left">
                  <img src={user.picture} alt="userpix" />
                </div>

                <div className="card-right">
                  <div className="card-header">
                    <div className="pseudo">
                      <h3>{user.firstname}</h3>
                    </div>
                  </div>
                  <span>{timestampParser(Date.now())}</span>
                </div>
                <div className="content">
                  <p>{content}</p>
                </div>
              </li>
            ) : null}
            <div className="footer-form">
              <div className="icon">
                {isEmpty(messageUrl) && (
                  <>
                    <img  src={Picture} alt="img" />
                    <input
                      type="file"
                      id="file"
                      name="file"
                      accept=".jpg, .jpeg, .png .gifs"
                      onChange={(e) => setMessageUrl(e.target.files[0])}
                    />
                  </>
                )}
                {messageUrl && (
                  <button
                    className="btn-input"
                    onClick={() => setMessageUrl("")}
                  >
                    Supprimer photo
                  </button>
                )}
              </div>
              <div className="btn-send">
                {content || messageUrl ? (
                  <button className="cancel" onClick={cancelPost}>
                    {" "}
                    Annuler message{" "}
                  </button>
                ) : null}
                <button className="send" onClick={handlePost}>
                  Envoyez
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NewMessage;
