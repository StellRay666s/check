import React from "react";

function TablePartnerTariffs({
  handlematch,
  handletime1,
  handletime2,
  handletime3,
  numbers,
  activeForecastTab,
  logoHome,
  logoAway,
}) {
  return (
    <div className={`forecast-tabs`}>
      <div className={`forecast-tabs-buttons d-flex align-items-center`}>
        <button
          className={`btn tab-button d-flex align-items-center justify-content-center ${
            activeForecastTab === "match" ? "active" : ""
          }`}
          onClick={handlematch}
        >
          <span>Матч</span>
        </button>
        <button
          className={`btn tab-button d-flex align-items-center justify-content-center ${
            activeForecastTab === "time1" ? "active" : ""
          }`}
          onClick={handletime1}
        >
          <span>Тайм1</span>
        </button>
        <button
          className={`btn tab-button d-flex align-items-center justify-content-center ${
            activeForecastTab === "time2" ? "active" : ""
          }`}
          onClick={handletime2}
        >
          <span>Тайм2</span>
        </button>
        <button
          className={`btn tab-button d-flex align-items-center justify-content-center ${
            activeForecastTab === "time3" ? "active" : ""
          }`}
          onClick={handletime3}
        >
          <span>Тайм3</span>
        </button>
      </div>
      {activeForecastTab === "match" ? (
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
              <div
                className={`table-partner-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-partner-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-partner-column table-column`}>
                    <div className="table-partner-logo table-logo_mini mx-auto">
                      <img src={logoHome} alt="" />
                    </div>
                  </div>
                  <div
                    className={`table-partner-column step-arrow step-arrow_l table-column position-relative`}
                  >
                    <div
                      className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                    >
                      3
                    </div>
                  </div>
                  <div
                    className={`table-partner-column table-column position-relative`}
                  >
                    <div
                      className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                    >
                      1
                    </div>
                  </div>
                  <div
                    className={`table-partner-column table-column d-flex align-items-center`}
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
                      2.2 M
                    </div>
                    <span>Результат</span>
                  </div>
                </div>
              </div>
              <div
                className={`table-partner-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-partner-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-partner-column table-column`}>
                    <div className="table-partner-logo table-logo_mini mx-auto">
                      <img src={logoAway} alt="" />
                    </div>
                  </div>
                  <div
                    className={`table-partner-column step-arrow step-arrow_l table-column position-relative`}
                  >
                    <div
                      className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                    >
                      3
                    </div>
                  </div>
                  <div
                    className={`table-partner-column table-column position-relative`}
                  >
                    <div
                      className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                    >
                      1
                    </div>
                  </div>
                  <div
                    className={`table-partner-column table-column d-flex align-items-center`}
                  >
                    <div
                      className={`result-cell result-cell_big d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2.2 Б
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
                    className={`table-partner-column table-column d-flex align-items-center justify-content-end`}
                  >
                    <div
                      className={`result-cell result-cell_big result-cell_gold d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2.2 М
                    </div>
                    <span>Результат</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      {activeForecastTab === "time1" ? (
        <div className={`match-tab-content`}></div>
      ) : (
        <></>
      )}
      {activeForecastTab === "time2" ? (
        <div className={`match-tab-content`}></div>
      ) : (
        <></>
      )}
      {activeForecastTab === "time3" ? (
        <div className={`match-tab-content`}></div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default TablePartnerTariffs;
