import React from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Link from "next/link";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { clearUser } from "../redux/slices/userSlice";
import { switchTariffs } from "../redux/slices/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.user?.isAuth);
  const tariffs = useSelector((state) => state.user.user?.tariffs);
  const [active, setActive] = React.useState();
  function logout() {
    localStorage.setItem("token", "");
    dispatch(clearUser());
  }

  function changeTariffs(index, link) {
    setActive(index);
    dispatch(switchTariffs(link));
  }

  const tariffsList = [
    { title: "Премиум тариф" },
    { title: "Партнерский тариф" },
    { title: "Базовый тариф" },
  ];

  return (
    <Dropdown>
      <Dropdown.Toggle id={`dropdown-basic`} className={`btn btn_login`}>
        <div className={`login-avatar`}>
          <img src="../images/user.svg" alt="" />
        </div>
      </Dropdown.Toggle>
      <Dropdown.Menu align={`end`} className={`login-menu`}>
        {isAuth === false ? (
          <div>
            <Dropdown.Item>
              <Link href="/login">Авторизоваться</Link>
            </Dropdown.Item>

            <Dropdown.Item>
              <Link href="/registration">Зарегистрироваться</Link>
            </Dropdown.Item>
          </div>
        ) : (
          <div>
            <Dropdown.Item>
              <Link href="/account">Перейти в профиль</Link>
            </Dropdown.Item>
            {tariffs.map((link, index) => (
              <Dropdown.Item
                onClick={() => changeTariffs(index, link)}
                className={active === index && `active position-relative`}
                key={index}
              >
                {link}
              </Dropdown.Item>
            ))}
            <Dropdown.Item onClick={() => logout()}>Выйти</Dropdown.Item>
          </div>
        )}
      </Dropdown.Menu>
    </Dropdown>
  );
}
