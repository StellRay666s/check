import React, { useState } from "react";
import HowItWork from "../components/how-it-work";
import MainSlider from "../components/main-slider";
import { MainLayout } from "../layouts/MainLayout";
import ForecastBlock from "../components/forecast_block";
import SeoBlock from "../components/seo_block";
import MainTriggersBlock from "../components/main-triggers_block";
import Sidebar from "../components/sidebar";
import "swiper/css";

export default function Home() {
  return (
    <MainLayout title={"Главная"}>
      <main>
        <MainSlider />
        <HowItWork />
        <div className={`main-content sidebar-translate`}>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock />
              <ForecastBlock />
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
