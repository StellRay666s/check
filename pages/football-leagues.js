import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";

import "swiper/css";
import axios from "axios";

export default function FootballLeagues() {
  const leagues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [league, setLeague] = React.useState([]);

  console.log(league);

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Футбольные лиги</h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <div className={`leagues-lists d-grid`}>
                <div className={`leagues-list-column`}>
                  <Link href="/">
                    <a className={`league-item d-flex align-items-center`}>
                      <div className="league-icon">
                        <img src="../images/league.png" alt="" />
                      </div>
                      <div className="league-name">Лига Чемпионов</div>
                    </a>
                  </Link>
                </div>
                <div className={`leagues-list-column`}>
                  {leagues.map((index) => (
                    <Link key={index} href="/">
                      <a className={`league-item d-flex align-items-center`}>
                        <div className="league-icon">
                          <img src="../images/league.png" alt="" />
                        </div>
                        <div className="league-name">Лига Чемпионов</div>
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
