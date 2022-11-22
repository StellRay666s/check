import React, { useMemo, useState } from "react";
import { useSelector } from "react-redux";
import Breadcrumbs from "../../components/breadcrumbs";
import SeoBlock from "../../components/seo_block";
import Sidebar from "../../components/sidebar";
import { MainLayout } from "../../layouts/MainLayout";
// import { MatchPartner } from "../components/match-partner";
// import { MatchPremium } from "../components/match-premium";
import { useDispatch } from "react-redux";
import "swiper/css";
import TableBaseTariffs from "../../components/TableBaseTariffs";
import TablePremiumTariffs from "../../components/TablePremiumTariffs";
import TablePartnerTariffs from "../../components/TablePartnerTariffs";
import axios from "axios";
import { useRouter } from "next/router";
import { useFirstRender } from "../../hooks/useFirstRender";
import { fetchCurrentMatch } from "../../redux/slices/currentMatchesSlice";

export default function Match() {
  const numbers = [1, 2, 3, 4, 5, 6, 7];

  const [matchHomeTeam, setMatchHomeTeam] = React.useState([]);
  const [matchAwayTeam, setMatchAwayTeam] = React.useState([]);
  const dispatch = useDispatch();
  const { match } = useSelector((state) => state.match);
  const tariffs = useSelector((state) => state.user.user.tariffs);
  const [activeForecastTab, setActiveForecastTab] = useState("match");
  const [statsFirstMatchHome, setStatsFirstMatchHome] = useState([]);
  const { query } = useRouter();

  const timeStartMatch = match?.startTimestamp;
  const millesecunds = timeStartMatch * 1000;
  const dateObject = new Date(millesecunds);

  const hour = dateObject.toLocaleString("ru-RU", { hour: "numeric" });
  const minuts = dateObject.toLocaleString("ru-RU", { minute: "numeric" });
  const day = dateObject.toLocaleString("ru-RU", { day: "numeric" });
  const month = dateObject.toLocaleString("ru-RU", { month: "long" });

  const matchIdHomeTeam = {
    firstMatch: matchHomeTeam[0]?.id,
    secondMatch: matchHomeTeam[1]?.id,
    thirdMatch: matchHomeTeam[2]?.id,
    fourthMatch: matchHomeTeam[3]?.id,
    fifthMatch: matchHomeTeam[4]?.id,
    sixthMatch: matchHomeTeam[5]?.id,
  };

  function checkKeys() {
    for (let key in matchIdHomeTeam) {
      if (matchIdHomeTeam[key] === null) {
        return false;
      }
    }
  }

  console.log(checkKeys());

  const matchIdAwayTeam = {
    firstMatch: matchAwayTeam[0]?.id,
    secondMatch: matchAwayTeam[1]?.id,
    thirdMatch: matchAwayTeam[2]?.id,
    fourthMatch: matchAwayTeam[3]?.id,
    fifthMatch: matchHomeTeam[4]?.id,
    sixthMatch: matchAwayTeam[5]?.id,
  };

  const goalsForHomeTeam = {
    firstMatch: matchHomeTeam[0]?.homeScore.current,
    secondMatch: matchHomeTeam[1]?.homeScore.current,
    thirdMatch: matchHomeTeam[2]?.homeScore.current,
    fourthMatch: matchHomeTeam[3]?.homeScore.current,
    fifthMatch: matchHomeTeam[4]?.homeScore.current,
    sixthMatch: matchHomeTeam[5]?.homeScore.current,
  };

  const goalsForAwayTeam = {
    firstMatch: matchAwayTeam[0]?.awayScore.current,
    secondMatch: matchAwayTeam[1]?.awayScore.current,
    thirdMatch: matchAwayTeam[2]?.awayScore.current,
    fourthMatch: matchAwayTeam[3]?.awayScore.current,
    fifthMatch: matchAwayTeam[4]?.awayScore.current,
    sixthMatch: matchAwayTeam[5]?.awayScore.current,
  };

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

  async function getStatisticksHome() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
      {
        params: { event_id: matchIdHomeTeam.firstMatch },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    const statsOne = response.data.data;

    if (response) {
      const response2 = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
        {
          params: { event_id: matchIdHomeTeam.secondMatch },
          headers: {
            "X-RapidAPI-Key":
              "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );
      const statsTwo = response2.data.data;

      if (response2) {
        const response3 = await axios.get(
          "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
          {
            params: { event_id: matchIdHomeTeam.thirdMatch },
            headers: {
              "X-RapidAPI-Key":
                "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
              "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
            },
          }
        );
        const statsThree = response3.data.data;

        if (response3) {
          const response4 = await axios.get(
            "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
            {
              params: { event_id: matchIdHomeTeam.fourthMatch },
              headers: {
                "X-RapidAPI-Key":
                  "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
              },
            }
          );
          const statsFour = response4.data.data;
          if (response4) {
            const response5 = await axios.get(
              "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
              {
                params: { event_id: matchIdHomeTeam.fifthMatch },
                headers: {
                  "X-RapidAPI-Key":
                    "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                  "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
                },
              }
            );
            const statsFive = response5.data.data;
            if (response5) {
              const response6 = await axios.get(
                "https://os-sports-perform.p.rapidapi.com/v1/events/statistics",
                {
                  params: { event_id: matchIdHomeTeam.sixthMatch },
                  headers: {
                    "X-RapidAPI-Key":
                      "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                    "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
                  },
                }
              );

              const statsSix = response6.data.data;
              setStatsFirstMatchHome(
                statsFirstMatchHome.concat(
                  statsOne.concat(
                    statsTwo.concat(
                      statsThree.concat(
                        statsFour.concat(statsFive.concat(statsSix))
                      )
                    )
                  )
                )
              );
            }
          }
        }
      }
    }
  }

  async function getPreviousMatchesAwayTeam(match) {
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
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    setMatchAwayTeam(
      response.data.data.events
        .filter(
          (item) =>
            (item.tournament.id === match.tournament.id) &
            (item.awayTeam.name === match.awayTeam.name)
        )
        .reverse()
    );
  }

  async function getPreviousMatchHomeTeam(match) {
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
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    setMatchHomeTeam(
      response.data.data.events
        .filter(
          (item) =>
            (item.tournament.id === match.tournament.id) &
            (item.homeTeam.id === match.homeTeam.id)
        )
        .reverse()
    );
  }

  console.log(statsFirstMatchHome);

  React.useEffect(() => {
    dispatch(fetchCurrentMatch({ query }));
    if (match) {
      getPreviousMatchHomeTeam(match);
      getPreviousMatchesAwayTeam(match);

      getStatisticksHome();
    }
  }, [query, dispatch]);

  return (
    <MainLayout title={"Матч"}>
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
                    {match?.homeTeam.name}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {match?.tournament.name}
                  </h3>
                </div>
                <div className={`match-info text-center`}>
                  <div className={`match-date`}>
                    {day}
                    <span>{month}</span>
                    {hour}:{minuts}
                  </div>
                  <div className={`match-total`}>
                    <span className={`match-total-label`}>итог</span>0 : 0
                  </div>
                </div>
                <div className={`match-team`}>
                  <h2 className={`match-team-name text-center`}>
                    {" "}
                    {match?.awayTeam.name}
                  </h2>
                  <div className={`match-team-logo mx-auto`}>
                    <img src="../images/match-team.png" alt="" />
                  </div>
                  <h3 className={`match-team-league text-center m-0`}>
                    {match?.tournament.name}
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
