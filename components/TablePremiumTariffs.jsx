import React from 'react'

function TablePremiumTariffs({handlematch,handletime1,handletime2,handletime3, numbers,activeForecastTab }) {
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
                    <div className={`match-forecast-table-premium mx-auto`}>
                      <div
                        className={`table-premium-head table-head d-flex align-items-center justify-content-between`}
                      >
                        <div
                          className={`table-premium-column table-column`}
                        ></div>
                        <div className={`table-premium-column table-column`}>
                          Показатели
                        </div>
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
                        <div
                          className={`table-premium-item table-item d-flex flex-column`}
                        >
                          <div
                            className={`table-premium-row d-flex align-items-center justify-content-between`}
                          >
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div className="table-premium-logo table-logo_mini mx-auto">
                                <img src="../images/match-team.png" alt="" />
                              </div>
                            </div>
                            <div
                              className={`table-premium-column step-arrow step-arrow_s table-column position-relative`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                3
                              </div>
                            </div>
                            <div
                              className={`table-premium-column step-arrow step-arrow_m table-column position-relative`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                1
                              </div>
                            </div>
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                2
                              </div>
                            </div>
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                2
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
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
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
                        <div
                          className={`table-premium-item table-item d-flex flex-column`}
                        >
                          <div
                            className={`table-premium-row d-flex align-items-center justify-content-between`}
                          >
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div className="table-premium-logo table-logo_mini mx-auto">
                                <img src="../images/match-team.png" alt="" />
                              </div>
                            </div>
                            <div
                              className={`table-premium-column step-arrow step-arrow_s table-column position-relative`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                3
                              </div>
                            </div>
                            <div
                              className={`table-premium-column step-arrow step-arrow_m table-column position-relative`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                1
                              </div>
                            </div>
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                2
                              </div>
                            </div>
                            <div
                              className={`table-premium-column table-column`}
                            >
                              <div
                                className={`result-cell d-flex align-items-center justify-content-center mx-auto`}
                              >
                                2
                              </div>
                            </div>
                            <div
                              className={`table-premium-column table-column d-flex align-items-center`}
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
                            className={`table-premium-row table-premium-row-forecast d-flex align-items-center justify-content-between`}
                          >
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column`}
                            ></div>
                            <div
                              className={`table-premium-column table-column d-flex align-items-center justify-content-end`}
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
  )
}

export default TablePremiumTariffs