import React, { useState } from "react";
import HowItWork from "../components/how-it-work";
import { useSelector, useDispatch } from "react-redux";

import MainSlider from "../components/main-slider";
import { MainLayout } from "../layouts/MainLayout";
import ForecastBlock from "../components/forecast_block";
import SeoBlock from "../components/seo_block";
import MainTriggersBlock from "../components/main-triggers_block";
import Sidebar from "../components/sidebar";
import "swiper/css";
import SidebarTariffs from "../components/sidebar/sidebar-tariffs";

import axios from "axios";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const leag = useSelector((state) => state.league);
  const todayFootball = useSelector(state => state.matches.todayFootball)
  const todayHockey = useSelector(state => state.matches.todayHockey)

  console.log(todayHockey)


  const [todayMatch, setTodayMatches] = React.useState([])
  const [todayHockeyMatch, setHockeyMatches] = React.useState([])



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

  }, []);

  React.useEffect(() => {
    setTodayMatches(todayFootball?.flatMap(item => item.EVENTS))
    setHockeyMatches(todayHockey?.flatMap(item => item.EVENTS))
  }, [todayFootball])


  return (
    <MainLayout title={"Главная"}>
      <main>
        <MainSlider />
        <HowItWork />
        <div className={`main-content sidebar-translate`}>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock
                day={"сегsодня"}
                hocceyMatches={todayHockeyMatch}
                footballMatches={todayMatch}
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
