import React, { useState } from "react";

import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { MainLayout } from "../../layouts/MainLayout";
import MainTriggersBlock from "../../components/main-triggers_block";
import SeoBlock from "../../components/seo_block";
import Sidebar from "../../components/sidebar";
import Breadcrumbs from "../../components/breadcrumbs";


import "swiper/css";
import PronosisTable from "../../components/PronosisTable";
import axios from "axios";
import { setCurrentLeag } from "../../redux/slices/leagueSlice";

export default function League() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9]
  const [isLoad, setIsLoad] = React.useState(false);
  const [tournament, setTournamet] = React.useState()
  const [tomorrowMatches, setTomorrowMatches] = React.useState([]);
  const todayMatches = useSelector((state) => state.matches.todayFootball)

  const { query } = useRouter();


  React.useEffect(() => {
    setTournamet(todayMatches.filter(item => item.TEMPLATE_ID === query.id))
  }, [query.id])

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
                  logo={tournament?.[0]?.TOURNAMENT_IMAGE?.replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  seasonName={tournament?.[0]?.NAME}
                  sportTitle={"Футбол"}
                  id={query.id}
                  isLoad={isLoad}
                  namePart2={tomorrowMatches?.NAME_PART_2}
                  matches={tournament?.[0]?.EVENTS}
                  numbers={numbers}
                  titleTable={"Сегодня"}
                />
              )}
              {tomorrowMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  logo={tomorrowMatches?.[0]?.TOURNAMENT_IMAGE.replace(
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
