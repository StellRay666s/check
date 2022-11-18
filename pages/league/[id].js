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
  const [matches, setMatches] = React.useState([]);
  const { query } = useRouter();
  console.log(query.id);

  React.useEffect(() => {
    axios
      .get("https://os-sports-perform.p.rapidapi.com/v1/events/schedule/date", {
        params: { sport_id: "1", date: "2022-12-26" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
        },
      })
      .then((res) => setMatches(res.data.data));
  }, [query]);

  console.log(matches);

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
                matches={matches}
                numbers={numbers}
                logo={
                  "https://f0.pngfuel.com/png/604/367/2017-18-premier-league-chelsea-f-c-burnley-f-c-manchester-united-f-c-2016-17-premier-league-premier-league-trophy-png-clip-art.png"
                }
                titleTable={"сегодня"}
                underTitle={"Футбол / Сезон 2022-2023"}
              />

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
