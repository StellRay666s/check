import React from "react";
import Link from "next/link";
import Search from "./search";
import { useSwitchPhrase } from "../hooks/useSwitchPhrase";

export default function Footer() {
  const { isLoad } = useSwitchPhrase();

  return (
    <>
      <footer className={`main-footer`}>
        <div className={`footer-content`}>
          <div className={`container mx-auto d-flex`}>
            <div className={`footer-left`}>
              <Link href="/">
                <a className={`footer-logo d-inline-block`}>
                  Выбирай <span>прогноз</span>
                </a>
              </Link>
              {isLoad ? (
                <div className={`footer-under-logo`}>
                  We strive <span>to be the best</span>
                </div>
              ) : (
                <div className={`footer-under-logo`}>
                  To get a glory get a <span>fight to the win </span>
                </div>
              )}

              <Search />
              <Link href="/">
                <a className={`footer-left-link footer-left-link-tg d-block`}>
                  Telegram
                </a>
              </Link>
              <Link href="/">
                <a
                  className={`footer-left-link footer-left-link-email d-block`}
                >
                  sport@mail.ru
                </a>
              </Link>
            </div>
            <div className={`footer-info`}>
              <div className={`footer-name`}>Как это работает?</div>
              <div className={`footer-info-text`}>
                Основа наших прогнозов – алгоритм который был выстроен нашей
                командой. Он основан на 5 прикладных науках и 2 теориях.
              </div>
            </div>
            <div className={`footer-menu-list`}>
              <div className={`footer-name`}>Лиги</div>
              <ul className={`list-none p-0 m-0`}>
                <li>
                  <Link href="/">
                    <a>Лига Чемпионов</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Лига Европы</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Испания. Ла Лига</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Италия. Серия А</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Германия. Бундеслига</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Португалия. Примейра</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Нидерланды. Эредивизия</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Франция. Лига 1</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Англия. Премьер Лига</a>
                  </Link>
                </li>
              </ul>
            </div>
            <div className={`footer-menu-list`}>
              <div className={`footer-name`}>тарифы</div>
              <ul className={`list-none p-0 m-0`}>
                <li>
                  <Link href="/">
                    <a>Бесплатный</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Партнерка</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Премиум</a>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className={`under-footer`}>
          <div
            className={`container mx-auto d-flex align-items-center justify-content-between`}
          >
            <Link href="/">
              <a className={`under-footer-link`}>
                Соглашение на обработку персональных данных
              </a>
            </Link>
            <Link href="/">
              <a className={`under-footer-link`}>
                Политика конфенденциальности
              </a>
            </Link>
            <Link href="">
              <a className={`is-art-link d-flex align-items-center`}>
                Разработано <img src="../images/is-art.svg" alt="" />
              </a>
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
