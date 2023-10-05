import useFormValidation from "../../utils/useFormValidation"
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

  const { values, errors, isValid, handleChange, reset } = useFormValidation()

  function resetForClose() {
    onClose()
    reset()
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    onAddPlace({ title: values.title, link: values.link}, reset)
  }

  return (
    <PopupWithForm
      name='add'
      title='Новое место'
      textButton='Создать'
      isOpen={isOpen}
      onClose={resetForClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <div className="popup__text-input-container">
        <input
          className="popup__text popup__text_place-name"
          type="text"
          name="title"
          id="title"
          placeholder="Название"
          minLength={2}
          maxLength={30}
          required=""
          value={values.title ? values.title : ''}
          onChange={handleChange}
        />
        <span className="popup__invalid popup__invalid_type_title">{errors.title}</span>
      </div>
      <div className="popup__text-input-container">
        <input
          className="popup__text popup__text_place-link"
          type="url"
          name="link"
          id="link"
          placeholder="Ссылка на картинку"
          required=""
          value={values.link ? values.link : ''}
          onChange={handleChange}
        />
        <span className="popup__invalid popup__invalid_type_link">{errors.link}</span>
      </div>
    </PopupWithForm>
  )
}