import React, { useState } from "react";

import Input from "./Input";

import { validateEmail } from "../utils/validateEmail";
import { useTogglePassword } from "../hooks/useTogglePassword";

import CheckBox from "./CheckBox";

export default function RegistrationEmail({ onClick }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
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

  console.log(fieldChecked());

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
            placeholder={"Введите пароль"}
            type={"password"}
            togglePasswordVisiblity={togglePasswordVisiblity}
            passwordShow={passwordShow}
            value={password}
            setValue={setPassword}
          />
          <Input
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
            onClick={() => console.log(1)}
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
