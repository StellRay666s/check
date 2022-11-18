import React from "react";
import Link from "next/link";
import MatchPlate from "./MatchPlate";

function PronosisTable({ titleTable, matches = [], title, underTitle, logo }) {
  React.useEffect(() => {}, []);

  return (
    <div className={`forecast-block`}>
      <div className={`forecast-title`}>
        Прогнозы на <span>{titleTable}</span>
      </div>
      <div className={`forecast-tab-content`}>
        <div className="forecast-head d-flex align-items-center">
          <div className="league-logo">
            <img src={logo} alt="" />
          </div>
          <div className="forecast-head-info">
            <div className="forecast-head-name">{title}</div>
            <div className="forecast-head-text">{underTitle}</div>
          </div>
        </div>
        <div className={`forecast-table d-flex flex-column`}>
          {matches
            .slice(0, 6)
            // .filter((item) => item.tournament.id === 1)
            .map((item, index) => (
              <MatchPlate match={item} awayTeamId={item.awayTeam.id} />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PronosisTable;
