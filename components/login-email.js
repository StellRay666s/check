import React from "react";
import Link from "next/link";
import Input from "./Input";

export default function LoginEmail({
  changeLoginChoice,
  changePassword,
  email,
  setLogin,
  password,
  setPassword,
  passwordShow,
  togglePasswordVisiblity,
  login,
}) {
  return (
    <div className="login_block">
      <h1 className="auth-title text-center _medium">Вход</h1>
      <div className="auth-page-content w-100 mx-auto">
        <Input
          value={email}
          setValue={setLogin}
          placeholder={"Эл.Почта"}
          type={"text"}
        />
        <Input
          passwordShow={passwordShow}
          togglePasswordVisiblity={togglePasswordVisiblity}
          value={password}
          setValue={setPassword}
          placeholder={"Пароль"}
          type={"password"}
        />
        <button
          onClick={() => login()}
          className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto"
        >
          Войти
        </button>
        <button
          onClick={changePassword}
          className="btn btn_auth-control d-flex mx-auto"
        >
          Не помню пароль
        </button>
        <Link href="/registration">
          <button className="btn btn_auth-control d-flex mx-auto">
            Зарегистрироваться
          </button>
        </Link>
        <div className="login-separator d-flex position-relative">или</div>
        <button
          onClick={changeLoginChoice}
          className={`btn other-auth d-flex mx-auto`}
        >
          Войти по логину и паролю
        </button>
        <label for="agree" class="checkbox d-flex">
          <input required="" type="checkbox" name="agree" id="agree" />
          <span class="checkbox-mark"></span>
          <div class="privacy-policy-agree__text">
            Отправляя данную форму, вы принимаете условие{" "}
            <Link href="">
              <a>пользовательского соглашения</a>
            </Link>
          </div>
        </label>
      </div>
    </div>
  );
}
