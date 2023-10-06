import PopupWithForm from "./PopupWithForm.jsx";
import useFormValidation from "../utils/useFormValidation";

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
  const { values, errors, isValid, isInputValid, reset, handleChange } =
    useFormValidation();

  function resetClose() {
    onClose();
    reset();
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onAddPlace({ name: values.name, link: values.link }, reset);
  }

  return (
    <PopupWithForm
      name="add"
      title="Новое место"
      btnText="Создать"
      isOpen={isOpen}
      onClose={resetClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <input
        id="usernameAdd"
        type="text"
        placeholder="Название"
        className={`popup__input popup__input_type_text ${
          isInputValid.name === undefined || isInputValid.name
            ? ""
            : "popup__input_valid_error"
        } `}
        name="name"
        required
        minLength="2"
        maxLength="30"
        value={values.name ? values.name : ""}
        onChange={handleChange}
      />
      <span
        id="error-usernameAdd"
        className="usernameAdd-error popup__error popup__error_visible"
      >
        {errors.name}
      </span>
      <input
        id="url"
        type="url"
        placeholder="Ссылка на картинку"
        className={`popup__input popup__input_type_link ${
          isInputValid.link === undefined || isInputValid.link
            ? ""
            : "popup__input_valid_error"
        }  `}
        name="link"
        required
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

export default AddPlacePopup;
