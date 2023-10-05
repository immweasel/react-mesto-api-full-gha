import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import LikeButton from "../LikeButton/LikeButton";

export default function Card({ card, onCardClick, onDeleteCard }) {

  function handleCardClick() {
    onCardClick(card);
}

  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="photo-grid__item">
      <img
        className="photo-grid__photo"
        src={card.link}
        alt={`Изображение ${card.name}`}
        onClick={handleCardClick}
      />
      {currentUser._id === card.owner._id && (
      <button
        className="photo-grid__delete button" 
        type="button" 
        onClick={() => onDeleteCard(card._id)}
        />
      )}
      <div className="photo-grid__description-container">
        <h3 className="photo-grid__description">{card.name}</h3>
        <div className="photo-grid__likes-container">
          <LikeButton likes={card.likes} myId={currentUser._id} cardId={card._id}/>
        </div>
      </div>
    </div>
  );
}
