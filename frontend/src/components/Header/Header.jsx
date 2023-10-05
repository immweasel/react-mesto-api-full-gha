import logo from '../../images/logo-mesto.svg';
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Header({ onLogout, email }) {

  const location = useLocation();
  const [scroll, setScroll] = useState(0);

  function handleScroll() {
    setScroll(window.scrollY);
  }

  //При скролле вниз, меню само закрывается
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return(
    <header className="header">
      <img
        className="header__logo"
        src={logo}
        alt="Место Россия"
      />

      {location.pathname === "/sign-in" && (
        <Link className="header__link" to="/sign-up">
          Регистрация
        </Link>
      )}

      {location.pathname === "/sign-up" && (
        <Link className="header__link" to="/sign-in">
          Войти
        </Link>
      )}

      {location.pathname === "/" && (
        <>
        <div className={!scroll ? "header__element header__element_active" : "header__element"}>
          <p className="header__email">{email}</p>
            <Link
              className="header__link-logout"
              to="/sign-in"
              onClick={onLogout}
            >
              Выйти
            </Link>
        </div>

        </>
      )}
    </header>
  )
}