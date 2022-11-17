import React from 'react'

function TableBaseTariffs({handlematch,handletime1,handletime2,handletime3, numbers,activeForecastTab }) {
  return (
    <div className={`forecast-tabs`}>
    <div
      className={`forecast-tabs-buttons d-flex align-items-center`}
    >
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
        <div className={`match-forecast-table-free mx-auto`}>
          <div className="table-free-titles d-flex align-items-center justify-content-between">
            <div className={`table-free-column table-column`}></div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 1
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total match
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 2
            </div>
          </div>
          <div
            className={`table-free-head table-head d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
          </div>
          <div className="table-free-body">
            {numbers.map((index) => (
              <div
                key={index}
                className={`table-free-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-free-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-free-column table-column`}>
                    <div className="row-name">Желтые карточки</div>
                  </div>
                  <div className={`table-free-column table-column`}>
                    <div
                      className={`result-cell best-result_green d-flex align-items-center justify-content-center mx-auto`}
                    >
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
                <div
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`table-free-footer table-footer d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Лучшие показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_green best-result-indicator mx-auto"></div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_blue best-result-indicator mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
    {activeForecastTab === "time1" ? (
      <div className={`match-tab-content`}>
        <div className={`match-forecast-table-free mx-auto`}>
          <div className="table-free-titles d-flex align-items-center justify-content-between">
            <div className={`table-free-column table-column`}></div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 1
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total match
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 2
            </div>
          </div>
          <div
            className={`table-free-head table-head d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
          </div>
          <div className="table-free-body">
            {numbers.map((index) => (
              <div
                key={index}
                className={`table-free-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-free-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-free-column table-column`}>
                    <div className="row-name">Желтые карточки</div>
                  </div>
                  <div className={`table-free-column table-column`}>
                    <div
                      className={`result-cell best-result_green d-flex align-items-center justify-content-center mx-auto`}
                    >
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
                <div
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`table-free-footer table-footer d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Лучшие показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_green best-result-indicator mx-auto"></div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_blue best-result-indicator mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
    {activeForecastTab === "time2" ? (
      <div className={`match-tab-content`}>
        <div className={`match-forecast-table-free mx-auto`}>
          <div className="table-free-titles d-flex align-items-center justify-content-between">
            <div className={`table-free-column table-column`}></div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 1
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total match
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 2
            </div>
          </div>
          <div
            className={`table-free-head table-head d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
          </div>
          <div className="table-free-body">
            {numbers.map((index) => (
              <div
                key={index}
                className={`table-free-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-free-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-free-column table-column`}>
                    <div className="row-name">Желтые карточки</div>
                  </div>
                  <div className={`table-free-column table-column`}>
                    <div
                      className={`result-cell best-result_green d-flex align-items-center justify-content-center mx-auto`}
                    >
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
                <div
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`table-free-footer table-footer d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Лучшие показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_green best-result-indicator mx-auto"></div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_blue best-result-indicator mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
    {activeForecastTab === "time3" ? (
      <div className={`match-tab-content`}>
        <div className={`match-forecast-table-free mx-auto`}>
          <div className="table-free-titles d-flex align-items-center justify-content-between">
            <div className={`table-free-column table-column`}></div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 1
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total match
            </div>
            <div
              className={`table-free-column table-column text-center`}
            >
              Total 2
            </div>
          </div>
          <div
            className={`table-free-head table-head d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="table-free-logo mx-auto">
                <img src="../images/match-team.png" alt="" />
              </div>
            </div>
          </div>
          <div className="table-free-body">
            {numbers.map((index) => (
              <div
                key={index}
                className={`table-free-item table-item d-flex flex-column`}
              >
                <div
                  className={`table-free-row d-flex align-items-center justify-content-between`}
                >
                  <div className={`table-free-column table-column`}>
                    <div className="row-name">Желтые карточки</div>
                  </div>
                  <div className={`table-free-column table-column`}>
                    <div
                      className={`result-cell best-result_green d-flex align-items-center justify-content-center mx-auto`}
                    >
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
                <div
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
                  <div
                    className={`table-free-column table-column best-result`}
                  >
                    <div
                      className={`result-cell best-result_blue d-flex align-items-center justify-content-center mx-auto`}
                    >
                      2
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div
            className={`table-free-footer table-footer d-flex align-items-center justify-content-between`}
          >
            <div className={`table-free-column table-column`}>
              Лучшие показатели
            </div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_green best-result-indicator mx-auto"></div>
            </div>
            <div className={`table-free-column table-column`}></div>
            <div className={`table-free-column table-column`}>
              <div className="best-result_blue best-result-indicator mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    )}
  </div>
  )
}

export default TableBaseTariffs