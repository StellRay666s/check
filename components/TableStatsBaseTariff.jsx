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
          {tournament?.NAME === "США: НХЛ" ? (
            <>
              {activeForecastTab === "match" && (
                <StatsPlate
                  homeStats={statsAll?.totalMatchWithoutInjuriesHome}
                  totalStats={statsAll?.finallyTotalGoal}
                  totalAway={statsAll?.totalMatchWithoutInjuriesGuest}
                  statsName={"Голы"}
                />
              )}
              <StatsPlate
                homeStats={statsAll?.totalInjuriesHome}
                totalAway={statsAll?.totalInjuriesAway}
                totalStats={statsAll?.totalShotsOnTarget}
                statsName={"Удары в створ"}
              />
              <StatsPlate
                homeStats={statsAll?.injuriesBlockedShotsHome}
                totalAway={statsAll?.injuriesBlockedShotsAway}
                totalStats={statsAll?.totalShotsBlocked}
                statsName={"Блок-но ударов"}
              />
              <StatsPlate
                statsName={"2мин. удаления"}
                homeStats={statsAll?.twoMinutsRemoveInjuriesHome}
                totalAway={statsAll?.twoMinutsRemoveInjuriesAway}
                totalStats={statsAll?.twoMinutsRemoveTotalInjuries}
              />
            </>
          ) : (
            <>
              {activeForecastTab === "match" && (
                <StatsPlate
                  homeStats={statsAll?.totalMatchWithoutInjuriesHome}
                  totalStats={statsAll?.finallyTotalGoal}
                  totalAway={statsAll?.totalMatchWithoutInjuriesGuest}
                  statsName={"Голы"}
                />
              )}

              <StatsPlate
                homeStats={statsAll?.cornerInjuriesHome}
                totalStats={statsAll?.cornerTotalInjuries}
                totalAway={statsAll?.cornerInjuriesAway}
                statsName={"Угловые"}
              />
              <StatsPlate
                homeStats={statsAll?.totalInjuriesHome}
                totalStats={statsAll?.totalShotsOnTarget}
                totalAway={statsAll?.totalInjuriesAway}
                statsName={"Удары в створ"}
              />
              <StatsPlate
                homeStats={statsAll?.injuriesBlockedShotsHome}
                totalStats={statsAll?.totalShotsBlocked}
                totalAway={statsAll?.injuriesBlockedShotsAway}
                statsName={"Блок-но ударов"}
              />
              <StatsPlate
                homeStats={statsAll?.offsidersInjurieHome}
                totalStats={statsAll?.totalOfidersInjuriesHome}
                totalAway={statsAll?.offsidersInjuriesAway}
                statsName={"Офсайды"}
              />
              <StatsPlate
                homeStats={statsAll?.follsInjurieHome}
                totalStats={statsAll?.totalFollsInjuries}
                totalAway={statsAll?.follsInjuriesAway}
                statsName={"Фолы"}
              />
              <StatsPlate
                homeStats={statsAll?.injuriesYellowCardHome}
                totalStats={statsAll?.totalYellowCardInjuries}
                totalAway={statsAll?.injuriesYellowCardAway}
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
