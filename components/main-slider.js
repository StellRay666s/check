import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { useSwitchPhrase } from "../hooks/useSwitchPhrase";

export default function MainSlider() {
  const { isLoad } = useSwitchPhrase();

  return (
    <div className="main-slider">
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={0}
        slidesPerView={1}
      >
        <SwiperSlide style={{ backgroundImage: "url(../images/slide.jpg)" }}>
          <div className="container-max mx-auto">
            <div className="main-slider-info position-relative">
              <div className="main-slider-name">
                Выбирай <span>прогноз</span>
              </div>
              {isLoad ? (
                <div className="main-slider-text">
                  We strive <span>to be the best</span>
                </div>
              ) : (
                <div className="main-slider-text">
                  To get a glory get a <span>fight to the win </span>
                </div>
              )}
            </div>
            <Link href="/">
              <a
                className={`main-button main-slider-link d-flex align-items-center justify-content-between position-relative`}
              >
                Узнать подробнее
                <i
                  className={`btn_arrow d-flex align-items-center justify-content-end`}
                >
                  <img src="../images/right-arrow.svg" alt="" />
                </i>
              </a>
            </Link>
          </div>
        </SwiperSlide>
        <SwiperSlide style={{ backgroundImage: "url(../images/slide.jpg)" }}>
          <div className="container-max mx-auto">
            <div className="main-slider-info position-relative">
              <div className="main-slider-name">
                Выбирай <span>прогноз</span>
              </div>
              <div className="main-slider-text">
                We strive <span>to be the best</span>
              </div>
            </div>
            <Link href="/">
              <a
                className={`main-button main-slider-link d-flex align-items-center justify-content-between position-relative`}
              >
                Узнать подробнее
                <i
                  className={`btn_arrow d-flex align-items-center justify-content-end`}
                >
                  <img src="../images/right-arrow.svg" alt="" />
                </i>
              </a>
            </Link>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
