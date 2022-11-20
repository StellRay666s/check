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
  const [tomorrowMatches, setTomorrowMatches] = React.useState([]);
  const { query } = useRouter();

  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  let a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
  let today = join(new Date(), a, "-");

  var tommorowDate = new Date(+new Date() + 86400000);
  let tommorow = join(tommorowDate, a, "-");

  React.useEffect(() => {
    axios
      .get("https://os-sports-perform.p.rapidapi.com/v1/events/schedule/date", {
        params: { sport_id: "1", date: today },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      })
      .then((res) => setTodayMatches(res.data.data));
    axios
      .get("https://os-sports-perform.p.rapidapi.com/v1/events/schedule/date", {
        params: { sport_id: "1", date: tommorow },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      })
      .then((res) => setTomorrowMatches(res.data.data));
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
              <PronosisTable
                sportTitle={"Футбол"}
                id={query.id}
                matches={todayMatches}
                numbers={numbers}
                logo={
                  "https://f0.pngfuel.com/png/604/367/2017-18-premier-league-chelsea-f-c-burnley-f-c-manchester-united-f-c-2016-17-premier-league-premier-league-trophy-png-clip-art.png"
                }
                titleTable={"Сегодня"}
              />
              {/* <PronosisTable
                id={query.id}
                matches={tomorrowMatches}
                numbers={numbers}
                logo={
                  "https://f0.pngfuel.com/png/604/367/2017-18-premier-league-chelsea-f-c-burnley-f-c-manchester-united-f-c-2016-17-premier-league-premier-league-trophy-png-clip-art.png"
                }
                titleTable={"Завтра"}
              /> */}

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
