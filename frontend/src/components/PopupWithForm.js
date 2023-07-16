function PopupWithForm({ name, title, isOpen, onClose, onSubmit, children }) {

  return (
    <section
      className={`popup popup_type_${name} ${isOpen} `}
      aria-label={name}
    >
      <div className="popup__container">
        <button
          onClick={onClose}
          className="popup__close"
          type="button"
        >
        </button>
        <h2 className="popup__title">{title}</h2>
        <form
          onSubmit={onSubmit}
          className="popup__form"
          name={`popupForm${name}`}
          noValidate
        >
          {children}
        </form>
      </div>
    </section>);
}

export default PopupWithForm;
