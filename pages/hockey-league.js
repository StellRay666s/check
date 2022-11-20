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
  const [matches, setMatches] = useState([]);
  const options = { year: "numeric", month: "numeric", day: "numeric" };
  function join(t, a, s) {
    function format(m) {
      let f = new Intl.DateTimeFormat("en", m);
      return f.format(t);
    }
    return a.map(format).join(s);
  }
  let a = [{ year: "numeric" }, { month: "numeric" }, { day: "numeric" }];
  let dayToday = join(new Date(), a, "-");

  var d = new Date(1669080600 * 1000);
  console.log(d);

  async function getNhlMatch() {
    try {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/events/schedule/category",
        {
          params: { category_id: "37", date: "2022-11-21" },
          headers: {
            "X-RapidAPI-Key":
              "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
            "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          },
        }
      );

      setMatches(
        response.data.data.filter(
          (item) => item.tournament.id === 142 && item.tournament.name === "NHL"
        )
      );
    } catch (err) {}
  }

  console.log(matches);

  React.useEffect(() => {
    getNhlMatch();
  }, []);

  return (
    <MainLayout title={"Футбольные лиги"}>
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
              <PronosisTable
                sportTitle={"Хоккей"}
                titleTable={"сегодня"}
                logo={"../images/nhl.png"}
                matches={matches}
                title={"Национальная хоккейная лига"}
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

export default HockeyLeague;
