import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../layouts/MainLayout";
import Sidebar from "../components/sidebar";
import { Overlay } from "react-bootstrap";
import { Tooltip } from "react-bootstrap";
import { useWindowSize } from "../hooks/useWindowSize";
import "swiper/css";
import { axiosClient } from "../axiosClient";
import { useRouter } from "next/router";
import axios from "axios";
import { clearUser } from "../redux/slices/userSlice";

export default function Account() {
  const [activeAccountTab, setActiveAccountTab] = useState("profil");
  const [passwordShow, setPasswordShow] = useState(false);
  const [token, setToken] = React.useState("");
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const [name, setName] = React.useState("");
  const [lastname, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const user = useSelector((state) => state.user.user);
  const isAuth = useSelector((state) => state.user.isAuth);
  const userTariffs = user?.tariffs.filter((item) => item === "Премиум");

  const [oldPassword, setOldPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");

  const dispatch = useDispatch();

  async function changePassword() {
    try {
      await axios.patch(
        "https://api.check-bets.online/changePassword",
        {
          newPassword: newPassword,
          currentPassword: oldPassword,
        },
        {
          headers: {
            authorization: token,
          },
        }
      );
    } catch (err) { }
  }

  async function changeDataProfile() {
    const response = await axiosClient.patch(
      "https://api.check-bets.online/chandeDataProfile",
      {
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
      },
      {
        headers: {
          authorization: token,
        },
      }
    );
  }

  async function saveData() {
    if (oldPassword.length === 0 && newPassword.length === 0) {
      changeDataProfile();
    } else {
      changeDataProfile();
      changePassword();
    }
  }

  function logout() {
    router.push("/");
    localStorage.setItem("token", "");
    dispatch(clearUser());
  }

  async function byTariffs() {
    const response = await axios.post(
      "http://localhost:8000/buyTariffs",
      {},
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
  }

  React.useEffect(() => {
    setEmail(user?.email);
    setPhone(user?.phone);
    setName(user?.name);
    setLastName(user?.lastname);
  }, [user]);

  React.useEffect(() => {
    setToken(localStorage.getItem("token"));
    if (!isAuth) {
      router.push("/");
    }
  }, [isAuth]);

  React.useEffect(() => { }, []);

  const handleProfil = () => {
    setActiveAccountTab("profil");
  };
  const handlePremium = () => {
    setActiveAccountTab("premium");
  };
  const handlePartner = () => {
    setActiveAccountTab("partner");
  };
  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };
  const togglePasswordVisiblity = () => {
    setPasswordShow(!passwordShow);
  };

  return (
    <MainLayout title={"Личный кабинет"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className={`page-header`}>
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Аккаунт</h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column`}>
              <div className={`account-block`}>
                <div className={`account-tabs w-100`}>
                  <div
                    className={`account-tabs-buttons d-flex justify-content-between`}
                  >
                    <button
                      onClick={handleProfil}
                      className={`btn account-tab-button d-flex align-items-center justify-content-center position-relative ${activeAccountTab === "profil" ? "active" : ""
                        }`}
                    >
                      <img src="../images/profil-icon.svg" alt="" />
                      <span>Профиль</span>
                    </button>
                    <button
                      onClick={handlePremium}
                      className={`btn account-tab-button d-flex align-items-center justify-content-center position-relative ${activeAccountTab === "premium" ? "active" : ""
                        }`}
                    >
                      <img src="../images/premium-icon.svg" alt="" />
                      <span>Премиум</span>
                    </button>
                    <button
                      onClick={handlePartner}
                      className={`btn account-tab-button d-flex align-items-center justify-content-center position-relative ${activeAccountTab === "partner" ? "active" : ""
                        }`}
                    >
                      <img src="../images/partner-icon.svg" alt="" />
                      <span>Партнерка</span>
                    </button>
                  </div>
                  {activeAccountTab === "profil" ? (
                    <div className={`account-tabs-content`}>
                      <div className={`profil-content d-grid`}>
                        <div className={`profil-photo text-center`}>
                          <div className={`profil-ava mx-auto`}>
                            <img
                              className={`w-100 h-100`}
                              src="/images/ava.jpg"
                              alt=""
                            />
                          </div>
                          <label
                            className={`btn btn-change-photo position-relative`}
                          >
                            Изменить фото
                            <input
                              type="file"
                              className={`ava-input position-absolute`}
                            />
                          </label>
                        </div>
                        <div className={`profil-info`}>
                          <div className={`profil-info-content`}>
                            <label
                              className={`profil-info-item d-flex align-items-center`}
                            >
                              <span className={`profil-info-label d-flex`}>
                                Фамилия
                              </span>
                              <div className="profil-input-item">
                                <input
                                  className={`profil-info-input`}
                                  type="text"
                                  onChange={(e) => setLastName(e.target.value)}
                                  value={lastname}
                                />
                              </div>
                            </label>
                            <label
                              className={`profil-info-item d-flex align-items-center`}
                            >
                              <span className={`profil-info-label d-flex`}>
                                Имя
                              </span>
                              <div className="profil-input-item">
                                <input
                                  className={`profil-info-input`}
                                  onChange={(e) => setName(e.target.value)}
                                  type="text"
                                  value={name}
                                />
                              </div>
                            </label>
                            <label
                              className={`profil-info-item d-flex align-items-center`}
                            >
                              <span className={`profil-info-label d-flex`}>
                                ID партнерки
                              </span>
                              <div className="profil-input-item">
                                <input
                                  className={`profil-info-input`}
                                  type="text"
                                  readOnly
                                  value="12548663215DR"
                                />
                              </div>
                            </label>
                            <label
                              className={`profil-info-item d-flex align-items-center`}
                            >
                              <span className={`profil-info-label d-flex`}>
                                Телефон
                              </span>
                              <div className="profil-input-item">
                                <input
                                  className={`profil-info-input`}
                                  onChange={(e) => setPhone(e.target.value)}
                                  type="text"
                                  value={phone}
                                />
                              </div>
                            </label>
                            <label
                              className={`profil-info-item d-flex align-items-center`}
                            >
                              <span className={`profil-info-label d-flex`}>
                                E-mail
                              </span>
                              <div className="profil-input-item">
                                <input
                                  className={`profil-info-input`}
                                  onChange={(e) => setEmail(e.target.value)}
                                  type="email"
                                  value={email}
                                />
                              </div>
                            </label>
                          </div>
                          <div
                            className={`profil-password d-flex justify-content-between`}
                          >
                            <label className={`profil-info-item`}>
                              <span className={`profil-info-label d-flex`}>
                                Текущий пароль
                              </span>
                              <div
                                className={`profil-input-item position-relative`}
                              >
                                <input
                                  className={`profil-info-password`}
                                  type={passwordShow ? "text" : "password"}
                                  value={oldPassword}
                                  onChange={(e) =>
                                    setOldPassword(e.target.value)
                                  }
                                />
                                <span
                                  role="button"
                                  onClick={togglePasswordVisiblity}
                                  className="toggle-vis d-flex align-items-center justify-content-center position-absolute"
                                >
                                  {passwordShow ? (
                                    <img src="/images/hide.svg" alt="" />
                                  ) : (
                                    <img src="/images/show.svg" alt="" />
                                  )}
                                </span>
                              </div>
                            </label>
                            <label className={`profil-info-item `}>
                              <span className={`profil-info-label d-flex`}>
                                Новый пароль
                              </span>
                              <div
                                className={`profil-input-item position-relative`}
                              >
                                <input
                                  className={`profil-info-password`}
                                  type={passwordShow ? "text" : "password"}
                                  value={newPassword}
                                  onChange={(e) =>
                                    setNewPassword(e.target.value)
                                  }
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
                            </label>
                          </div>
                          <button
                            onClick={() => saveData()}
                            className={`btn profil-save`}
                          >
                            Сохранить
                          </button>
                        </div>
                        <div className={`profil-control`}>
                          <button
                            onClick={() => logout()}
                            className={`btn btn_profil-control d-block`}
                          >
                            Выйти
                          </button>
                          <button className={`btn btn_profil-control d-block`}>
                            Удалить аккаунт
                          </button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {activeAccountTab === "premium" ? (
                    <div className={`account-tabs-content`}>
                      <div className={`account-tariff`}>
                        <div
                          className={`account-tariff-top d-flex align-items-center justify-content-between`}
                        >
                          <div
                            className={`tariff-item-head d-flex align-items-start`}
                          >
                            <div className={`tariff-item-logo`}>
                              <img src="../images/tariff_logo-3.svg" alt="" />
                            </div>
                            <div
                              className={`tariff-item-info position-relative`}
                            >
                              <div className={`tariff-item-label text-end`}>
                                тариф
                              </div>
                              <div className={`tariff-item-name`}>Премиум</div>
                              <div className={`tariff-item-text`}>
                                750 ₽/мес
                              </div>
                              <div className={`tariff-status active_status`}>
                                Активен до 23.10.2022
                              </div>
                            </div>
                          </div>
                          <button
                            disabled={
                              userTariffs[0] === "Премиум" ? true : false
                            }
                            onClick={() => byTariffs()}
                            className={`btn btn_tariff-buy btn_account-tariff-buy`}
                          >
                            Купить тариф
                          </button>
                        </div>
                        {/* <div className={`special-offer`}>
                          <div
                            className={`special-offer-name d-flex align-items-center`}
                          >
                            Специальное предложение
                            <div ref={ref}>
                              <span
                                className={`btn-help d-block p-0 ${
                                  show ? "active" : ""
                                }`}
                                onClick={handleClick}
                              >
                                <svg
                                  width="14"
                                  height="15"
                                  viewBox="0 0 14 15"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <rect
                                    x="0.630859"
                                    y="1.16113"
                                    width="12.4919"
                                    height="12.4919"
                                    rx="6.24593"
                                    stroke="white"
                                    stroke-width="0.93689"
                                  />
                                  <path
                                    d="M7.18848 10.5632L7.18848 6.80371"
                                    stroke="white"
                                    stroke-width="0.93689"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M5.93929 6.80371L7.18848 6.80371"
                                    stroke="white"
                                    stroke-width="0.93689"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                  <path
                                    d="M7.18848 4.92444L7.18848 4.29785"
                                    stroke="white"
                                    stroke-width="0.93689"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                  />
                                </svg>
                              </span>
                              <Overlay
                                show={show}
                                target={target}
                                placement={`${
                                  width >= 1339 ? "right-start" : "top"
                                }`}
                                container={ref}
                              >
                                <Tooltip
                                  id="button-tooltip"
                                  className={`text-start`}
                                >
                                  {`Наши прогнозы основаны на статистике, теории вероятности и алгоритмах нейронной сети, которые в конечном итоге формируют ожидаемый счет матча. Подробнее о расчетах можно узнать в разделе Как это работает? Наши прогнозы основаны на статистике, теории вероятности и алгоритмах нейронной сети, которые в конечном итоге формируют.`}
                                </Tooltip>
                              </Overlay>
                            </div>
                          </div>
                          <div className={`special-offer-title`}>
                            Преобрети тариф Премиум на один день{" "}
                            <span>за 150 ₽</span>
                          </div>
                          <div className={`special-offer-under-title`}>
                            до конца октября
                          </div>
                          <div
                            className={`special-offer-choise d-flex align-items-center justify-content-between`}
                          >
                            <label
                              className={`control-radio position-relative`}
                            >
                              На сегодня
                              <input
                                className={`position-absolute`}
                                type="radio"
                                name="offer"
                                checked
                              />
                              <div
                                className={`control_indicator position-absolute`}
                              ></div>
                            </label>
                            <label
                              className={`control-radio position-relative`}
                            >
                              На завтра
                              <input
                                className={`position-absolute`}
                                type="radio"
                                name="offer"
                              />
                              <div
                                className={`control_indicator position-absolute`}
                              ></div>
                            </label>
                          </div>
                          <button
                            className={`btn btn_tariff-buy btn_special-tariff-buy`}
                          >
                            купить тариф
                          </button>
                        </div> */}
                        <div className={`about-tariff seo-text`}>
                          <h2>О тарифе</h2>
                          <p>
                            Check-bets - новая уникальная платформа для анализа
                            футбольных матчей. Каждую неделю мы публикуем
                            прогнозы на матчи топовых европейских чемпионатов и
                            Еврокубков.
                          </p>
                          <p>
                            Наши прогнозы основаны на статистике, теории
                            вероятности и алгоритмах нейронной сети, которые в
                            конечном итоге формируют ожидаемый счет матча.
                            Подробнее о расчетах можно узнать в разделе Как это
                            работает? Наши прогнозы основаны на статистике,
                            теории вероятности и алгоритмах нейронной сети,
                            которые в конечном итоге формируют ожидаемый счет
                            матча. Подробнее о расчетах можно узнать в разделе
                            Как это работает?
                          </p>
                          <p>
                            Check-bets - новая уникальная платформа для анализа
                            футбольных матчей. Каждую неделю мы публикуем
                            прогнозы на матчи топовых европейских чемпионатов и
                            Еврокубков.
                          </p>
                          <p>
                            Наши прогнозы основаны на статистике, теории
                            вероятности и алгоритмах.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {activeAccountTab === "partner" ? (
                    <div className={`account-tabs-content`}>
                      <div className={`account-tariff`}>
                        <div
                          className={`account-tariff-top d-flex align-items-center justify-content-between`}
                        >
                          <div
                            className={`tariff-item-head d-flex align-items-start`}
                          >
                            <div className={`tariff-item-logo`}>
                              <img src="../images/tariff_logo-2.svg" alt="" />
                            </div>
                            <div
                              className={`tariff-item-info position-relative`}
                            >
                              <div className={`tariff-item-label text-end`}>
                                тариф
                              </div>
                              <div className={`tariff-item-name`}>
                                Партнерский
                              </div>
                              <div
                                className={`tariff-status not-active_status`}
                              >
                                Не активен
                              </div>
                            </div>
                          </div>
                          <button
                            className={`btn btn_tariff-buy btn_account-tariff-buy`}
                            disabled
                          >
                            Купить тариф
                          </button>
                        </div>
                        <div className={`tariff-notification`}>
                          Что бы разблокировать аккаунт поставьте ставку на{" "}
                          <a target="_blank" href="/">
                            bk.ru
                          </a>
                          . В противном случае ваш аккаунт будет удален.
                        </div>
                        <div className={`about-tariff seo-text`}>
                          <h2>О тарифе</h2>
                          <p>
                            Check-bets - новая уникальная платформа для анализа
                            футбольных матчей. Каждую неделю мы публикуем
                            прогнозы на матчи топовых европейских чемпионатов и
                            Еврокубков.
                          </p>

                          <p>
                            Наши прогнозы основаны на статистике, теории
                            вероятности и алгоритмах нейронной сети, которые в
                            конечном итоге формируют ожидаемый счет матча.
                            Подробнее о расчетах можно узнать в разделе Как это
                            работает? Наши прогнозы основаны на статистике,
                            теории вероятности и алгоритмах нейронной сети,
                            которые в конечном итоге формируют ожидаемый счет
                            матча. Подробнее о расчетах можно узнать в разделе
                            Как это работает?
                          </p>

                          <p>
                            Check-bets - новая уникальная платформа для анализа
                            футбольных матчей. Каждую неделю мы публикуем
                            прогнозы на матчи топовых европейских чемпионатов и
                            Еврокубков.
                          </p>

                          <p>
                            Наши прогнозы основаны на статистике, теории
                            вероятности и алгоритмах нейронной сети, которые в
                            конечном итоге формируют ожидаемый счет матча.
                            Подробнее о расчетах можно узнать в разделе Как это
                            работает? Наши прогнозы основаны на статистике,
                            теории вероятности и алгоритмах нейронной сети,
                            которые в конечном итоге формируют ожидаемый счет
                            матча. Подробнее о расчетах можно узнать в разделе
                            Как это работает?
                          </p>

                          <p>
                            Check-bets - новая уникальная платформа для анализа
                            футбольных матчей. Каждую неделю мы публикуем
                            прогнозы на матчи топовых европейских чемпионатов и
                            Еврокубков.
                          </p>

                          <p>
                            Наши прогнозы основаны на статистике, теории
                            вероятности и алгоритмах нейронной сети, которые в
                            конечном итоге формируют ожидаемый счет матча.
                            Подробнее о расчетах можно узнать в разделе Как это
                            работает? Наши прогнозы основаны на статистике,
                            теории вероятности и алгоритмах нейронной сети,
                            которые в конечном итоге формируют ожидаемый счет
                            матча. Подробнее о расчетах можно узнать в разделе
                            Как это работает?
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
