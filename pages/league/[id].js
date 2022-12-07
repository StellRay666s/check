import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { MainLayout } from "../../layouts/MainLayout";
import MainTriggersBlock from "../../components/main-triggers_block";
import SeoBlock from "../../components/seo_block";
import Sidebar from "../../components/sidebar";
import Breadcrumbs from "../../components/breadcrumbs";
import { useGetToTheMatch } from "../../hooks/useGetToTheMatch";

import "swiper/css";
import PronosisTable from "../../components/PronosisTable";
import axios from "axios";

export default function League() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [todayMatches, setTodayMatches] = React.useState([]);
  const [isLoad, setIsLoad] = React.useState(false);
  const [tomorrowMatches, setTomorrowMatches] = React.useState([]);

  console.log(todayMatches);

  const { query } = useRouter();

  async function getMatchOneLeag() {
    const reponse = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "1",
          indent_days: "0",
          timezone: "3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );

    setIsLoad(true);

    setTodayMatches(
      reponse.data.DATA.filter((item) => item.TOURNAMENT_ID === query.id)
    );

    const reponse2 = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "1",
          indent_days: "1",
          timezone: "3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );

    setTomorrowMatches(
      reponse2.data.DATA.filter((item) => item.TOURNAMENT_ID === query.id)
    );

    setIsLoad(true);
  }

  React.useEffect(() => {
    getMatchOneLeag();
  }, [query]);

  console.log(tomorrowMatches);

  return (
    <MainLayout title={"Лига"}>
      <main>
        <div
          className={`main-content pages-content page-league-content sidebar-translate`}
        >
          <div className="page-header">
            <Breadcrumbs />
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              {todayMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  logo={todayMatches[0]?.TOURNAMENT_IMAGE.replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  seasonName={todayMatches[0]?.NAME}
                  sportTitle={"Футбол"}
                  id={query.id}
                  isLoad={isLoad}
                  namePart2={tomorrowMatches.NAME_PART_2}
                  matches={todayMatches}
                  numbers={numbers}
                  titleTable={"Сегодня"}
                />
              )}
              {tomorrowMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  logo={tomorrowMatches[0]?.TOURNAMENT_IMAGE.replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  seasonName={tomorrowMatches[0]?.NAME}
                  id={query.id}
                  matches={tomorrowMatches}
                  namePart2={tomorrowMatches.NAME_PART_2}
                  numbers={numbers}
                  titleTable={"Завтра"}
                />
              )}

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
