import React from "react";
import Link from "next/link";
import Input from "./Input";
import CheckBox from "./CheckBox";

export default function RegistrationPhone({ onClick }) {
  const [phone, setPhone] = React.useState(null);

  return (
    <div className="login_block">
      <h1 className="auth-title text-center _medium">Регистрация</h1>
      <div className="auth-page-content w-100 mx-auto">
        <div className="auth-item">
          <Input
            type={"phone"}
            placeholder={"Телефон"}
            value={phone}
            setValue={setPhone}
          />
        </div>
        <button className="btn btn_auth-registration d-flex align-items-center justify-content-center mx-auto">
          Получить код
        </button>

        <div className="login-separator d-flex position-relative">или</div>

        <button
          onClick={() => onClick()}
          className={`btn other-auth d-flex mx-auto`}
        >
          Продолжить по Email
        </button>
       <CheckBox/>
      </div>
    </div>
  );
}
