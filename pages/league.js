import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import MainTriggersBlock from "../components/main-triggers_block";
import SeoBlock from "../components/seo_block";
import Sidebar from "../components/sidebar";
import Breadcrumbs from "../components/breadcrumbs";
import { useGetToTheMatch } from "../hooks/useGetToTheMatch";

import "swiper/css";
import PronosisTable from "../components/PronosisTable";

export default function League() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const getToTheMatch = useGetToTheMatch();

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
              <PronosisTable numbers={numbers} titleTable={"сегодня"} />
              <PronosisTable numbers={numbers} titleTable={"завтра"} />
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
