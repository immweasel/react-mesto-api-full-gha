import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../images/Logo.svg";
// import burger from "../images/burger.svg";
// import closeBtn from "../images/close-burger-menu.svg";

function Header({ onLogout, email }) {
  const location = useLocation();
  //const [menu, setMenu] = useState(false);
  const [scroll, setScroll] = useState(0);

  // function handleOpenMenu() {
  //   setMenu(!menu);
  // }

  function handleScroll() {
    setScroll(window.scrollY);
  }

  //При скролле вниз, меню само закрывается
  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="header">
      <img src={Logo} className="logo" alt="Логотип" />

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
          <div
            className={
              !scroll
                ? "header__element header__element_active"
                : "header__element"
            }
          >
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
  );
}

export default Header;

/*
function Header() {
    return (
        <header className="header">
            <img src={Logo} className="logo" alt="Логотип" />
        </header>
    );
}

import burger from "../images/burger.svg";
import closeBtn from "../images/close-burger-menu.svg";

function handleOpenMenu() {
    setMenu(!menu);
  }

header className={menu && !scroll ? "header header_active" : "header"}>
  <div
            className={
              menu && !scroll
                ? "header__element header__element_active"
                : "header__element"
            }
          >
 <div
            onClick={handleOpenMenu}
            className={
              menu && !scroll
                ? "header__container header__container_active"
                : "header__container"
            }
          >
            {menu && !scroll ? (
              <img
                src={closeBtn}
                className="header__burger"
                alt="Знак закрытия меню"
              />
            ) : (
              <img src={burger} className="header__burger" alt="Знак меню" />
            )}
          </div>
*/
