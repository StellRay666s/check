import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import Breadcrumbs from "../components/breadcrumbs";

export default function News() {
  const news = [1, 2, 3, 4, 5];

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Новости</h1>
            </div>
          </div>
          <div className={`container mx-auto`}>
            <div className={`main-column`}>
              <div className="news-archive-content d-flex justify-content-between">
                {news.map((index) => (
                  <Link key={index} href="/single-news">
                    <a className="news-item">
                      <div className="news-item-image position-relative">
                        <img src="../images/news.jpg" alt="" />
                      </div>
                      <div className="news-item-info">
                        <h4 className="news-item-name">
                          3,5 миллиона прибыли на «Аталанте» и самый стабильный
                          юзер проекта
                        </h4>
                        <div className="news-item-date">18.09.2022</div>
                      </div>
                    </a>
                  </Link>
                ))}
              </div>
              <button
                className={`main-button btn_load-news d-flex align-items-center justify-content-between position-relative mx-auto`}
              >
                Загрузить ещё
                <i
                  className={`btn_arrow d-flex align-items-center justify-content-end`}
                >
                  <img src="../images/right-arrow.svg" alt="" />
                </i>
              </button>
            </div>
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
