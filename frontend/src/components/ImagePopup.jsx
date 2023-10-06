import React from "react";

function ImagePopup({ card, onClose, isOpen }) {
  return (
    <div
      className={`popup popup_type_img popup_overlay_dark ${
        isOpen && "popup_opened"
      }`}
    >
      {card && (
        <div className="popup__images-container">
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
          <figure className="popup__figure">
            <img
              className="popup__picture"
              src={card.link ? card.link : "#"}
              alt={card.name ? `Изображение ${card.name}` : "#"}
            />
            <figcaption className="popup__picture-description">
              {card.name}
            </figcaption>
          </figure>
        </div>
      )}
    </div>
  );
}

export default ImagePopup;
