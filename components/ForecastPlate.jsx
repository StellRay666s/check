import React from "react";
import Link from "next/link";

function ForecastPlate() {
  return (
    <Link key={""} href="">
      <a className={`forecast-item d-flex align-items-center`}>
        <div
          className={`forecast-item-date d-flex align-items-center justify-content-center`}
        >
          17:20
        </div>
        <div
          className={`forecast-item-content d-flex align-items-center justify-content-between`}
        >
          <div
            className={`forecast-item-team d-flex align-items-center justify-content-between position-relative`}
          >
            <div className={`forecast-item-name text-center`}>
              Манчестер Юнайтед
            </div>
            <div className={`forecast-item-team-logo`}>
              <img
                className={`w-100 h-100`}
                src="../images/team-1.png"
                alt=""
              />
            </div>
          </div>
          <div className={`forecast-item-nums d-flex align-items-center`}>
            <div
              className={`forecast-item-num d-flex align-items-center justify-content-center`}
            >
              0.1
            </div>
            <div
              className={`forecast-item-num d-flex align-items-center justify-content-center`}
            >
              2.2
            </div>
          </div>
          <div
            className={`forecast-item-team d-flex align-items-center position-relative`}
          >
            <div className={`forecast-item-team-logo`}>
              <img
                className={`w-100 h-100`}
                src="../images/team-2.png"
                alt=""
              />
            </div>
            <div className={`forecast-item-name ms-auto text-center`}>
              Реал Мадрид
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default ForecastPlate;
