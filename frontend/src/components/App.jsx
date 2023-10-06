import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header.jsx";
import Main from "./Main.jsx";
import Footer from "./Footer.jsx";
import ImagePopup from "./ImagePopup.jsx";
import PopupWithForm from "./PopupWithForm.jsx";
import CurrentUserContext from "../contexts/CurrentUserContext.jsx";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup.jsx";
import InfoTooltip from "./InfoTooltip.jsx";
import Login from "./Login.jsx";
import Register from "./Register.jsx";
import ProtectedRouteElement from "./ProtectedRoute.jsx";
import { register, authorize, getContent } from "../utils/Auth.js";
import api from "../utils/Api.js";

function App() {
  // стейты попапов
  const [isEditProfilePopupOpen, setEditPopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDeletePopup, setDeleteCardPopup] = useState(false);
  const [isImagePopup, setImagePopup] = useState(false);
  // const [isPreRender, setIsPreRender] = useState(false)
  // стейт контекста
  const [currentUser, setCurrentUser] = useState({});

  // стейт карточек
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState("");
  // const [isLoadingGif, setIsLoadingGif]  = useState(true)
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState(null);
  const [isRegister, setIsRegister] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const isOpen =
    isEditAvatarPopupOpen ||
    isEditProfilePopupOpen ||
    isAddPlacePopupOpen ||
    isImagePopup;

  const navigate = useNavigate();


  useEffect(() => {
    const token = localStorage.getItem("token");
    // если у пользователя есть токен в localStorage,
    // эта функция проверит, действующий он или нет
    if (token) {
      getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.email);
            navigate("/", { replace: true });
          }
        })
        .catch(console.error);
    }
  },);

  function handleEditProfileClick() {
    setEditPopupOpen(true);
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPopupOpen(true);
  }

  function handleInfoPopup() {
    setIsInfoTooltipOpen(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopup(true);
  }

  function handleDeleteCard(cardId) {
    setDeleteCardPopup(true);
    setDeleteCardId(cardId);
  }

  function closeAllPopups() {
    setEditPopupOpen(false);
    setAvatarPopupOpen(false);
    setAddPopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopup(false);
    setImagePopup(false);
    setIsInfoTooltipOpen(false);
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserInfo(), api.getInitialCards()])
        .then(([resData, resCardInfo]) => {
          setCurrentUser(resData);
          setCards(resCardInfo);
          //   setIsLoadingGif(false)
        })
        .catch(console.error);
    }
  }, [loggedIn]);

  function handleDeleteCardSubmit(evt) {
    evt.preventDefault();
    // setIsPreRender(true)
    api
      .deleteCard(deleteCardId)
      .then(() => {
        setCards(
          cards.filter((card) => {
            return card._id !== deleteCardId;
          })
        );
        closeAllPopups();
        // setIsPreRender(false);
      })
      .catch(console.error);
  }

  function handleUpdateUser(dataUser, reset) {
    api
      .setUserInfo(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch(console.error);
  }

  function handleUpdateAvatar(dataUser, reset) {
    api
      .updateUserAvatar(dataUser)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
        reset();
      })
      .catch(console.error);
  }

  function handleAddPlace(cardInfo, reset) {
    api
      .addCard(cardInfo)
      .then((res) => {
        setCards([res, ...cards]);
        closeAllPopups();
        reset();
      })
      .catch(console.error);
  }
  
  //Обработка запроса на регистрацию
  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setIsRegister(true);
          handleInfoPopup();
          navigate("/sign-in", { replace: true });
        } else {
          handleInfoPopup();
          setIsRegister(false);
        }
      })
      .catch(() => {
        handleInfoPopup();
        setIsRegister(false);
        console.error();
      });
  }

  function handleLoggedIn() {
    setLoggedIn(true);
  }

  //Обработка запроса на авторизацию
  function handleLogin(email, password) {
    authorize(email, password)
      .then((data) => {
        if (data.token) {
          setEmail(email);
          handleLoggedIn();
          navigate("/", { replace: true });
        }
      })
      .catch(() => {
        setLoggedIn(false);
        handleInfoPopup();
        console.error();
      });
  }

  //Выход из системы
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  useEffect(() => {
    function closeByEscape(evt) {
      if (evt.key === "Escape") {
        closeAllPopups();
      }
    }
    if (isOpen) {
      // навешиваем только при открытии
      document.addEventListener("keydown", closeByEscape);
      return () => {
        document.removeEventListener("keydown", closeByEscape);
      };
    }
  }, [isOpen]);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header onLogout={handleLogout} email={email} />
        <Routes>
          <Route
            path="/sign-up"
            element={<Register onRegister={handleRegister} />}
          />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <ProtectedRouteElement
                loggedIn={loggedIn}
                element={Main}
                onEditAvatar={handleEditAvatarClick}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                onDeleteCard={handleDeleteCard}
                cards={cards}
              />
            }
          />
        </Routes>

        <Footer />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopup}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmed={isRegister}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
        />

        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateAvatar}
        />

        <AddPlacePopup
          name="add"
          title="Новое место"
          btnText="Создать"
          isOpen={isAddPlacePopupOpen}
          onClose={closeAllPopups}
          onAddPlace={handleAddPlace}
        />

        <PopupWithForm
          name="delete"
          title="Вы уверены?"
          btnText="Да"
          isOpen={isDeletePopup}
          onClose={closeAllPopups}
          onSubmit={handleDeleteCardSubmit}
          //  isPreRender={isPreRender}
        />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
