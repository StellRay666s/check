import React from "react";
import ForecastTab from "./ForecastTab";
import TableStatsBaseTariff from "./TableStatsBaseTariff";

function TableBaseTariffs({
  handlematch,
  handletime1,
  handletime2,
  handletime3,
  numbers,
  activeForecastTab,
  logoHome,
  statsAll,
  firstTime,
  logoAway,
  secondTime,
  tournament,
  firstPeriod,
  secondPeriod,
  thirdPeriod,
}) {
  console.log(firstPeriod);
  return (
    <div className={`forecast-tabs`}>
      <div className={`forecast-tabs-buttons d-flex align-items-center`}>
        <ForecastTab
          nameTab={"Матч"}
          activeForecastTab={activeForecastTab}
          handlematch={handlematch}
          time={"match"}
        />
        <ForecastTab
          nameTab={tournament?.NAME === "США: НХЛ" ? "1-период" : "1-тайм"}
          activeForecastTab={activeForecastTab}
          handlematch={handletime1}
          time={"time1"}
        />
        <ForecastTab
          nameTab={tournament?.NAME === "США: НХЛ" ? "2-период" : "2-тайм"}
          activeForecastTab={activeForecastTab}
          handlematch={handletime2}
          time={"time2"}
        />
        {tournament?.NAME === "США: НХЛ" ? (
          <ForecastTab
            nameTab={tournament?.NAME === "США: НХЛ" ? "3-период" : ""}
            activeForecastTab={activeForecastTab}
            handlematch={handletime3}
            time={"time3"}
          />
        ) : (
          ""
        )}
      </div>
      {tournament?.NAME === "США: НХЛ" ? (
        <>
          {activeForecastTab === "match" ? (
            <TableStatsBaseTariff
              activeForecastTab={activeForecastTab}
              statsAll={statsAll}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time1" ? (
            <TableStatsBaseTariff
              statsAll={firstPeriod}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time2" ? (
            <TableStatsBaseTariff
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              statsAll={secondPeriod}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time3" ? (
            <TableStatsBaseTariff
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              statsAll={thirdPeriod}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {activeForecastTab === "match" ? (
            <TableStatsBaseTariff
              statsAll={statsAll}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time1" ? (
            <TableStatsBaseTariff
              statsAll={firstTime}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time2" ? (
            <TableStatsBaseTariff
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              statsAll={secondTime}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
        </>
      )}
    </div>
  );
}

export default TableBaseTariffs;
