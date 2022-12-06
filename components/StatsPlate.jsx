import React from "react";

function StatsPlate({
  homeStats = 0,
  totalAway = 0,
  totalStats = 0,
  statsName,
}) {
  return (
    <div className={`table-free-item table-item d-flex flex-column`}>
      <div
        className={`table-free-row d-flex align-items-center justify-content-between`}
      >
        <div className={`table-free-column table-column`}>
          <div className="row-name">{statsName}</div>
        </div>
        <div className={`table-free-column table-column`}>
          <div
            className={`result-cell ${
              homeStats > totalAway && "best-result_green"
            }  d-flex align-items-center justify-content-center mx-auto`}
          >
            {homeStats.toFixed(2)}
          </div>
        </div>
        <div className={`table-free-column table-column`}>
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            {totalStats.toFixed(2)}
          </div>
        </div>
        <div className={`table-free-column table-column best-result`}>
          <div
            className={`result-cell ${
              totalAway > homeStats && "best-result_blue"
            } best-result_blue d-flex align-items-center justify-content-center mx-auto`}
          >
            {totalAway.toFixed(2)}
          </div>
        </div>
      </div>
      {/* <div
        className={`table-free-row table-free-row-forecast d-flex align-items-center justify-content-between`}
      >
        <div className={`table-free-column table-column`}>
          <div className="row-name">Прогноз</div>
        </div>
        <div className={`table-free-column table-column`}>
          <div className="result-cell best-result_green d-flex align-items-center justify-content-center mx-auto">
            3
          </div>
        </div>
        <div className={`table-free-column table-column`}>
          <div
            className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
          >
            1
          </div>
        </div>
        <div className={`table-free-column table-column best-result`}>
          <div
            className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
          >
            2
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default StatsPlate;
