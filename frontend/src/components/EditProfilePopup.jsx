import { useContext, useEffect } from "react";
import useFormValidation from "../utils/useFormValidation";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const {
    values,
    errors,
    isValid,
    isInputValid,
    setValue,
    reset,
    handleChange,
  } = useFormValidation();

  useEffect(() => {
    setValue("username", currentUser.name);
    setValue("job", currentUser.about);
  }, [currentUser, setValue]);

  function resetClose() {
    onClose();
    reset({ username: currentUser.name, job: currentUser.about });
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({ username: values.username, job: values.job }, reset);
  }

  return (
    <PopupWithForm
      name="edit"
      title="Редактировать профиль"
      btnText="Сохранить"
      isOpen={isOpen}
      onClose={resetClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <label className="popup__input-elements">
        <input
          id="username"
          type="text"
          placeholder="Введите Имя"
          className={`popup__input popup__input_type_name ${
            isInputValid.username === undefined || isInputValid.username
              ? ""
              : "popup__input_valid_error"
          }`}
          name="username"
          required
          minLength="2"
          maxLength="40"
          value={values.username ? values.username : ""}
          onChange={handleChange}
        />
        <span
          id="error-username"
          className="username-error popup__error popup__error_visible"
        >
          {errors.username}
        </span>
      </label>
      <label className="popup__input-elements">
        <input
          id="job"
          type="text"
          placeholder="Введите профессию"
          className={`popup__input popup__input_type_job ${
            isInputValid.job === undefined || isInputValid.job
              ? ""
              : "popup__input_valid_error"
          }`}
          name="job"
          required
          minLength="2"
          maxLength="200"
          value={values.job ? values.job : ""}
          onChange={handleChange}
        />
        <span
          id="error-job"
          className="job-error popup__error popup__error_visible"
        >
          {errors.job}
        </span>
      </label>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
