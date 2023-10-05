import successRegister from "../../images/success.svg";
import errorRegister from "../../images/block.svg";

function InfoTooltip({ isOpen, onClose, isConfirmed }) {
  return (
    <div
      className={`popup popup_overlay_light ${isOpen ? "popup_opened" : ""}`}
    >
      <div className="popup__container">
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__tootltip-img"
          alt={isConfirmed ? "Галочка" : "Крестик"}
          src={isConfirmed ? successRegister : errorRegister}
        />
        <h2 className="popup__tootltip-title">
          {isConfirmed ? "Вы успешно зарегистрировались" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
