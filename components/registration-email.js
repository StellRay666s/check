import React, { useState } from "react";

import Input from "./Input";

import { validateEmail } from "../utils/validateEmail";
import { useTogglePassword } from "../hooks/useTogglePassword";

import CheckBox from "./CheckBox";

export default function RegistrationEmail({
  onClick,
  registration,
  password,
  email,
  repeatPassword,
  setEmail,
  setPassword,
  setRepeatPassword,
}) {
  const { passwordShow, togglePasswordVisiblity } = useTogglePassword();

  function fieldChecked() {
    if (
      email != "" &&
      password != "" &&
      repeatPassword != "" &&
      password === repeatPassword &&
      validateEmail(email)
    ) {
      return false;
    } else {
      return true;
    }
  }

  function verifyPassword() {
    if (repeatPassword != password) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="login_block">
      <h1 className="auth-title text-center _medium">Регистрация</h1>
      <div className="auth-page-content w-100 mx-auto">
        <form>
          <Input
            placeholder={"Введите Email"}
            type={"email"}
            value={email}
            setValue={setEmail}
          />
          <Input
            verifyPassword={verifyPassword()}
            placeholder={"Введите пароль"}
            type={"password"}
            togglePasswordVisiblity={togglePasswordVisiblity}
            passwordShow={passwordShow}
            value={password}
            setValue={setPassword}
          />
          <Input
            verifyPassword={verifyPassword()}
            placeholder={"Повторите пароль"}
            type={"password"}
            togglePasswordVisiblity={togglePasswordVisiblity}
            passwordShow={passwordShow}
            value={repeatPassword}
            setValue={setRepeatPassword}
          />
          <button
            type="submit"
            disabled={fieldChecked()}
            onClick={() => registration(email, password)}
            className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto"
          >
            Зарегистрироваться
          </button>

          <div className="login-separator d-flex position-relative">или</div>

          <button
            onClick={() => onClick()}
            className={`btn other-auth d-flex mx-auto`}
          >
            Продолжить по телефону
          </button>
          <CheckBox />
        </form>
      </div>
    </div>
  );
}
