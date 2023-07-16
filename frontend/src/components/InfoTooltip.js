import errorImg from '../images/logo/errorPopup.svg';
import acceptImg from '../images/logo/acceptPopup.svg'

function InfoTooltip({isOk, onClose}) {

  return (
    <section
      className="tooltip"
      aria-label="preview"
    >
      <figure className="tooltip__container">
        <button
          onClick={onClose}
          className="tooltip__close"
          type="button"
        >
        </button>
        <img
          alt={''}
          src={isOk ? acceptImg : errorImg}
          className="tooltip__image"
        />
        <figcaption className="tooltip__subtitle">{isOk ? "Вы успешно зарегистрировались!" :
          "Что-то пошло не так! Попробуйте ещё раз."}</figcaption>
      </figure>
    </section>
  );
}

export default InfoTooltip
