import React from "react";
import { Link } from "react-router-dom";
import useFormValidation from "../utils/useFormValidation";

function Register({ onRegister }) {
  const { values, errors, isValid, isInputValid, reset, handleChange } =
    useFormValidation();

  function resetClose() {
    reset();
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(values.email, values.password);
  };

  return (
    <main className="content">
      <div className="authorization">
        <p className="authorization__welcome">Регистрация</p>
        <form
          className="authorization__form form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            className={`authorization__input ${
              isInputValid.email === undefined || isInputValid.email
                ? ""
                : "authorization__input_valid_error"
            } `}
            required
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            value={values.email || ""}
            onChange={handleChange}
            onClose={resetClose}
          />
          <span className="authorization__error authorization__error_visible">
            {errors.email}
          </span>
          <input
            className={`authorization__input ${
              isInputValid.password === undefined || isInputValid.password
                ? ""
                : "authorization__input_valid_error"
            } `}
            required
            id="password"
            name="password"
            type="password"
            placeholder="Пароль"
            minLength="8"
            value={values.password || ""}
            onChange={handleChange}
          />
          <span className="authorization__error authorization__error_visible">
            {errors.password}
          </span>
          <div className="authorization__button-container">
            <button
              type="submit"
              className={
                isValid
                  ? "authorization__button"
                  : "authorization__button authorization__button_disabled"
              }
              disabled={!isValid}
            >
              Зарегистрироваться
            </button>
          </div>
        </form>
        <p className="authorization__signin">
          Уже зарегистрированы?{" "}
          <Link to="/sign-in" className="authorization__link">
            {" "}
            Войти
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
