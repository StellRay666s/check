import React from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import { useDispatch } from "react-redux";

import SmsCode from "../components/sms-code";
import LoginPhone from "../components/login-phone";
import LoginEmail from "../components/login-email";
import ChangePassword from "../components/change-password";
import { useRouter } from "next/router";
import { setUser } from "../redux/slices/userSlice";
import { useTogglePassword } from "../hooks/useTogglePassword";
import axios from "axios";

export default function Login() {
  const [choiceLogin, setChoiceLogin] = React.useState(true);
  const [removePassword, setRemovePassword] = React.useState(false);
  const [phone, setPhone] = React.useState();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { passwordShow, togglePasswordVisiblity } = useTogglePassword();
  const dispatch = useDispatch();
  const router = useRouter();

  async function login() {
    const response = await axios.post("http://localhost:8000/login", {
      email: email,
      password: password,
    });
    console.log(response.data);
    if (response.status) {
      router.push("/account");
      localStorage.setItem("token", response.data.token);
      dispatch(setUser(response.data.user));
    }
  }

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
                    email={email}
                    setLogin={setEmail}
                    login={login}
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
