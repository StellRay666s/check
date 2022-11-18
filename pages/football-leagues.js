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
  const leagues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [league, setLeague] = React.useState([]);

  React.useEffect(() => {
    axios
      .get("https://os-sports-perform.p.rapidapi.com/v1/tournaments", {
        params: { category_id: "1" },
        headers: {
          "X-RapidAPI-Key":
            "be050b25e5msh6c1665177826c1cp187ca3jsn813ff1055e41",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      })
      .then((res) => setLeague(res.data.data));
  }, []);

  console.log(league);

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
                  <Link href="/league/1">
                    <a className={`league-item d-flex align-items-center`}>
                      <div className="league-icon">
                        <img src="../images/league.png" alt="" />
                      </div>
                      <div className="league-name">Лига Чемпионов</div>
                    </a>
                  </Link>
                </div>
                <div className={`leagues-list-column`}>
                  {/* {league.map((item, index) => (
                    <Link key={index} href={``}>
                      <a
                        onClick={() => console.log(item.category.id)}
                        className={`league-item d-flex align-items-center`}
                      >
                        <div className="league-icon">
                          <img src="../images/league.png" alt="" />
                        </div>
                        <div className="league-name">{item.name}</div>
                      </a>
                    </Link>
                  ))} */}
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
