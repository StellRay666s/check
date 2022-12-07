import React from "react";
import StatsPartnerPlate from "./StatsPartnerPlate";

function TableStatsPartnerTariffs({ logoHome, logoAway, stats }) {
  console.log(stats);

  return (
    <div className={`match-tab-content`}>
      <div className={`match-forecast-table-partner mx-auto`}>
        <div
          className={`table-partner-head table-head d-flex align-items-center justify-content-between`}
        >
          <div
            className={`table-partner-column table-column text-center`}
          ></div>
          <div className={`table-partner-column table-column text-center`}>
            Показатели
          </div>
          <div className={`table-partner-column table-column text-center`}>
            Стабилизатор
          </div>
          <div className={`table-partner-column table-column text-center`}>
            Трендовый показатель
          </div>
        </div>
        <div className="table-partner-body">
          <StatsPartnerPlate
            indicator={stats?.indicatorHome?.toFixed(2)}
            stabilizer={stats?.stabilizerHome.toFixed(2)}
            trendIndicator={stats?.trendIndicatorHome.toFixed(2)}
            logo={logoHome}
          />
          <StatsPartnerPlate
            indicator={stats?.indicatorAway?.toFixed(2)}
            stabilizer={stats?.stabilizerAway.toFixed(2)}
            trendIndicator={stats?.trendIndicatorAway.toFixed(2)}
            logo={logoAway}
          />
        </div>
      </div>
    </div>
  );
}

export default TableStatsPartnerTariffs;
