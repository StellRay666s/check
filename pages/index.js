import React, { useState } from "react";
import HowItWork from "../components/how-it-work";
import { useDispatch, useSelector } from "react-redux";
import MainSlider from "../components/main-slider";
import { MainLayout } from "../layouts/MainLayout";
import ForecastBlock from "../components/forecast_block";
import SeoBlock from "../components/seo_block";
import MainTriggersBlock from "../components/main-triggers_block";
import Sidebar from "../components/sidebar";
import "swiper/css";
import SidebarTariffs from "../components/sidebar/sidebar-tariffs";
import { fetchLeagues } from "../redux/slices/leagueSlice";
import axios from "axios";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const leag = useSelector((state) => state.league);
  const todayFootball = useSelector(state => state.matches.todayFootball)

  const eventId = todayFootball.map(item => item.EVENT_ID)
  const [prewMatches, setPrewMatches] = React.useState([])

  console.log(prewMatches)
  async function getPrevMatch() {
    for (const a of eventId) {
      const response = await axios.get('https://flashlive-sports.p.rapidapi.com/v1/events/h2h', {
        params: { event_id: a, locale: "ru_RU" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      })
      if (response.status === 200) {
        return prewMatches.push(response.data.DATA.map(item => item[0]))
      }
    }

  }


  const dispatch = useDispatch();

  React.useEffect(() => {
    function resize() {
      if (window.innerWidth <= 500) {
        setIsVisible(true);
      }
      if (window.innerWidth > 500) {
        setIsVisible(false);
      }
    }
    window.addEventListener("resize", resize);
    dispatch(fetchLeagues());
  }, []);

  React.useEffect(() => {
    getPrevMatch()
  }, []);

  return (
    <MainLayout title={"Главная"}>
      <main>
        <MainSlider />
        <HowItWork />
        <div className={`main-content sidebar-translate`}>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock
                day={"сегодня"}
                hocceyMatches={[]}
                footballMatches={todayFootball}
              />
              {isVisible && <SidebarTariffs />}
              <ForecastBlock
                footballMatches={[]}
                // hocceyMatches={hockeyTomorrow}
                day={"завтра"}
              />
              <MainTriggersBlock />
              <SeoBlock />
            </div>
            <Sidebar leagues={leag} />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
