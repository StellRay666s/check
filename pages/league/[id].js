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

  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("ru-RU", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  let a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];

  var tommorowDate = new Date(+new Date());
  let today = join(tommorowDate, a, "-");

  var tommorowDate = new Date(+new Date() + 86400000);
  let tomorrow = join(tommorowDate, a, "-");

  async function getMatchOneLeag() {
    const reponse = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/events/schedule/date",
      {
        params: { sport_id: "1", date: "2022-11-26" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );

    setIsLoad(true);

    setTodayMatches(
      reponse.data.data.filter(
        (item) => item.tournament.id === Number(query.id)
      )
    );

    // const reponse2 = await axios.get(
    //   "https://os-sports-perform.p.rapidapi.com/v1/events/schedule/date",
    //   {
    //     params: { sport_id: "1", date: tomorrow },
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
    //       "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
    //     },
    //   }
    // );

    // setTomorrowMatches(
    //   reponse2.data.data.filter(
    //     (item) => item.tournament.id === Number(query.id)
    //   )
    // );

    setIsLoad(true);
  }

  React.useEffect(() => {
    getMatchOneLeag();
  }, []);

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
                  sportTitle={"Футбол"}
                  id={query.id}
                  isLoad={isLoad}
                  matches={todayMatches}
                  numbers={numbers}
                  titleTable={"Сегодня"}
                />
              )}
              {tomorrowMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  id={query.id}
                  matches={tomorrowMatches}
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
