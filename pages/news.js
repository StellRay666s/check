import React, { useState } from "react";
import Link from "next/link";
import { MainLayout } from "../layouts/MainLayout";
import Breadcrumbs from "../components/breadcrumbs";
import axios from "axios";

export default function News() {
  // const [news, setNews] = React.useState([]);

  async function getNews() {
    const response = await axios.get(`${process.env.URL}/news`);
    setNews(response.data);
  }

  React.useEffect(() => {
    // getNews();
  }, []);

  return (
    <MainLayout title={"Футбольные лиги"}>
      <main>
        <div className={`main-content pages-content`}>
          <div className="page-header">
            <Breadcrumbs title={"Новости"} />
            <div className={`container mx-auto`}>
              <h1 className={`pages-title m-0`}>Новости</h1>
            </div>
          </div>
          <div className={`container mx-auto`}>
            <div className={`main-column`}>
              <div className="news-archive-content d-flex justify-content-between">
                {/* {news != [] && news.map((item, index) => (
                  <Link key={index} href={`/single-news/${item.id}`}>
                    <a className="news-item">
                      <div className="news-item-image position-relative">
                        <img
                          src={`http://localhost:8000${item.image}`}
                          alt=""
                        />
                      </div>
                      <div className="news-item-info">
                        <h4 className="news-item-name">{item.title}</h4>
                        <div className="news-item-date">18.09.2022</div>
                      </div>
                    </a>
                  </Link>
                ))} */}
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
