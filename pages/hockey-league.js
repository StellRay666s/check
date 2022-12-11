import React, { useState } from "react";
import Link from "next/link";
import PronosisTable from "../components/PronosisTable";
import { MainLayout } from "../layouts/MainLayout";
import Breadcrumbs from "../components/breadcrumbs";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import axios from "axios";
function HockeyLeague() {
  const [tomorrowMatches, setTommorowMatches] = useState([]);
  const [todayMatches, setTodayMatches] = useState([]);

  async function getNhlMatch() {
    try {
      const response = await axios.get(
        "https://flashlive-sports.p.rapidapi.com/v1/events/list",
        {
          params: {
            locale: "ru_RU",
            sport_id: "4",
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

      const response2 = await axios.get(
        "https://flashlive-sports.p.rapidapi.com/v1/events/list",
        {
          params: {
            locale: "ru_RU",
            sport_id: "4",
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
      setTommorowMatches(
        response2.data.DATA.filter((item) => item.NAME === "США: НХЛ")
      );
      setTodayMatches(
        response.data.DATA.filter((item) => item.NAME === "США: НХЛ")
      );
    } catch (err) {}
  }

  React.useEffect(() => {
    getNhlMatch();
  }, []);

  return (
    <MainLayout title={"Хоккейная лига"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs title={"Хоккейные лиги"} />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Хоккейная лига</h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              {todayMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  seasonName={todayMatches[0]?.NAME}
                  sportTitle={"Хоккей"}
                  titleTable={"сегодня"}
                  logo={todayMatches[0]?.TOURNAMENT_IMAGE.replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  matches={todayMatches}
                  title={"Национальная хоккейная лига"}
                />
              )}
              {/* {tomorrowMatches.length === 0 ? (
                "Нету матчей"
              ) : (
                <PronosisTable
                  seasonName={tomorrowMatches[0]?.NAME}
                  sportTitle={"Хоккей"}
                  titleTable={"завтра"}
                  logo={tomorrowMatches[0]?.TOURNAMENT_IMAGE.replace(
                    "flashscore",
                    "flashscorekz"
                  )}
                  matches={tomorrowMatches}
                  title={"Национальная хоккейная лига"}
                />
              )} */}
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

export default HockeyLeague;

// Сегоднешние матчи хоккей
// const options = {
//   method: 'GET',
//   url: 'https://flashlive-sports.p.rapidapi.com/v1/events/list',
//   params: {locale: 'ru_RU', sport_id: '4', indent_days: '1', timezone: '-1'},
//   headers: {
//     'X-RapidAPI-Key': '5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877',
//     'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
//   }
// };

// Завтрашние матчи хоккей
// const options = {
//   method: 'GET',
//   url: 'https://flashlive-sports.p.rapidapi.com/v1/events/list',
//   params: {locale: 'ru_RU', sport_id: '4', indent_days: '2', timezone: '-1'},
//   headers: {
//     'X-RapidAPI-Key': '5d6787e69bmsh00abb8e031c7a3ap173526jsnf0d37da2a877',
//     'X-RapidAPI-Host': 'flashlive-sports.p.rapidapi.com'
//   }
// };
