function ImagePopup({ card, onClose }) {

  return (
    <section
      className={`popup popup_type_preview ${card.link ? "popup_opened" : ""}`}
      aria-label="preview"
    >
      <figure className="popup__container popup__container_type_preview">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        >
        </button>
        <img
          alt={card.name}
          src={card.link}
          className="popup__image"
        />
        <figcaption className="popup__subtitle">{card.name}</figcaption>
      </figure>
    </section>);
}

export default ImagePopup;
