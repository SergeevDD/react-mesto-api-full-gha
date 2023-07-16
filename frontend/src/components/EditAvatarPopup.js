import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect, useState } from "react";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      link: linkRef.current.value
    });
  }

  function handleValidity() {
    setLinkValidateMsg(linkRef.current.validationMessage);
    setLinkValidity(linkRef.current.validity.valid);
  }
  const [linkValidateMsg, setLinkValidateMsg] = useState();
  const [linkValidity, setLinkValidity] = useState(false);
  const linkRef = useRef();

  useEffect(() => {
    linkRef.current.value = "";
    setLinkValidity(false);
    setLinkValidateMsg("*Обязательно для заполнения")
  }, [isOpen])

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <input
          onChange={handleValidity}
          ref={linkRef}
          type="url"
          name="link"
          id="input-avatarlink"
          placeholder="Ссылка"
          className="popup__input popup__input_type_link"
          required
        />
        <span
          className="popup__error popup__error_visible"
          id="input-avatarlink-error"
        >
          {linkValidateMsg}
        </span>
        <button
          name="saveBtn"
          type="submit"
          className={`popup__save ${linkValidity ? "" : "popup__save_disabled"}`}
        >
          Сохранить{isLoading && isOpen && linkValidity ? "..." : ""}
        </button>
      </>
    </PopupWithForm>);
}

export default EditAvatarPopup;
