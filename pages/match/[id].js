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
  const [matchCurrntLeagAway, setMatchCurrntLeagAway] = useState([]);
  const [matchCurrntLeagHome, setMatchCurrntLeagHome] = useState([]);

  const lastMatchesAway = matchCurrntLeagAway
    .filter(
      (item) =>
        item.tournament.id === match.tournament.id &&
        item.awayTeam.name === match.awayTeam.name
    )
    .reverse();

  const lastMatchesHome = matchCurrntLeagHome
    .filter(
      (item) =>
        item.tournament.id === match.tournament.id &&
        item.homeTeam.name === match.homeTeam.name
    )
    .reverse();

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

  const { query } = useRouter();

  async function getCurrentMatch() {
    try {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/events/data",
        {
          params: { event_id: query.id },
          headers: {
            "X-RapidAPI-Key":
              "5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );
      setMatch(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  async function getMatchsAwayTeam() {
    try {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/teams/events",
        {
          params: {
            team_id: match.awayTeam.id,
            course_events: "last",
            page: "0",
          },
          headers: {
            "X-RapidAPI-Key":
              "5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );
      setMatchCurrntLeagAway(response.data.data.events);
    } catch (err) {
      console.log(err);
    }
  }

  async function getMatchesHomeTeam() {
    try {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/teams/events",
        {
          params: {
            team_id: match.homeTeam.id,
            course_events: "last",
            page: "0",
          },
          headers: {
            "X-RapidAPI-Key":
              "5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );
      setMatchCurrntLeagHome(response.data.data.events);
    } catch (err) {
      console.log(err);
    }
  }

  async function getFirstMatchAway() {
    try {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
        {
          params: { event_id: lastMatchesAway[0] },
          headers: {
            "X-RapidAPI-Key":
              "5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );
      console.log(response.data.data);
    } catch (error) {}
  }

  const a = React.useEffect(() => {
    // getCurrentMatch();
    // getMatchsAwayTeam();
    // getMatchesHomeTeam();
    // getFirstMatchAway();
  }, [query.id, match]);

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
                    {/* {match.homeTeam.name} */}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {/* {match.tournament.name} */}
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
                    {/* {match.awayTeam.name} */}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {/* {match.tournament.name} */}
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
