import React from "react";

function StatsPremiumPlate({
  logo,
  indicator,
  stabilizator,
  trendIndicator,
  anchorIndicator,
}) {
  return (
    <div className={`table-premium-item table-item d-flex flex-column`}>
      <div
        className={`table-premium-row d-flex align-items-center justify-content-between`}
      >
        <div className={`table-premium-column table-column`}>
          <div className="table-premium-logo table-logo_mini mx-auto">
            <img src={logo} alt="" />
          </div>
        </div>
        <div
          className={`table-premium-column step-arrow step-arrow_s table-column position-relative`}
        >
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {isNaN(indicator) ? "..." : indicator}
          </div>
        </div>
        <div
          className={`table-premium-column step-arrow step-arrow_m table-column position-relative`}
        >
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {isNaN(stabilizator) ? "..." : stabilizator}
          </div>
        </div>
        <div className={`table-premium-column table-column`}>
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {isNaN(trendIndicator) ? "..." : trendIndicator}
          </div>
        </div>
        <div className={`table-premium-column table-column`}>
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {isNaN(anchorIndicator) ? "..." : anchorIndicator}
          </div>
        </div>
        <div
          className={`table-premium-column table-column d-flex align-items-center`}
        >
          <div
            className={`result-cell result-cell_big d-flex align-items-center justify-content-center mx-auto`}
          >
            ###
          </div>
          <span>Прогноз</span>
        </div>
      </div>
      <div
        className={`table-premium-row table-premium-row-forecast d-flex align-items-center justify-content-between`}
      >
        <div className={`table-premium-column table-column`}></div>
        <div className={`table-premium-column table-column`}></div>
        <div className={`table-premium-column table-column`}></div>
        <div className={`table-premium-column table-column`}></div>
        <div className={`table-premium-column table-column`}></div>
        <div
          className={`table-premium-column table-column d-flex align-items-center`}
        >
          <div
            className={`result-cell result-cell_big result-cell_gold d-flex align-items-center justify-content-center mx-auto`}
          >
            2.2 M
          </div>
          <span>Результат</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPremiumPlate;
