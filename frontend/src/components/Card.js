import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import { useContext } from 'react';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const { _id } = useContext(CurrentUserContext);
  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some(i => i._id === _id);
  const cardLikeButtonClassName = (
    `photo__like-btn ${isLiked && 'photo__like-btn_active'}`
  );

  function handleClick() {
    onCardClick(card)
  }

  function handleLikeClick() {
    onCardLike(card, isLiked)
  }

  function handleDeleteClick() {
    onCardDelete(card._id)
  }

  return (
    <li className="photo__card">
      <img
        onClick={handleClick}
        className="photo__image"
        alt={card.name}
        src={card.link}
      />
      <h2 className="photo__name">{card.name}</h2>
      <label className="photo__likes">
        <button
          onClick={handleLikeClick}
          type="button"
          className={cardLikeButtonClassName}>
        </button>
        <span className="photo__like-value">{card.likes.length}</span>
      </label>
      {isOwn && <button className="photo__delete-btn" onClick={handleDeleteClick} />}
    </li>
  )
}

export default Card
