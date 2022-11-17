import React from 'react'
import Link from 'next/link'

function PronosisTable({titleTable, numbers}) {
  return (
    <div className={`forecast-block`}>
                <div className={`forecast-title`}>
                  Прогнозы на <span>{titleTable}</span>
                </div>
                <div className={`forecast-tab-content`}>
                  <div className="forecast-head d-flex align-items-center">
                    <div className="league-logo">
                      <img src="../images/nhl.png" alt="" />
                    </div>
                    <div className="forecast-head-info">
                      <div className="forecast-head-name">
                        Национальная хоккейная лига
                      </div>
                      <div className="forecast-head-text">
                        Хоккей / Сезон 2022-2023
                      </div>
                    </div>
                  </div>
                  <div className={`forecast-table d-flex flex-column`}>
                    {numbers.map((index) => (
                      <Link key={index} href={"/match"}>
                        <a
                          className={`forecast-item d-flex align-items-center`}
                        >
                          <div
                            className={`forecast-item-date d-flex align-items-center justify-content-center`}
                          >
                            17:20
                          </div>
                          <div
                            className={`forecast-item-content d-flex align-items-center justify-content-between`}
                          >
                            <div
                              className={`forecast-item-team d-flex align-items-center justify-content-between position-relative`}
                            >
                              <div className={`forecast-item-name text-center`}>
                                Манчестер Юнайтед
                              </div>
                              <div className={`forecast-item-team-logo`}>
                                <img
                                  className={`w-100 h-100`}
                                  src="../images/team-1.png"
                                  alt=""
                                />
                              </div>
                            </div>
                            <div
                              className={`forecast-item-nums d-flex align-items-center`}
                            >
                              <div
                                className={`forecast-item-num d-flex align-items-center justify-content-center`}
                              >
                                0.1
                              </div>
                              <div
                                className={`forecast-item-num d-flex align-items-center justify-content-center`}
                              >
                                2.2
                              </div>
                            </div>
                            <div
                              className={`forecast-item-team d-flex align-items-center position-relative`}
                            >
                              <div className={`forecast-item-team-logo`}>
                                <img
                                  className={`w-100 h-100`}
                                  src="../images/team-2.png"
                                  alt=""
                                />
                              </div>
                              <div
                                className={`forecast-item-name ms-auto text-center`}
                              >
                                Реал Мадрид
                              </div>
                            </div>
                          </div>
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
  )
}

export default PronosisTable