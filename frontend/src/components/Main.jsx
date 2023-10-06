import React, { useContext } from "react";
import Card from "./Card.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteCard,
  cards,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content">
      <section className="profile">
        <button className="profile__avatar-btn" onClick={onEditAvatar}>
          <img
            src={currentUser.avatar ? currentUser.avatar : "#"}
            alt="Аватар"
            className="profile__image"
          />
        </button>
        <div className="profile__info">
          <div className="profile__informs">
            <h1 className="profile__title">
              {currentUser.name ? currentUser.name : ""}
            </h1>
            <button
              className="profile__edit-button"
              type="button"
              onClick={onEditProfile}
            ></button>
          </div>
          <p className="profile__subtitle">
            {currentUser.about ? currentUser.about : ""}
          </p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          onClick={onAddPlace}
        ></button>
      </section>
      <section className="groups">
        {cards ? (
          cards.map((card) => (
            <Card
              card={card}
              key={card._id}
              onCardClick={onCardClick}
              onDeleteCard={onDeleteCard}
            />
          ))
        ) : (
          <p>Загрузка...</p>
        )}
      </section>
    </main>
  );
}

export default Main;
