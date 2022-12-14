import React, { useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import SeoBlock from "../../components/seo_block";
import Sidebar from "../../components/sidebar";
import { MainLayout } from "../../layouts/MainLayout";
// import { MatchPartner } from "../components/match-partner";
// import { MatchPremium } from "../components/match-premium";
import "swiper/css";
import TableBaseTariffs from "../../components/TableBaseTariffs";
import TablePremiumTariffs from "../../components/TablePremiumTariffs";
import TablePartnerTariffs from "../../components/TablePartnerTariffs";
import { useCalculateFormule } from "../../utils/useCalculateFormula";

export default function Match() {
  const [activeForecastTab, setActiveForecastTab] = useState("match");
  const tariffs = useSelector((state) => state.user.tariffs);



  const {
    currentMatch,
    hour,
    minute,
    day,
    month,
    tournament,
    statsAll,
    firstTime,
    secondTime,
    firstPeriod,
    secondPeriod,
    thirdPeriod,
  } = useCalculateFormule();

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

  React.useEffect(() => { }, [tariffs]);

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
                  <h2 className={`match-team-name text-center`}>
                    {currentMatch?.HOME_NAME}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img
                      src={currentMatch?.HOME_IMAGES[0].replace(
                        "flashscore",
                        "flashscorekz"
                      )}
                      alt=""
                    />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {tournament?.NAME}
                  </h3>
                </div>
                <div className={`match-info text-center`}>
                  <div className={`match-date`}>
                    {day}
                    <span>{month}</span>
                    {hour}:{minute < 9 && minute + "0"}
                  </div>
                  <div className={`match-total`}>
                    <span className={`match-total-label`}>итог</span>0 : 0
                  </div>
                </div>
                <div className={`match-team`}>
                  <h2 className={`match-team-name text-center`}>
                    {" "}
                    {currentMatch?.AWAY_NAME}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img
                      src={currentMatch?.AWAY_IMAGES[0].replace(
                        "flashscore",
                        "flashscorekz"
                      )}
                      alt=""
                    />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {tournament?.NAME}
                  </h3>
                </div>
              </div>
              {(tariffs[0] === "Базовый" && (
                <TableBaseTariffs
                  activeForecastTab={activeForecastTab}
                  logoHome={currentMatch?.HOME_IMAGES[0].replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  logoAway={currentMatch?.AWAY_IMAGES[0].replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  numbers={[1, 2, 3, 4, 5]}
                  handlematch={handlematch}
                  handletime1={handletime1}
                  handletime2={handletime2}
                  handletime3={handletime3}
                  tournament={tournament}
                  statsAll={statsAll}
                  firstTime={firstTime}
                  secondTime={secondTime}
                  firstPeriod={firstPeriod}
                  secondPeriod={secondPeriod}
                  thirdPeriod={thirdPeriod}
                />
              )) ||
                (tariffs[0] === "Премиум" && (
                  <TablePremiumTariffs
                    logoHome={currentMatch?.HOME_IMAGES[0].replace(
                      "flashscore",
                      "flashscorekz"
                    )}
                    logoAway={currentMatch?.AWAY_IMAGES[0].replace(
                      "flashscore",
                      "flashscorekz"
                    )}
                    activeForecastTab={activeForecastTab}
                    tournament={tournament}
                    statsAll={statsAll}
                    firstTime={firstTime}
                    secondTime={secondTime}
                    firstPeriod={firstPeriod}
                    secondPeriod={secondPeriod}
                    thirdPeriod={thirdPeriod}
                    handlematch={handlematch}
                    handletime1={handletime1}
                    handletime2={handletime2}
                    handletime3={handletime3}
                  />
                )) ||
                (tariffs[0] === "Партнерский" && (
                  <TablePartnerTariffs
                    logoHome={currentMatch?.HOME_IMAGES[0].replace(
                      "flashscore",
                      "flashscorekz"
                    )}
                    logoAway={currentMatch?.AWAY_IMAGES[0].replace(
                      "flashscore",
                      "flashscorekz"
                    )}
                    activeForecastTab={activeForecastTab}
                    // numbers={numbers}
                    handlematch={handlematch}
                    handletime1={handletime1}
                    handletime2={handletime2}
                    handletime3={handletime3}
                    tournament={tournament}
                    statsAll={statsAll}
                    firstTime={firstTime}
                    secondTime={secondTime}
                    firstPeriod={firstPeriod}
                    secondPeriod={secondPeriod}
                    thirdPeriod={thirdPeriod}
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
