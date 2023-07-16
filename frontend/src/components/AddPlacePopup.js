import PopupWithForm from "./PopupWithForm";
import { useEffect, useState } from "react";

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name, link
    })
  }

  function handleChangeName(e) {
    setName(e.target.value);
    setNameValidity(e.target.validity.valid);
    setNameValidateMsg(e.target.validationMessage);
  }

  function handleChangeLink(e) {
    setLink(e.target.value);
    setLinkValidity(e.target.validity.valid)
    setLinkValidateMsg(e.target.validationMessage);
  }

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [nameValidateMsg, setNameValidateMsg] = useState();
  const [linkValidateMsg, setLinkValidateMsg] = useState();
  const [nameValidity, setNameValidity] = useState(false);
  const [linkValidity, setLinkValidity] = useState(false);

  useEffect(() => {
    setName("");
    setLink("");
    setNameValidateMsg("*Обязательно для заполнения");
    setLinkValidateMsg("*Обязательно для заполнения");
    setNameValidity(false);
    setLinkValidity(false);
  }, [isOpen])

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
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
            id="input-placename"
            placeholder="Название"
            className="popup__input popup__input_type_place"
            required
            minLength="2"
            maxLength="30"
            value={name}
          />
          <span
            className="popup__error popup__error_visible"
            id="input-placename-error">{nameValidateMsg}
          </span>
          <input
            onChange={handleChangeLink}
            type="url"
            name="link"
            id="input-placelink"
            placeholder="Ссылка"
            className="popup__input popup__input_type_link"
            required
            value={link}
          />
          <span
            className="popup__error popup__error_visible"
            id="input-placelink-error">{linkValidateMsg}
          </span>
        </fieldset>
        <button
          disabled={!(nameValidity && linkValidity)}
          name="saveBtn"
          type="submit"
          className={`popup__save ${nameValidity && linkValidity ? "" : "popup__save_disabled"}`}>
          Создать{isLoading && nameValidity && linkValidity ? "..." : ""}
        </button>
      </>
    </PopupWithForm>);
}

export default AddPlacePopup;
