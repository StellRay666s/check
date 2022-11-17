import React from 'react'
import Link from 'next/link';

import { Navigation } from 'swiper';

import { Swiper, SwiperSlide } from 'swiper/react';

export default function SidebarNews() {

    const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    return (
        <div className="sidebar-news">
            <div className={`sidebar-top-header d-flex align-items-center justify-content-between w-100`}>
                <div className={`sidebar-top-name`}>Новости спорта</div>
                <div className={`slider-top-buttons d-flex align-items-center`}>
                    <div className={`top-matches-btn`} ref={navigationPrevRef}>
                        <img src="../images/sidebar-arrow_l.svg" alt="" />
                    </div>
                    <div className={`top-matches-btn`} ref={navigationNextRef}>
                        <img src="../images/sidebar-arrow_r.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className={`sidebar-news-content`}>
                <Swiper
                    modules={[Navigation]}
                    spaceBetween={0}
                    slidesPerView={1}
                    navigation={{
                        prevEl: navigationPrevRef.current,
                        nextEl: navigationNextRef.current,
                    }}
                    onBeforeInit={(swiper) => {
                        swiper.params.navigation.prevEl = navigationPrevRef.current;
                        swiper.params.navigation.nextEl = navigationNextRef.current;
                    }}
                >
                    {slides.map((index) =>
                        <SwiperSlide key={index}>
                            <Link href="/">
                                <a className={`sidebar-news-item d-flex align-items-center`}>
                                    <div className={`sidebar-news-item-image`}>
                                        <img src="../images/news-thumb.jpg" alt="" />
                                    </div>
                                    <div className={`sidebar-news-item-info`}>
                                        <h4 className={`sidebar-news-item-title`}>Начинаем следить за настоящими чемпионами</h4>
                                        <div className={`sidebar-news-item-date`}>27.10.2022</div>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className={`sidebar-news-item d-flex align-items-center`}>
                                    <div className={`sidebar-news-item-image`}>
                                        <img src="../images/news-thumb.jpg" alt="" />
                                    </div>
                                    <div className={`sidebar-news-item-info`}>
                                        <h4 className={`sidebar-news-item-title`}>Начинаем следить за настоящими чемпионами</h4>
                                        <div className={`sidebar-news-item-date`}>27.10.2022</div>
                                    </div>
                                </a>
                            </Link>
                            <Link href="/">
                                <a className={`sidebar-news-item d-flex align-items-center`}>
                                    <div className={`sidebar-news-item-image`}>
                                        <img src="../images/news-thumb.jpg" alt="" />
                                    </div>
                                    <div className={`sidebar-news-item-info`}>
                                        <h4 className={`sidebar-news-item-title`}>Начинаем следить за настоящими чемпионами</h4>
                                        <div className={`sidebar-news-item-date`}>27.10.2022</div>
                                    </div>
                                </a>
                            </Link>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        </div>
    )
}
