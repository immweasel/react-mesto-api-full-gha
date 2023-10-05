import PopupWithForm from "../PopupWithForm/PopupWithForm"
import useFormValidation from "../../utils/useFormValidation"
import { useRef } from "react"

export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

  const input = useRef()
  const {values, errors, isValid, handleChange, reset} = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onUpdateAvatar({avatar: input.current.value}, reset)
  }

  return (
    <PopupWithForm
      name='avatar'
      title='Обновить аватар'
      textButton='Сохранить'
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__text-input-container">
        <input
          ref={input}
          className="popup__text popup__text_place-link"
          type="url"
          name="avatar"
          id="avatar"
          placeholder="Ссылка на картинку"
          required=""
          value={values.avatar ? values.avatar : ''}
          onChange={handleChange}
        />
        <span className="popup__invalid popup__invalid_type_avatar">{errors.avatar}</span>
      </div>
    </PopupWithForm>
  )
}