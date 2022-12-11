import React from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import {
  setActiveMainMenu,
  setActiveUnderMenu,
} from "../redux/slices/menuSlice";

import Login from "./login";
import Search from "./search";

export default function Header() {
  const [active, setActtive] = React.useState(true);
  const [width, setWidth] = React.useState();
  const [menuList, setMenuList] = React.useState([
    {
      title: "КАК ЭТО РАБОТАЕТ?",
      path: "how-it-work",
    },
    {
      title: "ЛИГИ",
      path: "",
    },
    {
      title: "ТАРИФЫ",
      path: "tariffs",
    },
    {
      title: "НОВОСТИ",
      path: "news",
    },
    {
      title: "Telegram",
      path: "",
    },
  ]);

  const underMenu = [
    { title: "Хоккейная лига НХЛ", path: "hockey-league" },
    { title: "Футбольный лиги", path: "football-leagues" },
  ];

  const dispatch = useDispatch();
  const isActive = useSelector((state) => state.menu.isActive);
  const isActiveUnderMenu = useSelector(
    (state) => state.menu.isActiveUnderMenu
  );

  React.useEffect(() => {
    setActtive(false);
    window.addEventListener("resize", () => {
      setWidth(window.innerWidth);
    });

    if (width < 1025) {
      setActtive(false);
      setMenuList(menuList);
    }

    if (width > 1025) {
      setMenuList(menuList.filter((item) => item.title != "Telegram"));
      setActtive(true);
    }
  }, [width]);

  return (
    <>
      <div className={`main-header position-absolute`}>
        <div className={`main-header-logo-decore position-absolute`}>
          <div className={`main-header-logo-decore_bg`}></div>
        </div>
        <div className={`main-header-content`}>
          <div
            className={`container-max mx-auto d-flex align-items-center justify-content-between`}
          >
            <div className={`main-header-logo position-relative`}>
              <Link href="/">
                <a className={`main-header-logo_link position-relative`}>
                  <img src="../images/logo.svg" alt="" />
                </a>
              </Link>
            </div>
            {active && (
              <nav className={`main-header-menu flex-grow-1`}>
                <Search />

                <ul
                  className={`main-header-menu_list d-flex align-items-center list-none p-0 m-0`}
                >
                  {menuList.map((link, index) => (
                    <>
                      <li
                        className={`${
                          link.title === "ЛИГИ" &&
                          "menu-item-has-child position-relative"
                        }`}
                        key={index}
                      >
                        <Link
                          className={`${
                            link.title === "ЛИГИ"
                              ? `header-menu-link d-flex align-items-center position-relative`
                              : ""
                          }`}
                          href={`/${link.path}`}
                        >
                          <a
                            className={`header-menu-link d-flex align-items-center position-relative ${
                              isActive === index ? "active" : ""
                            }`}
                            onClick={() => dispatch(setActiveMainMenu(index))}
                          >
                            {link.title}
                          </a>
                        </Link>
                        <ul className={`main-header-sub-menu list-none m-0`}>
                          {underMenu.map((undMenu, index) => (
                            <li key={index}>
                              <Link href={`/${undMenu.path}`}>
                                <a
                                  onClick={() =>
                                    dispatch(setActiveUnderMenu(index))
                                  }
                                  className={`header-sub-menu-link d-flex align-items-center w-100 ${
                                    isActiveUnderMenu === index && "active"
                                  }`}
                                >
                                  {undMenu.title}
                                </a>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    </>
                  ))}
                </ul>
              </nav>
            )}
            <Search />
            <Login />
            <button
              onClick={() => setActtive(!active)}
              class="btn btn-hamburger js_hamburger"
            >
              <span></span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <li className={`menu-item-has-child position-relative`}>
                                <Link href="#">
                                    <a className={`header-menu-link d-flex align-items-center position-relative`}>Лиги</a>
                                </Link>
                                <ul className={`main-header-sub-menu list-none m-0`}>
                                    <li>
                                        <Link href="">
                                            <a className={`header-sub-menu-link d-flex align-items-center w-100`}>Хоккейная лига НХЛ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="">
                                            <a className={`header-sub-menu-link active d-flex align-items-center w-100`}>Футбольные лиги</a>
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                            <li></li> */
}
