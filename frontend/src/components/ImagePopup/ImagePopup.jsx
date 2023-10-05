import React from 'react';

export default function ImagePopup({ card, isOpen, onClose }) {
  return(
    <div className={`popup popup_type_figure ${isOpen ? 'popup_opened' : ""}`} onClick={onClose}>
      {card && (
        <figure className="popup__container popup__container_type_figure">
        <button
          className="popup__close popup__close-figure button"
          type="button"
          onClick={onClose}
        />
        <img className="popup__figure-photo" src={card.link ? card.link : "#"} alt={card.name ? `Изображение ${card.name}` : "#"} />
        <figcaption className="popup__figure-caption">{card.name}</figcaption>
      </figure>
      )}
    </div>
  )
}