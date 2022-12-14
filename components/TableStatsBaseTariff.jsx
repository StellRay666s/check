import React from "react";
import StatsPlate from "./StatsPlate";

function TableStatsBaseTariff({
  logoHome,
  logoAway,
  statsAll,
  tournament,
  activeForecastTab,
}) {
  React.useEffect(() => {}, [statsAll]);
  return (
    <div className={`match-tab-content`}>
      <div className={`match-forecast-table-free mx-auto`}>
        <div className="table-free-titles d-flex align-items-center justify-content-between">
          <div className={`table-free-column table-column`}></div>
          <div className={`table-free-column table-column text-center`}>
            Total 1
          </div>
          <div className={`table-free-column table-column text-center`}>
            Total match
          </div>
          <div className={`table-free-column table-column text-center`}>
            Total 2
          </div>
        </div>
        <div
          className={`table-free-head table-head d-flex align-items-center justify-content-between`}
        >
          <div className={`table-free-column table-column`}>Показатели</div>
          <div className={`table-free-column table-column`}>
            <div className="table-free-logo mx-auto">
              <img src={logoHome} alt="" />
            </div>
          </div>
          <div className={`table-free-column table-column`}></div>
          <div className={`table-free-column table-column`}>
            <div className="table-free-logo mx-auto">
              <img src={logoAway} alt="" />
            </div>
          </div>
        </div>
        <div className="table-free-body">
          <StatsPlate
            homeStats={statsAll?.individTotalHomeGoal}
            totalStats={
              statsAll?.individTotalAwayGoal + statsAll?.individTotalHomeGoal
            }
            totalAway={statsAll?.individTotalAwayGoal}
            statsName={"Голы"}
          />

          {tournament?.NAME === "США: НХЛ" ? (
            <>
              <StatsPlate
                homeStats={statsAll?.individTotalHome}
                totalAway={statsAll?.individTotalAway}
                totalStats={
                  statsAll?.individTotalAway + statsAll?.individTotalHome
                }
                statsName={"Удары в створ"}
              />
              <StatsPlate
                homeStats={statsAll?.individeTotalBlockedShotsHome}
                totalAway={statsAll?.individeTotalBlockedShotsAway}
                totalStats={
                  statsAll?.individeTotalBlockedShotsAway +
                  statsAll?.individeTotalBlockedShotsHome
                }
                statsName={"Блок-но ударов"}
              />
              <StatsPlate
                statsName={"2мин. удаления"}
                homeStats={statsAll?.twiMinutsIndividTotalHome}
                totalAway={statsAll?.twoMinutsIndividTotalAway}
                totalStats={
                  statsAll?.twiMinutsIndividTotalHome +
                  statsAll?.twoMinutsIndividTotalAway
                }
              />
            </>
          ) : (
            <>
              <StatsPlate
                homeStats={statsAll?.cornerIndividTotalHome}
                totalStats={
                  statsAll?.cornerIndividTotalAway +
                  statsAll?.cornerIndividTotalHome
                }
                totalAway={statsAll?.cornerIndividTotalAway}
                statsName={"Угловые"}
              />
              <StatsPlate
                homeStats={statsAll?.individTotalHome}
                totalStats={
                  statsAll?.individTotalAway + statsAll?.individTotalHome
                }
                totalAway={statsAll?.individTotalAway}
                statsName={"Удары в створ"}
              />
              <StatsPlate
                homeStats={statsAll?.individeTotalBlockedShotsHome}
                totalAway={statsAll?.individeTotalBlockedShotsAway}
                totalStats={
                  statsAll?.individeTotalBlockedShotsAway +
                  statsAll?.individeTotalBlockedShotsHome
                }
                statsName={"Блок-но ударов"}
              />
              <StatsPlate
                homeStats={statsAll?.individOfsidersHome}
                totalStats={
                  statsAll?.individOfsidersAway + statsAll?.individOfsidersHome
                }
                totalAway={statsAll?.individOfsidersAway}
                statsName={"Офсайды"}
              />
              <StatsPlate
                homeStats={statsAll?.individfollsHome}
                totalStats={
                  statsAll?.individfollsAway + statsAll?.individfollsHome
                }
                totalAway={statsAll?.individfollsAway}
                statsName={"Фолы"}
              />
              <StatsPlate
                homeStats={statsAll?.individTotalYellowCardHome}
                totalStats={
                  statsAll?.individTotalYellowCardHome +
                  statsAll?.individTotalYellowCardAway
                }
                totalAway={statsAll?.individTotalYellowCardAway}
                statsName={"Желтые карточки"}
              />
            </>
          )}
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
  );
}

export default TableStatsBaseTariff;
