import useFormValidation from "../../utils/useFormValidation";
import PopupWithForm from "../PopupWithForm/PopupWithForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, errors, isValid, reset, setValue, handleChange } = useFormValidation()

  useEffect(() => {
    setValue("name", currentUser.name)
    setValue("description", currentUser.about)
  },[currentUser, setValue])

  function resetForClose() {
    onClose()
    reset({ name: currentUser.name, description: currentUser.about })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateUser({ name: values.name, description: values.description}, reset)
  }

  return (
    <PopupWithForm
      name='edit'
      title='Редактировать профиль'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={resetForClose}
      isValid={isValid}
      onSubmit={handleSubmit}
    >
      <div className="popup__text-input-container">
        <input
          className="popup__text popup__text_name"
          type="text"
          name="name"
          id="name"
          placeholder="Имя"
          minLength={2}
          maxLength={40}
          required
          value={values.name ? values.name : ''}
          onChange={handleChange}
        />
        <span className="popup__invalid popup__invalid_type_name">{errors.name}</span>
      </div>
      <div className="popup__text-input-container">
        <input
          className="popup__text popup__text_description"
          type="text"
          name="description"
          id="description"
          placeholder="О себе"
          minLength={2}
          maxLength={200}
          required
          value={values.description ? values.description : ''}
          onChange={handleChange}
        />
        <span className="popup__invalid popup__invalid_type_description">{errors.description}</span>
      </div>
    </PopupWithForm>
  )
}