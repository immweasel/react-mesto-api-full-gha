import Header from "./Header/Header.jsx";
import Main from "./Main/Main.jsx";
import Footer from "./Footer/Footer.jsx";
import PopupWithForm from "./PopupWithForm/PopupWithForm.jsx";
import ImagePopup from "./ImagePopup/ImagePopup.jsx";
import { useCallback, useState, useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import CurrentUserContext from "../contexts/CurrentUserContext.js";
import api from "../utils/api.js";
import EditProfilePopup from "./EditProfilePopup/EditProfilePopup.jsx";
import EditAvatarPopup from "./EditAvatarPopup/EditAvatarPopup.jsx";
import AddPlacePopup from "./AddPlacePopup/AddPlacePopup.jsx";
import Register from "./Register/Register.jsx";
import { register, authorize, getContent } from "../utils/Auth.js";
import ProtectedRouteElement from "./ProtectedRoute/ProtectedRoute.jsx";
import InfoTooltip from "./InfoTooltip/InfoTooltip.jsx";
import Login from "./Login/Login.jsx";

function App() {
  //стейты попаов
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [isImagePopupOpen, setImagePopupOpen] = useState(false);
  const [isDeleteCardPopupOpen, setDeleteCardPopupOpen] = useState(false);
  //стейт контекста
  const [currentUser, setCurrentUser] = useState('');
  //стейты карточки
  const [cards, setCards] = useState([]);
  const [deleteCardId, setDeleteCardId] = useState('');

  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState();
  const [isRegister, setIsRegister] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    // если у пользователя есть токен в localStorage, 
    // эта функция проверит, действующий он или нет
    if (token) {
      getContent(token)
        .then((res) => {
          if (res) {
            setLoggedIn(true);
            setEmail(res.data.email);
            navigate('/', { replace: true })
          }
        })
        .catch(console.error);
    }
  },);

  const setAllStatesForClosePopups = useCallback(() => {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    setSelectedCard(null);
    setDeleteCardPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }, [])

  const closePopupByEscape = useCallback((evt) => {
    if (evt.key === 'Escape') {
      setAllStatesForClosePopups()
      document.removeEventListener("keydown", closePopupByEscape)
    }
  }, [setAllStatesForClosePopups])

  const closeAllPopups = useCallback(() => {
    setAllStatesForClosePopups()
    document.removeEventListener("keydown", closePopupByEscape)
  }, [setAllStatesForClosePopups, closePopupByEscape])

  function setEventListenerForDocument() {
    document.addEventListener("keydown", closePopupByEscape);
  }

  function handleInfoPopup() {
    setIsInfoTooltipOpen(true)
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    setEventListenerForDocument()
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    setEventListenerForDocument()
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    setEventListenerForDocument()
    // hangEventListener()
  }

  function handleDeleteClick(cardId) {
    setDeleteCardId(cardId);
    setDeleteCardPopupOpen(true);
    setEventListenerForDocument()
  }

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
    setEventListenerForDocument()
  }

  function handleRegister(email, password) {
    register(email, password)
      .then((res) => {
        if (res) {
          setIsRegister(true);
          handleInfoPopup();
          navigate('/sign-in', { replace: true });
        } else {
          handleInfoPopup();
          setIsRegister(false);
        }
      })
      .catch(() => {
        handleInfoPopup();
        setIsRegister(false);
        console.error();
      })
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
          navigate('/', { replace: true })
        }
      })
      .catch(() => {
        setLoggedIn(false);
        handleInfoPopup();
        console.error();
      })
  }

  //Выход из системы
  function handleLogout() {
    setLoggedIn(false);
    localStorage.removeItem("token");
    navigate("/sign-in");
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getInfo(), api.getCards()])
        .then(([dataUser, dataCard]) => {
          setCurrentUser(dataUser);
          setCards(dataCard);
          // dataCard.forEach((data) => data.myid = dataUser._id);
        })
        .catch((err) => console.log(`Возникла какая-то ошибка: ${err}`));
    }
  }, [loggedIn]);

  function handleCardDelete(evt) {
    evt.preventDefault()
    api.deleteCard(deleteCardId)
      .then(() => {
        setCards(cards.filter(card => {
          return card._id !== deleteCardId;
        }))
        closeAllPopups()
      })
      .catch((err) => console.log(`Возникла какая-то ошибка: ${err}`));
  }

  function handleUpdateUser(dataUser, reset) {
    api.setUserInfo(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Возникла какая-то ошибка: ${err}`));
  }

  function handleUpdateAvatar(dataUser, reset) {
    api.setNewAvatar(dataUser)
      .then(res => {
        setCurrentUser(res)
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Возникла какая-то ошибка: ${err}`));
  }

  function handleAddPlaceSubmit(dataCard, reset) {
    api.addCard(dataCard)
      .then(res => {
        setCards([res, ...cards])
        closeAllPopups()
        reset()
      })
      .catch((err) => console.log(`Возникла какая-то ошибка: ${err}`));
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page__content">

        <Header onLogout={handleLogout} email={email} />
        <Routes>
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={<ProtectedRouteElement
              loggedIn={loggedIn}
              element={Main}
              onEditAvatar={handleEditAvatarClick}
              onEditProfile={handleEditProfileClick}
              onAddPlace={handleAddPlaceClick}
              onCardClick={handleCardClick}
              onDeleteCard={handleDeleteClick}
              cards={cards}
            />}
          />
        </Routes>

        <Footer />

        <EditProfilePopup
          onUpdateUser={handleUpdateUser}
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
        />

        <AddPlacePopup
          onAddPlace={handleAddPlaceSubmit}
          onClose={closeAllPopups}
          isOpen={isAddPlacePopupOpen}
        />

        <PopupWithForm
          name='delete"'
          title='Вы уверены?'
          textButton='Да'
          isOpen={isDeleteCardPopupOpen}
          onClose={closeAllPopups}
          onSubmit={handleCardDelete}
        />

        <EditAvatarPopup
          onUpdateAvatar={handleUpdateAvatar}
          onClose={closeAllPopups}
          isOpen={isEditAvatarPopupOpen}
        />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />

        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          isConfirmed={isRegister}
        />

      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
