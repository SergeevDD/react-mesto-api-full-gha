
import editAvatar from '../images/logo/edit_btn.svg'
import Card from '../components/Card.js'
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Main(
  { cards,
    onEditAvatar,
    onAddPlace,
    onEditProfile,
    onCardClick,
    onCardLike,
    onCardDelete }) {

  const { name, about, avatar } = useContext(CurrentUserContext);

  return (
    <main>
      <section className="profile">
        <div className="avatar" onClick={onEditAvatar}>
          <img
            src={avatar}
            alt="аватар"
            className="avatar__image"
          />
          <img
            src={editAvatar}
            alt="изменить фото"
            className="avatar__edit"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{name}</h1>
          <button
            onClick={onEditProfile}
            className="profile__edit-btn"
            type="button"
          >
          </button>
          <p className="profile__activity">{about}</p>
        </div>
        <button
          onClick={onAddPlace}
          className="profile__add-btn"
          type="button">
        </button>
      </section>
      <section className="photo" aria-label="photo">
        <ul className="photo__list">
          {cards.map((card) =>
          (<Card
            key={card._id}
            card={card}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
            onCardDelete={onCardDelete}
          />)
          )}
        </ul>
      </section>
    </main >
  );
}

export default Main;
