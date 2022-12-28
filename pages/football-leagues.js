import React, { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { MainLayout } from "../layouts/MainLayout";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";
import { fetchLeagues } from "../redux/slices/leagueSlice";
import "swiper/css";

export default function FootballLeagues() {
  const [countries, setCountries] = React.useState([]);

  const dispatch = useDispatch();
  const leag = useSelector((state) => state.league);

  React.useEffect(() => {
    dispatch(fetchLeagues());
  }, [dispatch]);

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
                  {leag.leag?.slice(0, 23).map((item, index) => (
                    <Link key={index} href={`/league/${item.TEMPLATE_ID}`}>
                      <a className={`league-item d-flex align-items-center`}>
                        <div className="league-icon">
                          <img src={"../images/league.png"} alt="" />
                        </div>
                        <div className="league-name">{item.LEAGUE_NAME}</div>
                      </a>
                    </Link>
                  ))}
                </div>
                <div className={`leagues-list-column`}>
                  {leag?.leag?.slice(24, 45).map((item, index) => (
                    <Link key={index} href={`league/${item.id}`}>
                      <a className={`league-item d-flex align-items-center`}>
                        <div className="league-icon">
                          <img src="../images/league.png" alt="" />
                        </div>
                        <div className="league-name">{item.LEAGUE_NAME}</div>
                      </a>
                    </Link>
                  ))}
                </div>
              </div>
              <MainTriggersBlock />
              <SeoBlock />
            </div>
            <Sidebar leagues={leag} />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}

//    item.ACTUAL_TOURNAMENT_SEASON_ID === "198_dYlOSQOD"
