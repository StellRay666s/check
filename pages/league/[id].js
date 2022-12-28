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

  const { query } = useRouter();

  function getMatchLeag() {
    const { data } = axios.get(
      `http://localhost:8000/getFilterMatch?id=${query.id}`
    );
  }

  React.useEffect(() => {
    getMatchLeag();
  }, [query]);

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
