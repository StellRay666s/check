import React from "react";
import StatsPremiumPlate from "./StatsPremiumPlate";

function TableStatsPremiumTariffs({ logoHome, logoAway, stats }) {
  return (
    <div className={`match-tab-content`}>
      <div className={`match-forecast-table-premium mx-auto`}>
        <div
          className={`table-premium-head table-head d-flex align-items-center justify-content-between`}
        >
          <div className={`table-premium-column table-column`}></div>
          <div className={`table-premium-column table-column`}>Показатели</div>
          <div className={`table-premium-column table-column`}>
            Стабилизатор
          </div>
          <div className={`table-premium-column table-column`}>
            Трендовый показатель
          </div>
          <div className={`table-premium-column table-column`}>
            Якорный показатель
          </div>
          <div className={`table-premium-column table-column`}>
            Индивидуальный тотал
          </div>
        </div>
        <div className="table-premium-body">
          <StatsPremiumPlate
            indicator={stats?.indicatorHome?.toFixed(2)}
            stabilizator={stats?.stabilizerHome?.toFixed(2)}
            trendIndicator={stats?.trendIndicatorHome?.toFixed(2)}
            anchorIndicator={stats?.anchorValueHome?.toFixed(2)}
            logo={logoHome}
            stats={stats}
          />
          <StatsPremiumPlate
            indicator={stats?.indicatorAway?.toFixed(2)}
            stabilizator={stats?.stabilizerAway?.toFixed(2)}
            trendIndicator={stats?.trendIndicatorAway?.toFixed(2)}
            anchorIndicator={stats?.anchorValueAway?.toFixed(2)}
            logo={logoAway}
            stats={stats}
          />
        </div>
      </div>
    </div>
  );
}

export default TableStatsPremiumTariffs;
