import React from "react";
import ForecastTab from "./ForecastTab";
import TableStatsPremiumTariffs from "./TableStatsPremiumTariffs";

function TablePremiumTariffs({
  handlematch,
  handletime1,
  handletime2,
  handletime3,
  numbers,
  activeForecastTab,
  logoHome,
  logoAway,
  statsAll,
  firstTime,
  secondTime,
  tournament,
  firstPeriod,
  secondPeriod,
  thirdPeriod,
}) {
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
          nameTab={"1-тайм"}
          activeForecastTab={activeForecastTab}
          handlematch={handletime1}
          time={"time1"}
        />
        <ForecastTab
          nameTab={"2-тайм"}
          activeForecastTab={activeForecastTab}
          handlematch={handletime2}
          time={"time2"}
        />
        {tournament?.NAME === "США: НХЛ" ? (
          <ForecastTab
            nameTab={"3-тайм"}
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
            <TableStatsPremiumTariffs
              stats={statsAll}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time1" ? (
            <TableStatsPremiumTariffs
              stats={firstPeriod}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time2" ? (
            <TableStatsPremiumTariffs
              stats={secondPeriod}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time3" ? (
            <TableStatsPremiumTariffs
              stats={thirdPeriod}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {activeForecastTab === "match" ? (
            <TableStatsPremiumTariffs
              stats={statsAll}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time1" ? (
            <TableStatsPremiumTariffs
              stats={firstTime}
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              tournament={tournament}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time2" ? (
            <TableStatsPremiumTariffs
              numbers={numbers}
              logoHome={logoHome}
              logoAway={logoAway}
              stats={secondTime}
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

export default TablePremiumTariffs;
