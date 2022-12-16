import React from "react";

function StatsPremiumPlate({
  logo,
  indicator,
  stabilizator,
  trendIndicator,
  anchorIndicator,
}) {
  function calculateGrowth() {
    if (indicator < stabilizator && stabilizator < trendIndicator) {
      const floor = Math.floor(indicator);
      const floor2 = Math.floor(anchorIndicator);

      return floor === floor2 ? `${floor}Б` : "Нет ставки";
    } else if (indicator > stabilizator && stabilizator > trendIndicator) {
      const ceil = Math.ceil(indicator);
      const floor2 = Math.ceil(anchorIndicator);

      return ceil < floor2 ? `Нет ставки` : `${ceil}М`;
    } else {
      return "Нет ставки";
    }
  }

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
            {calculateGrowth()}
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
          ></div>
          <span>Результат</span>
        </div>
      </div>
    </div>
  );
}

export default StatsPremiumPlate;
