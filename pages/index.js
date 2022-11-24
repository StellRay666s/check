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

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const leag = useSelector((state) => state.league);
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
  return (
    <MainLayout title={"Главная"}>
      <main>
        <MainSlider />
        <HowItWork />
        <div className={`main-content sidebar-translate`}>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock />
              {isVisible && <SidebarTariffs />}
              <ForecastBlock />
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
