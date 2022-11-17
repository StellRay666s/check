import React, { useState } from "react";

export default function ChangePassword() {
  const [passwordShow, setPasswordShow] = useState(false);

  const togglePasswordVisiblity = () => {
    setPasswordShow(!passwordShow);
  };
  return (
    <div className="login_block">
      <h1 className="auth-title text-center _medium">Смена пароля</h1>
      <div className="auth-page-content w-100 mx-auto">
        <div className="auth-item position-relative">
          <input
            type={passwordShow ? "text" : "password"}
            placeholder="Пароль"
          />
          <span
            role="button"
            onClick={togglePasswordVisiblity}
            className={`toggle-vis d-flex align-items-center justify-content-center position-absolute`}
          >
            {passwordShow ? (
              <img src="../images/hide.svg" alt="" />
            ) : (
              <img src="../images/show.svg" alt="" />
            )}
          </span>
        </div>
        <div className="auth-item position-relative">
          <input
            type={passwordShow ? "text" : "password"}
            placeholder="Новый пароль"
          />
          <span
            role="button"
            onClick={togglePasswordVisiblity}
            className={`toggle-vis d-flex align-items-center justify-content-center position-absolute`}
          >
            {passwordShow ? (
              <img src="../images/hide.svg" alt="" />
            ) : (
              <img src="../images/show.svg" alt="" />
            )}
          </span>
        </div>
        <div className="auth-item position-relative">
          <input
            type={passwordShow ? "text" : "password"}
            placeholder="Повторите пароль"
          />
          <span
            role="button"
            onClick={togglePasswordVisiblity}
            className={`toggle-vis d-flex align-items-center justify-content-center position-absolute`}
          >
            {passwordShow ? (
              <img src="../images/hide.svg" alt="" />
            ) : (
              <img src="../images/show.svg" alt="" />
            )}
          </span>
        </div>
        <button className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">
          Сменить пароль
        </button>
      </div>
    </div>
  );
}
