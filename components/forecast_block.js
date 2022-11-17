import React, { useState } from "react";
import { useGetToTheMatch } from "../hooks/useGetToTheMatch";

import Link from "next/link";

export default function ForecastBlock() {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [activeForecastTab, setActiveForecastTab] = useState("football");
  const getToTheMatch = useGetToTheMatch();

  const handlefootball = () => {
    setActiveForecastTab("football");
  };
  const handlehockey = () => {
    setActiveForecastTab("hockey");
  };

  return (
    <div className={`forecast-block`}>
      <div className={`forecast-title`}>
        Прогнозы на <span>сегодня</span>
      </div>
      <div className={`forecast-tabs`}>
        <div className={`forecast-tabs-buttons d-flex align-items-center`}>
          <button
            className={`btn tab-button d-flex align-items-center justify-content-center ${
              activeForecastTab === "football" ? "active" : ""
            }`}
            onClick={handlefootball}
          >
            <img src="../images/football-icon.svg" alt="" />
            <span>Футбол</span>
          </button>
          <button
            className={`btn tab-button d-flex align-items-center justify-content-center ${
              activeForecastTab === "hockey" ? "active" : ""
            }`}
            onClick={handlehockey}
          >
            <img src="../images/hockey-icon.svg" alt="" />
            <span>Хоккей</span>
          </button>
        </div>
        {activeForecastTab === "football" ? (
          <div className={`forecast-tab-content`}>
            <div className={`forecast-table d-flex flex-column`}>
              {numbers.map((index) => (
                <Link key={index} href={"/match"}>
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
                      <div
                        className={`forecast-item-nums d-flex align-items-center`}
                      >
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
                        <div
                          className={`forecast-item-name ms-auto text-center`}
                        >
                          Реал Мадрид
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        ) : (
          <div className={`forecast-tab-content`}>
            <div className={`forecast-table d-flex flex-column`}>
              {numbers.map((index) => (
                <Link key={index} href="">
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
                      <div
                        className={`forecast-item-nums d-flex align-items-center`}
                      >
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
                        <div
                          className={`forecast-item-name ms-auto text-center`}
                        >
                          Реал Мадрид
                        </div>
                      </div>
                    </div>
                  </a>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
