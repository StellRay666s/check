import React from "react";
import Link from "next/link";
export default function SidebarTariffs() {
  return (
    <>
      <Link href="/">
        <a
          className={`sidebar-tariff sidebar-tariff-premium d-block`}
          style={{ backgroundImage: "url(../images/tariff-1.jpg)" }}
        >
          <div
            className={`sidebar-tariff-content d-flex flex-column justify-content-end position-relative h-100`}
          >
            <div className={`sidebar-tariff-header flex-grow-1`}>
              <div className={`sidebar-tariff-name position-relative`}>
                Премиум
              </div>
              <div className={`tariff-label`}>Тариф</div>
            </div>
            <div className={`sidebar-tariff-bottom`}>
              <div className={`sidebar-tariff-text`}>
                В этой версии вы получаете доступ к уникальной точности ибо в
                этой версии есть якорь (индикатор)...
              </div>
              <div
                className={`sidebar-tariff-link how-it-work-link d-inline-block`}
              >
                Узнать подробнее
              </div>
            </div>
          </div>
        </a>
      </Link>
      <Link href="/">
        <a
          className={`sidebar-tariff d-block`}
          style={{ backgroundImage: "url(../images/tariff-2.jpg)" }}
        >
          <div
            className={`sidebar-tariff-content d-flex flex-column justify-content-end position-relative h-100`}
          >
            <div className={`sidebar-tariff-header flex-grow-1`}>
              <div
                className={`sidebar-tariff-name d-inline-block position-relative`}
              >
                Партнерка
              </div>
              <div className={`tariff-label`}>Тариф</div>
            </div>
            <div className={`sidebar-tariff-bottom`}>
              <div className={`sidebar-tariff-text`}>
                Эта версия дает доступ к расчету значительно более глубокому
                алгоритма...
              </div>
              <div
                className={`sidebar-tariff-link how-it-work-link d-inline-block`}
              >
                Узнать подробнее
              </div>
            </div>
          </div>
        </a>
      </Link>
    </>
  );
}
