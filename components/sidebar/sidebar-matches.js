import React from 'react'
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function SidebarMatches() {
    
    const slides = [1, 2, 3, 4, 5, 6, 7, 8, 9]

    const navigationPrevRef = React.useRef(null)
    const navigationNextRef = React.useRef(null)

    return (
        <div className={`sidebar-top`}>
            <div className={`sidebar-top-header d-flex align-items-center justify-content-between w-100`}>
                <div className={`sidebar-top-name`}>Топ матчей</div>
                <div className={`slider-top-buttons d-flex align-items-center`}>
                    <div className={`top-matches-btn`} ref={navigationPrevRef}>
                        <img src="../images/sidebar-arrow_l.svg" alt="" />
                    </div>
                    <div className={`top-matches-btn`} ref={navigationNextRef}>
                        <img src="../images/sidebar-arrow_r.svg" alt="" />
                    </div>
                </div>
            </div>
            <div className={`sidebar-top-content`}>
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
                            <div className={`top-matches-slide-content d-flex justify-content-between text-center`}>
                                <div className="top-matches-name w-100">Лига наций УЕФА. Лига А.</div>
                                <div className={`top-match-team`}>
                                    <div className={`top-match-team-logo mx-auto`}>
                                        <img src="../images/top-logo-1.png" alt="" />
                                    </div>
                                    <div className={`top-match-team-name`}>Манчестер Юнайтед</div>
                                </div>
                                <div className={`top-match-info d-flex flex-column align-items-center justify-content-center position-relative`}>
                                    <span>04.10</span>
                                    <span>22:00</span>
                                </div>
                                <div className={`top-match-team`}>
                                    <div className={`top-match-team-logo mx-auto`}>
                                        <img src="../images/top-logo-2.png" alt="" />
                                    </div>
                                    <div className={`top-match-team-name`}>Реал Мадрид</div>
                                </div>
                            </div>
                            <div className={`top-matches-slide-nums d-flex justify-content-center`}>
                                <div className={`top-matches-slide-num d-flex align-items-center justify-content-center`}>1.36</div>
                                <div className={`top-matches-slide-num d-flex align-items-center justify-content-center`}>4.75</div>
                                <div className={`top-matches-slide-num d-flex align-items-center justify-content-center`}>8.39</div>
                            </div>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>

        </div>
    )
}
