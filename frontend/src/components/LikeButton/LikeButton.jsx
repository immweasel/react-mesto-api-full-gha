import { useState, useEffect } from "react";
import api from "../../utils/api";

export default function LikeButton({ likes, myId, cardId }) {

  const [isLike, setIsLike] = useState(false);
  const [count, setCount] = useState(likes.length);

  function handleLike() {
    if (isLike) {
      api.deleteLike(cardId)
        .then(res => {
          setIsLike(false);
          setCount(res.likes.length); 
        })
        .catch((err) => console.error(`Возникла какая-то ошибка: ${err}`));
  } else {
    api.addLike(cardId)
      .then(res => {
        setIsLike(true);
        setCount(res.likes.length);
      })
      .catch((err) => console.error(`Возникла какая-то ошибка: ${err}`))
  }
}

  useEffect(() => {
    setIsLike(likes.some(element => myId === element._id))
  }, [likes, myId]);

  return (
    <>
      <button className={`photo-grid__like button ${isLike ? "photo-grid__like_active" : ""}`} type="button" onClick={handleLike}></button>
      <span className="photo-grid__counter">{count}</span>
    </>
  )
}