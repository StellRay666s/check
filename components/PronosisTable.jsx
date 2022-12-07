import React from "react";
import Link from "next/link";
import MatchPlate from "./MatchPlate";
import axios from "axios";

function PronosisTable({
  matches = [],
  logo,
  sportTitle,
  seasonName,
  titleTable,
}) {
  console.log(matches);
  return (
    <div className={`forecast-block`}>
      <div className={`forecast-title`}>
        Прогнозы на <span>{titleTable}</span>
      </div>
      <div className={`forecast-tab-content`}>
        <div className="forecast-head d-flex align-items-center">
          <div className="  league-logo">
            <img src={logo} alt="" />
          </div>
          <div className="forecast-head-info">
            <div className="forecast-head-name"></div>
            <div className="forecast-head-text">
              {sportTitle} / {seasonName}
            </div>
          </div>
        </div>
        <div className={`forecast-table d-flex flex-column`}>
          {matches[0]?.EVENTS.filter((item) => item.STAGE === "SCHEDULED").map(
            (item, index) => (
              <MatchPlate
                nameAway={item.AWAY_NAME}
                nameHome={item.HOME_NAME}
                key={index}
                match={item}
                NAME_PART_2={item.NAME_PART_2}
                eventId={item.EVENT_ID}
                logoTeamHome={item.HOME_IMAGES}
                logoTeamAway={item.AWAY_IMAGES}
                timeStamp={item.START_TIME}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}

export default PronosisTable;
