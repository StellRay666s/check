import React from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";

import SmsCode from "../components/sms-code";
import LoginPhone from "../components/login-phone";
import LoginEmail from "../components/login-email";
import ChangePassword from "../components/change-password";

import { useTogglePassword } from "../hooks/useTogglePassword";

export default function Login() {
  const [choiceLogin, setChoiceLogin] = React.useState(true);
  const [removePassword, setRemovePassword] = React.useState(false);
  const [phone, setPhone] = React.useState();
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { passwordShow, togglePasswordVisiblity } = useTogglePassword();

  function changeLoginChoice() {
    setChoiceLogin(!choiceLogin);
  }

  function changePassword() {
    setRemovePassword(!removePassword);
  }

  return (
    <MainLayout title={"Авторизация"}>
      <main>
        <div className={`main-content pages-content h-100`}>
          <div className={`container mx-auto`}>
            {/* <SmsCode /> */}
            {removePassword ? (
              <ChangePassword />
            ) : (
              <div>
                {choiceLogin ? (
                  <LoginPhone
                    phone={phone}
                    setPhone={setPhone}
                    changeLoginChoice={changeLoginChoice}
                  />
                ) : (
                  <LoginEmail
                    passwordShow={passwordShow}
                    togglePasswordVisiblity={togglePasswordVisiblity}
                    login={login}
                    setLogin={setLogin}
                    password={password}
                    setPassword={setPassword}
                    changePassword={changePassword}
                    changeLoginChoice={changeLoginChoice}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
