import Card from "../Card/Card.jsx";
import React from "react";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.js";

export default function Main({
  onEditProfile,
  onAddPlace,
  onEditAvatar,
  onCardClick,
  onDeleteCard,
  cards
}) {

  const currentUser = useContext(CurrentUserContext);

  // const [userName, setUserName] = React.useState("");
  // const [userDescription, setUserDescription] = React.useState("");
  // const [userAvatar, setUserAvatar] = React.useState("");

  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <button
            className="profile__avatar-button button"
            type="button"
            onClick={onEditAvatar}
          >
            <img
              className="profile__avatar"
              src={currentUser.avatar ? currentUser.avatar : ""}
              alt="Аватарка"
            />
          </button>
          <div className="profile__info">
            <div className="profile__edit-container">
              <h1 className="profile__name">{currentUser.name ? currentUser.name : ""}</h1>
              <button
                className="profile__edit button"
                type="button"
                onClick={onEditProfile}
              />
            </div>
            <p className="profile__description">{currentUser.about ? currentUser.about : ""}</p>
          </div>
        </div>
        <button
          className="profile__add button"
          type="button"
          onClick={onAddPlace}
        />
      </section>
      <section className="photo-grid">
        {cards.map((card) => {
          return (
            <div className="photo-grid__item" key={card._id}>
              <Card
                card={card}
                onCardClick={onCardClick}
                onDeleteCard={onDeleteCard}
              />
            </div>
          );
        })}
      </section>
    </main>
  );
}
