import React from "react";

function StatsPartnerPlate({ logo, indicator, stabilizer, trendIndicator }) {
  return (
    <div className={`table-partner-item table-item d-flex flex-column`}>
      <div
        className={`table-partner-row d-flex align-items-center justify-content-between`}
      >
        <div className={`table-partner-column table-column`}>
          <div className="table-partner-logo table-logo_mini mx-auto">
            <img src={logo} alt="" />
          </div>
        </div>
        <div
          className={`table-partner-column step-arrow step-arrow_l table-column position-relative`}
        >
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {indicator || "Загрузка..."}
          </div>
        </div>
        <div className={`table-partner-column table-column position-relative`}>
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {stabilizer || "Загрузка..."}
          </div>
        </div>
        <div
          className={`table-partner-column table-column d-flex align-items-center`}
        >
          <div
            className={`result-cell result-cell_big d-flex align-items-center justify-content-center mx-auto`}
          >
            {trendIndicator || "Загрузка..."}
          </div>
          <span>Прогноз</span>
        </div>
      </div>
      <div
        className={`table-partner-row table-partner-row-forecast d-flex align-items-center justify-content-between`}
      >
        <div className={`table-partner-column table-column`}></div>
        <div className={`table-partner-column table-column`}></div>
        <div className={`table-partner-column table-column`}></div>
        <div
          className={`table-partner-column table-column d-flex align-items-center`}
        >
          <div
            className={`result-cell result-cell_big result-cell_gold d-flex align-items-center justify-content-center mx-auto`}
          >
            {indicator > trendIndicator
              ? `${Math.ceil(indicator)}М`
              : `${Math.floor(indicator)}Б`}
          </div>
          <span>Результат</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPartnerPlate;
