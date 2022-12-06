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
      {activeForecastTab === "match" ? (
        <TableStatsPremiumTariffs
          stats={statsAll}
          logoHome={logoHome}
          logoAway={logoAway}
        />
      ) : (
        <></>
      )}
      {activeForecastTab === "time1" ? (
        <TableStatsPremiumTariffs
          stats={firstTime}
          logoHome={logoHome}
          logoAway={logoAway}
        />
      ) : (
        <></>
      )}
      {activeForecastTab === "time2" ? (
        <TableStatsPremiumTariffs
          stats={secondTime}
          logoHome={logoHome}
          logoAway={logoAway}
        />
      ) : (
        <></>
      )}
      {activeForecastTab === "time3" ? (
        <TableStatsPremiumTariffs logoHome={logoHome} logoAway={logoAway} />
      ) : (
        <></>
      )}
    </div>
  );
}

export default TablePremiumTariffs;
