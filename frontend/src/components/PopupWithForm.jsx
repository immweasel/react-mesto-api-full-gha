import React from "react";

function PopupWithForm({
  name,
  isOpen,
  btnText,
  onClose,
  title,
  children,
  onSubmit,
  isValid = true,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className={`popup__container popup__container_type_${name}`}>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__form_type_${name}`}
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button
            className={`popup__button-save popup__button-save_type_${name} ${
              isValid ? "" : "popup__button-save-disabled"
            }  `}
            type="submit"
          >
            {btnText}
          </button>
          <button
            className="popup__close"
            type="button"
            onClick={onClose}
          ></button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
