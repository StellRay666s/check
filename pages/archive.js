import React, { useState } from "react";
import { MainLayout } from "../layouts/MainLayout";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";
import ForecastBlock from "../components/forecast_block";

import Select from "react-select";
import "swiper/css";

export default function FootballLeagues() {
  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div
          className={`main-content pages-content page-archive-content sidebar-translate`}
        >
          <div className="page-header">
            <Breadcrumbs title={"Архив"} />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Футбольные лиги</h1>
              <div className="archive-filter d-flex">
                <Select options={options} classNamePrefix="custom-select" />
                <Select options={options} classNamePrefix="custom-select" />
              </div>
            </div>
          </div>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock />
              <SeoBlock />
            </div>
            <Sidebar />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
