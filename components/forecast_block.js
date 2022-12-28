import React, { useState } from "react";
import { useGetToTheMatch } from "../hooks/useGetToTheMatch";

import Link from "next/link";
import MatchPlate from "./MatchPlate";

export default function ForecastBlock({
  footballMatches = [],
  hocceyMatches = [],
  day,
}) {
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const [activeForecastTab, setActiveForecastTab] = useState("football");

  const handlefootball = () => {
    setActiveForecastTab("football");
  };
  const handlehockey = () => {
    setActiveForecastTab("hockey");
  };


  return (
    <div className={`forecast-block`}>
      <div className={`forecast-title`}>
        Прогнозы на <span>{day}</span>
      </div>
      <div className={`forecast-tabs`}>
        <div className={`forecast-tabs-buttons d-flex align-items-center`}>
          <button
            className={`btn tab-button d-flex align-items-center justify-content-center ${activeForecastTab === "football" ? "active" : ""
              }`}
            onClick={handlefootball}
          >
            <img src="../images/football-icon.svg" alt="" />
            <span>Футбол</span>
          </button>

          {day === "завтра" ? (
            ""
          ) : (
            <button
              className={`btn tab-button d-flex align-items-center justify-content-center ${activeForecastTab === "hockey" ? "active" : ""
                }`}
              onClick={handlehockey}
            >
              <img src="../images/hockey-icon.svg" alt="" />
              <span>Хоккей</span>
            </button>
          )}
        </div>
        {activeForecastTab === "football" ? (
          <div className={`forecast-tab-content`}>
            <div className={`forecast-table d-flex flex-column`}>
              {footballMatches.map((item) => (
                <MatchPlate
                  key={item.EVENT_ID}
                  logoTeamAway={item.AWAY_IMAGES}
                  logoTeamHome={item.HOME_IMAGES}
                  timeStamp={item.START_TIME}
                  nameHome={item.HOME_NAME}
                  nameAway={item.AWAY_NAME}
                  eventId={item.EVENT_ID}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className={`forecast-tab-content`}>
            <div className={`forecast-table d-flex flex-column`}>
              {hocceyMatches[0]?.map((item) => (
                <MatchPlate
                  key={item.EVENT_ID}
                  logoTeamAway={item.AWAY_IMAGES}
                  logoTeamHome={item.HOME_IMAGES}
                  timeStamp={item.START_TIME}
                  nameHome={item.HOME_NAME}
                  nameAway={item.AWAY_NAME}
                  eventId={item.EVENT_ID}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
