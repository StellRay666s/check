import React from "react";

import CheckBox from "./CheckBox";
import Input from "./Input";

export default function LoginPhone({ changeLoginChoice, phone, setPhone }) {
  return (
    <div className="login_block">
      <h1 className="auth-title text-center _medium">Вход</h1>
      <div className="auth-page-content w-100 mx-auto">
        <Input
          type={"phone"}
          value={phone}
          setValue={setPhone}
          placeholder={"Телефон"}
        />
        <button className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">
          Получить код
        </button>

        <div className="login-separator d-flex position-relative">или</div>

        <button
          onClick={changeLoginChoice}
          className={`btn other-auth d-flex mx-auto`}
        >
          Войти по логину и паролю
        </button>
        <CheckBox />
      </div>
    </div>
  );
}
