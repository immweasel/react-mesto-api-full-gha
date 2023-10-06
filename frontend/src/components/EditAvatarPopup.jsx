import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";
import useFormValidation from "../utils/useFormValidation";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
  const avatarRef = useRef();

  const { values, errors, isValid, isInputValid, reset, handleChange } =
    useFormValidation();

  function resetClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar(
      {
        avatar: avatarRef.current.value,
      },
      reset
    );
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="url"
        type="url"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_link ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__input_valid_error"
        } `}
        name="link"
        required
        ref={avatarRef}
        value={values.link ? values.link : ""}
        onChange={handleChange}
      />
      <span
        id="error-url"
        className="url-error popup__error popup__error_visible"
      >
        {errors.link}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
