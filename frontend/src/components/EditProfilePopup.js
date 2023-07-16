import PopupWithForm from "./PopupWithForm";
import { useState, useContext, useEffect } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValidity(e.target.validity.valid);
    setNameValidateMsg(e.target.validationMessage);
  }

  function handleChangeDescription(e) {
    setDescription(e.target.value);
    setDescriptionValidity(e.target.validity.valid)
    setDescriptionValidateMsg(e.target.validationMessage);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  const [name, setName] = useState("Name");
  const [description, setDescription] = useState("Action");
  const [nameValidateMsg, setNameValidateMsg] = useState();
  const [descriptionValidateMsg, setDescriptionValidateMsg] = useState();
  const [nameValidity, setNameValidity] = useState(true);
  const [descriptionValidity, setDescriptionValidity] = useState(true);
  const currentUser = useContext(CurrentUserContext);

  useEffect(() => {
    setNameValidateMsg('');
    setDescriptionValidateMsg('');
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen]);

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      isOpen={isOpen ? "popup_opened" : ""}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <>
        <fieldset className="popup__input-field">
          <input
            onChange={handleChangeName}
            type="text"
            name="name"
            id="input-username"
            placeholder="Имя пользователя"
            className="popup__input popup__input_type_name"
            required
            minLength="2"
            maxLength="40"
            value={name}
          />
          <span
            className="popup__error popup__error_visible"
            id="input-username-error"
          >
            {nameValidateMsg}
          </span>
          <input
            onChange={handleChangeDescription}
            type="text"
            name="about"
            id="input-useractivity"
            placeholder="Виды деятельности"
            className="popup__input popup__input_type_activity"
            required minLength="2"
            maxLength="200"
            value={description}
          />
          <span
            className="popup__error popup__error_visible"
            id="input-useractivity-error"
          >
            {descriptionValidateMsg}
          </span>
        </fieldset>
        <button
          disabled={!(nameValidity && descriptionValidity)}
          name="saveBtn"
          type="submit"
          className={`popup__save ${nameValidity && descriptionValidity ? "" : "popup__save_disabled"}`}
        >
          Сохранить{isLoading && nameValidity && descriptionValidity ? "..." : ""}
        </button>
      </>
    </PopupWithForm>);
}

export default EditProfilePopup;
