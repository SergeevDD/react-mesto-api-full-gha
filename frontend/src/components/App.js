import React, { useState, useEffect } from 'react';
import { Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute.js';
import '../index.css';
import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'
import AddPlacePopup from './AddPlacePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import DeleteCardPopup from './DeleteCardPopup';
import ImagePopup from './ImagePopup.js';
import { api } from '../utils/Api.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js'
import Login from './Login.js';
import Register from './Register.js';
import InfoTooltip from './InfoTooltip.js';
import { authorize, register, checkToken, logout } from '../utils/Auth';

function App() {

  function handleEditAvatarClick() {
    setAvatarPopup(true);
  }
  function handleEditProfileClick() {
    setProfilePopup(true);
  }
  function handleAddPlaceClick() {
    setAddPopup(true);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleCardLike(card, isLiked) {
    api.toggleLike(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => { return c._id === newCard._id ? newCard : c }));
      })
      .catch((err) => console.log('Ошибка:', err))
  }

  function confirmDelete() {
    setIsLoading(true)
    api.removeCard(isConfirmed)
      .then(() => {
        setCards(state => state.filter((c) => c._id !== isConfirmed));
        setDeletePopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleCardDelete(id) {
    setDeletePopup(true)
    setIsConfirmed(id)
  }

  function handleUpdateUser(user) {
    setIsLoading(true)
    api.setUserData(user)
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({ name, about, avatar, _id });
        setProfilePopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleUpdateAvatar(link) {
    setIsLoading(true)
    api.setUserAvatar(link)
      .then((newUser) => {
        setCurrentUser(newUser);
        setAvatarPopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function handleAddPlaceSubmit(card) {
    setIsLoading(true)
    api.uploadCard(card)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        setAddPopup(false);
      })
      .catch((err) => console.log('Ошибка:', err))
      .finally(() => setIsLoading(false))
  }

  function closeAllPopups() {
    setAvatarPopup(false);
    setProfilePopup(false);
    setAddPopup(false);
    setDeletePopup(false);
    setSelectedCard({});
    setInfoTooltip('');
  }

  const navigate = useNavigate();

  function handleCheckToken() {
    checkToken()
      .then((res) => {
        if (res._id) {
          setUserEmail(res.email);
          Promise.all([api.getUserData(), api.getInitialCards()])
            .then(([{ name, about, avatar, _id }, cardList]) => {
              setCurrentUser({ name, about, avatar, _id })
              setCards(cardList)
              setLoggedIn(true);
              navigate("/", { replace: true })
            }
            )
            .catch((err) => console.log('Ошибка:', err))
        }
      })
      .catch((err) => console.log('Ошибка:', err))
  }

  function handleRegister(data) {
    register(data.password, data.email)
      .then((res) => {
        if (res) {
          setInfoTooltip(true)
          navigate('/sign-in', { replace: true });
        } else {
          setInfoTooltip(false)
        }
      })
      .catch(err => { console.log(err) });
  }

  function handleLogin(data) {
    authorize(data.email, data.password)
      .then((data) => {
        if (data) {
          handleCheckToken();
        } else {
          setInfoTooltip(false)
        }
      })
      .catch(err => { console.log(err) }
      );
  }

  function handleSignout() {
    logout()
      .then((answ) => {
        if (answ.bye) {
          sessionStorage.removeItem('loggedin');
          setLoggedIn(false);
          setCurrentUser({});
          navigate("/sign-in")
        }
      })
      .catch(err => { console.log(err) })
  }

  const [isConfirmed, setIsConfirmed] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEditProfilePopupOpen, setProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setAddPopup] = useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopup] = useState(false);
  const [isDeletePopupOpen, setDeletePopup] = useState(false);
  const [selectedCard, setSelectedCard] = useState({})
  const [currentUser, setCurrentUser] = useState({name:'', about:'', avatar:''});

  const [isLoggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('@email');
  const [isTooltipOpen, setInfoTooltip] = useState('');
  const [cards, setCards] = useState([]);


  useEffect(() => {
    if (sessionStorage.getItem('loggedin')) {
      handleCheckToken()
    }
    // eslint-disable-next-line
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header
        loggedIn={isLoggedIn}
        handleSignOut={handleSignout}
        userEmail={userEmail} />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Navigate to="/main" replace /> : <Navigate to="/sign-in" replace />} />
        <Route path="/sign-up" element={<Register handleRegister={handleRegister} />} />
        <Route path="/sign-in" element={<Login handleLogin={handleLogin} />} />
        <Route path="/main" element={<ProtectedRouteElement element={Main}
          loggedIn={isLoggedIn}
          cards={cards}
          onEditAvatar={handleEditAvatarClick}
          onAddPlace={handleAddPlaceClick}
          onEditProfile={handleEditProfileClick}
          onCardClick={handleCardClick}
          onCardLike={handleCardLike}
          onCardDelete={handleCardDelete}
        />} />
      </Routes>
      <Footer />
      {isTooltipOpen !== '' ? < InfoTooltip
        isOk={isTooltipOpen}
        onClose={closeAllPopups}
      /> : ''}

      <AddPlacePopup
        isOpen={isAddPlacePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} />

      <EditProfilePopup
        isOpen={isEditProfilePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} />

      <EditAvatarPopup
        isOpen={isEditAvatarPopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} />

      <DeleteCardPopup
        isOpen={isDeletePopupOpen}
        isLoading={isLoading}
        onClose={closeAllPopups}
        onDeleteCard={confirmDelete} />

      <ImagePopup
        card={selectedCard}
        onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
