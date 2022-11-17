import React, { useState } from 'react';
import Link from 'next/link';
import { MainLayout } from '../layouts/MainLayout';
import SeoBlock from '../components/seo_block';
import Sidebar from '../components/sidebar';
import Breadcrumbs from '../components/breadcrumbs';
import SidebarNews from '../components/sidebar/sidebar-news';

import 'swiper/css';

export default function Tariffs() {


    return (
        <MainLayout title={'Тарифы'}>
            <main>
                <div className={`main-content pages-content`}>
                    <div className={`page-header`}>
                        <Breadcrumbs />
                        <div className={`container mx-auto`}>
                            <h1 className={`pages-title m-0`}>Тарифы Check Bets</h1>
                        </div>
                    </div>
                    <div className={`tariffs-items`}>
                        <div className={`container mx-auto`}>
                            <div className={`tariffs-items-content d-grid`}>
                                <div className={`tariff-item`}>
                                    <div className={`tariff-item-head d-flex align-items-center`}>
                                        <div className={`tariff-item-logo`}>
                                            <img src="../images/tariff_logo-1.svg" alt="" />
                                        </div>
                                        <div className={`tariff-item-info`}>
                                            <div className={`tariff-item-label text-end`}>тариф</div>
                                            <div className={`tariff-item-name`}>Базовый</div>
                                            <div className={`tariff-item-text`}>Бесплатный</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-content`}>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-uncheck.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-uncheck.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-bottom`}>
                                        <button className={`btn btn_tariff-buy w-100 h-100`} disabled>Купить тариф</button>
                                    </div>
                                </div>
                                <div className={`tariff-item`}>
                                    <div className={`tariff-item-head d-flex align-items-center`}>
                                        <div className={`tariff-item-logo`}>
                                            <img src="../images/tariff_logo-2.svg" alt="" />
                                        </div>
                                        <div className={`tariff-item-info`}>
                                            <div className={`tariff-item-label text-end`}>тариф</div>
                                            <div className={`tariff-item-name`}>Партнерский</div>
                                            <div className={`tariff-item-text`}>Ставь на бк с нами</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-content`}>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-uncheck.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-bottom d-flex align-items-center justify-content-center`}>
                                        <Link href="/">
                                            <a className={`tariff-item-link`}>Подробнее о тарифе</a>
                                        </Link>
                                    </div>
                                </div>
                                <div className={`tariff-item`}>
                                    <div className={`tariff-item-head d-flex align-items-center`}>
                                        <div className={`tariff-item-logo`}>
                                            <img src="../images/tariff_logo-3.svg" alt="" />
                                        </div>
                                        <div className={`tariff-item-info`}>
                                            <div className={`tariff-item-label text-end`}>тариф</div>
                                            <div className={`tariff-item-name`}>Премиум</div>
                                            <div className={`tariff-item-text`}>750 ₽/мес</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-content`}>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                        <div className={`tariff-item-trigger d-flex align-items-center`}>
                                            <div className={`tariff-item-trigger-icon`}>
                                                <img src="../images/tariff-check.svg" alt="" />
                                            </div>
                                            <div className={`tariff-item-trigger-text`}>Максимально точный прогноз</div>
                                        </div>
                                    </div>
                                    <div className={`tariff-item-bottom`}>
                                        <button className={`btn btn_tariff-buy w-100 h-100`}>Купить тариф</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={`container mx-auto d-grid`}>
                        <div className={`main-column d-flex flex-column`}>
                            <SeoBlock />
                        </div>
                        {/* <Sidebar /> */}
                        <div className={`sidebar w-100`}>
                            <SidebarNews />
                        </div>
                    </div>
                </div>
            </main>
        </MainLayout>
    )
}