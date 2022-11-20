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
import axios from "axios";
import { useRouter } from "next/router";

export default function Match() {
  const numbers = [1, 2, 3, 4, 5, 6, 7];
  const [match, setMatch] = React.useState([]);

  const tariffs = useSelector((state) => state.user.user.tariffs);
  const [activeForecastTab, setActiveForecastTab] = useState("match");
  const [currentMatch, setCurrentMatch] = useState();
  const [listMatchHost, setListMatchHost] = useState();

  const [statsHome, setStatsHome] = React.useState();

  const { query } = useRouter();

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

  async function getCurrentMatch() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/events/data",
      {
        params: { event_id: "10390263" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );

    setCurrentMatch(response.data.data);
  }

  async function getMatchesHome() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/teams/events",
      {
        params: {
          team_id: currentMatch.homeTeam.id,
          course_events: "last",
          page: "0",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );

    setListMatchHost(
      response.data.data.events.filter(
        (item) =>
          item.tournament.name === currentMatch.tournament.name &&
          item.homeTeam.name === currentMatch.homeTeam.name
      )
    );
  }

  React.useEffect(() => {
    getCurrentMatch();
    getMatchesHome();
  }, []);

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
                    {/* {currentMatch.homeTeam.name} */}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {/* {currentMatch.tournament.name} */}
                  </h3>
                </div>
                <div className={`match-info text-center`}>
                  <div className={`match-date`}>
                    04
                    <span>октября</span>
                    21:45
                  </div>
                  <div className={`match-total`}>
                    <span className={`match-total-label`}>итог</span>0 : 0
                  </div>
                </div>
                <div className={`match-team`}>
                  <h2 className={`match-team-name text-center`}>
                    {" "}
                    {/* {currentMatch.awayTeam.name} */}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {/* {currentMatch.tournament.name} */}
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
