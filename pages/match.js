import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../components/breadcrumbs";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import { MainLayout } from "../layouts/MainLayout";
// import { MatchPartner } from "../components/match-partner";
// import { MatchPremium } from "../components/match-premium";
import "swiper/css";
import TableBaseTariffs from "../components/TableBaseTariffs";
import TablePremiumTariffs from "../components/TablePremiumTariffs";
import TablePartnerTariffs from "../components/TablePartnerTariffs";

export default function Match() {
  const numbers = [1, 2, 3, 4, 5, 6, 7];

  const tariffs = useSelector((state) => state.user.user.tariffs);
  console.log(tariffs);
  const [activeForecastTab, setActiveForecastTab] = useState("match");

  const handlematch = () => {
    setActiveForecastTab("match");
  };
  const handletime1 = () => {
    setActiveForecastTab("time1");
  };
  const handletime2 = () => {
    setActiveForecastTab("time2");
  };
  const handletime3 = () => {
    setActiveForecastTab("time3");
  };

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className={`page-header`}>
            <Breadcrumbs />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>
                03.10.2022. Базовый тариф. Архив
              </h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <div
                className={`match-block d-flex justify-content-between align-items-center`}
              >
                <div className={`match-team`}>
                  <h2 className={`match-team-name text-center`}>Риу Аве</h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    Лига Юнайтен Премиум
                  </h3>
                </div>
                <div className={`match-info text-center`}>
                  <div className={`match-date`}>
                    04
                    <span>октября</span>
                    21:45
                  </div>
                  <div className={`match-total`}>
                    <span className={`match-total-label`}>итог</span>0 : 3
                  </div>
                </div>
                <div className={`match-team`}>
                  <h2 className={`match-team-name text-center`}>Санта-Клара</h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    Лига Юнайтен Премиум
                  </h3>
                </div>
              </div>
              {(tariffs === 2 && (
                <TableBaseTariffs
                  activeForecastTab={activeForecastTab}
                  numbers={numbers}
                  handlematch={handlematch}
                  handletime1={handletime1}
                  handletime2={handletime2}
                  handletime3={handletime3}
                />
              )) ||
                (tariffs === 0 && (
                  <TablePremiumTariffs
                    activeForecastTab={activeForecastTab}
                    numbers={numbers}
                    handlematch={handlematch}
                    handletime1={handletime1}
                    handletime2={handletime2}
                    handletime3={handletime3}
                  />
                )) ||
                (tariffs === 1 && (
                  <TablePartnerTariffs
                    activeForecastTab={activeForecastTab}
                    numbers={numbers}
                    handlematch={handlematch}
                    handletime1={handletime1}
                    handletime2={handletime2}
                    handletime3={handletime3}
                  />
                ))}
              <SeoBlock />
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
