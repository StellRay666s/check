import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";
import axios from "axios";

import "swiper/css";

export default function FootballLeagues() {
  const [countries, setCountries] = React.useState([]);
  const [leagues, setLeagues] = React.useState([
    {
      name: "A-League",
      id: 105226,
      uniqueId: 136,
      logo: "../assets/A-league.png",
    },
    {
      name: "Bundesliga",
      id: 71900,
      uniqueId: 45,
    },
    {
      name: "2. Liga",
      id: 30,
      uniqueId: 135,
    },
    {
      name: "Premier League",
      id: 1,
      uniqueId: 17,
    },
    {
      name: "Championship",
      id: 2,
    },
    {
      name: "Liga Profesional de Fútbol",
      id: 21788,
    },
    {
      name: "ProLeague",
      id: 38,
    },
    {
      name: "Чемпионат Бразилии",
      id: 83,
    },
    {
      name: "Чемпионат Бразилии B",
      id: 1449,
    },
    {
      name: "Бундеслига Германия",
      id: 42,
    },
    {
      name: "Бундеслига Германия 2",
      id: 41,
    },
    {
      name: "Супер лига греция",
      id: 127,
    },
    {
      name: "Супер лига дания",
      id: 12,
    },
    {
      name: "Примера",
      id: 36,
    },
    {
      name: "Сегунда",
      id: 37,
    },
    {
      name: "Серия А Италия",
      id: 31,
    },
    {
      name: "Серия В Италия",
      id: 34,
    },
    {
      name: "Суперлига Китай",
      id: 652,
    },
    {
      name: "Лига МХ",
      id: 28,
    },
    {
      name: "Высшая лига Нидерланды",
      id: 39,
    },
    {
      name: "Первый дивизион Нидерланды",
      id: 40,
    },
    {
      name: "Первый дивизион Нидерланды",
      id: 40,
    },
    {
      name: "Высшая лига Норвегия",
      id: 796,
    },
    {
      name: "Премьер лига Польша",
      id: 64,
    },
    {
      name: "Премьер лига Россия",
      id: 53,
    },
    {
      name: "Первая лига Словакия",
      id: 92,
    },
    {
      name: "Первая лига Словения",
      id: 94,
    },
    {
      name: "Первая лига Словения",
      id: 94,
    },
    {
      name: "МЛС",
      id: 18,
    },
    {
      name: "Суперлига турция",
      id: 62,
    },
    {
      name: "Первая лига франция",
      id: 4,
    },
    {
      name: "ХНЛ Хорватия",
      id: 48,
    },
    {
      name: "Первая лига Чехия",
      id: 49,
    },
    {
      name: "Второй дивизион Чехия",
      id: 843,
    },
    {
      name: "Второй дивизион Чехия",
      id: 843,
    },
    {
      name: "Суперлига Швейцария",
      id: 1060,
    },
    {
      name: "Первая лига Швейцария",
      id: 25,
    },
    {
      name: "Высшая лига Швеция",
      id: 24,
    },
    {
      name: "Первая лига Швеция",
      id: 27,
    },
    {
      name: "Премьер лига Шотландия",
      id: 54,
    },
    {
      name: "К-лига 1 Южная-Корея",
      id: 39098,
    },
    {
      name: "Лига джей-1 Япония",
      id: 82,
    },
    {
      name: "Высший дивизион",
      id: 31977,
    },
  ]);

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs title={"Футбольные лиги"} />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Футбольные лиги</h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <div className={`leagues-lists d-grid`}>
                <div className={`leagues-list-column`}>
                  {leagues.slice(0, 23).map((item, index) => (
                    <Link href={`/league/${item.id}`}>
                      <a className={`league-item d-flex align-items-center`}>
                        <div className="league-icon">
                          <img src={"../images/league.png"} alt="" />
                        </div>
                        <div className="league-name">{item.name}</div>
                      </a>
                    </Link>
                  ))}
                </div>
                <div className={`leagues-list-column`}>
                  {leagues.slice(24, 45).map((item, index) => (
                    <Link href={`/league/${item.id}`}>
                      <a className={`league-item d-flex align-items-center`}>
                        <div className="league-icon">
                          <img src="../images/league.png" alt="" />
                        </div>
                        <div className="league-name">{item.name}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <MainTriggersBlock />
              <SeoBlock />
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
