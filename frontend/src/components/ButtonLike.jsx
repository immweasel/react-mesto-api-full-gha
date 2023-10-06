import { useEffect, useState } from "react";
import api from "../utils/Api";

function ButtonLike({ likes, myid, cardid }) {
  const [isLike, setIsLike] = useState(false);
  const [likeCount, setLikeCount] = useState(likes.length);

  useEffect(() => {
    setIsLike(likes.some((element) => myid === element));
  }, [likes, myid]);

  function handleLikeClick() {
    if (isLike) {
      api
        .unlikeCard(cardid)
        .then((res) => {
          setIsLike(false);
          setLikeCount(res.likes.length);
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    } else {
      api
        .likeCard(cardid)
        .then((res) => {
          setIsLike(true);
          setLikeCount(res.likes.length);
        })
        .catch((err) => console.log(`Что-то пошло не так: ${err}`));
    }
  }

  return (
    <button
      type="button"
      className={`groups__like ${isLike ? "groups__like_active" : ""}`}
      onClick={handleLikeClick}
    >
      <p className="groups__like-counter">{likeCount}</p>
    </button>
  );
}

export default ButtonLike;

/*
setIsLike(likes.some((element) => myid === element._id));


*/