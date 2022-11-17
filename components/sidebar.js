import React from "react";
import Link from "next/link";
import SidebarLeagues from "./sidebar/sidebar-leagues";
import SidebarMatches from "./sidebar/sidebar-matches";
import SidebarNews from "./sidebar/sidebar-news";
import SidebarTariffs from "./sidebar/sidebar-tariffs";

export default function Sidebar() {
  return (
    <div className={`sidebar w-100`}>
      <Link href="/">
        <a
          className={`btn sidebar-link sidebar-telegram_link d-flex align-items-center justify-content-between w-100 position-relative`}
        >
          Мы в Telegram
          <img src="../images/telegram.svg" alt="" />
        </a>
      </Link>
      <Link href="/archive">
        <a
          className={`btn sidebar-link sidebar-archive_link d-flex align-items-center justify-content-between w-100 position-relative`}
        >
          Архив матчей
          <img src="../images/sidebar-arrow_r.svg" alt="" />
        </a>
      </Link>

      <SidebarMatches />
      <SidebarTariffs />
      <SidebarLeagues />
      <SidebarNews />
    </div>
  );
}
