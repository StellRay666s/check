import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";
import axios from "axios";

import "swiper/css";

export default function FootballLeagues() {
  // const leagues = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const [countries, setCountries] = React.useState([]);
  const [leagues, setLeagues] = React.useState([]);

  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  let a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
  let dayToday = join(new Date(), a, "-");

  async function getEnglandLeag() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
      {
        params: { category_id: "1" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    const engLeag = response.data.data.filter(
      (item) => item.name === "Premier League" || item.name === "Championship"
    );

    const response2 = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
      {
        params: { category_id: "17" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    const austriaLeag = response2.data.data.filter(
      (item) => item.name === "Bundesliga" || item.name === "2. Liga"
    );

    const response3 = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
      {
        params: { category_id: "48" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    const argentinaLeag = response3.data.data.filter(
      (item) => item.name === "Liga Profesional de Fútbol"
    );

    const response4 = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
      {
        params: { category_id: "33" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      }
    );
    const belgiaLeag = response4.data.data.filter(
      (item) => item.name === "Pro League"
    );

    // const response5 = await axios.get(
    //   "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
    //   {
    //     params: { category_id: "13" },
    //     headers: {
    //       "X-RapidAPI-Key":
    //         "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
    //       "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
    //     },
    //   }
    // );
    // const brazillLeag = response5.data.data.filter(
    //   (item) => item.name === "Brasileiro Série A" || "Brasileiro Série B"
    // );

    // console.log(brazillLeag);

    // console.log(argentinaLeag.concat(engLeag, austriaLeag, belgiaLeag));
  }

  // async function getAustriaLeag() {
  //   const response = await axios.get(
  //     "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments",
  //     {
  //       params: { category_id: "17" },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
  //         "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
  //       },
  //     }
  //   );
  //   const austriaLeag = response.data.data.filter(
  //     (item) => item.name === "Bundesliga" || item.name === "2. Liga"
  //   );
  // }

  React.useEffect(() => {
    getEnglandLeag();
    // getAustriaLeag();
  }, []);

  console.log(leagues);

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs title={"Футбольные лиги"} />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Футбольные лиги</h1>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <div className={`leagues-lists d-grid`}>
                <div className={`leagues-list-column`}>
                  <Link href="/league/1">
                    <a className={`league-item d-flex align-items-center`}>
                      <div className="league-icon">
                        <img src="../images/league.png" alt="" />
                      </div>
                      <div className="league-name">Премьер лига</div>
                    </a>
                  </Link>
                </div>
                <div className={`leagues-list-column`}>
                  {/* {league.map((item, index) => (
                    <Link key={index} href={``}>
                      <a
                        onClick={() => console.log(item.category.id)}
                        className={`league-item d-flex align-items-center`}
                      >
                        <div className="league-icon">
                          <img src="../images/league.png" alt="" />
                        </div>
                        <div className="league-name">{item.name}</div>
                      </a>
                    </Link>
                  ))} */}
                </div>
              </div>
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
