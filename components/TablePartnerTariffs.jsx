import React from "react";
import ForecastTab from "./ForecastTab";
import TableStatsPartnerTariffs from "./TableStatsPartnerTariffs";

function TablePartnerTariffs({
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
            <TableStatsPartnerTariffs
              stats={statsAll}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time1" ? (
            <TableStatsPartnerTariffs
              stats={firstPeriod}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time2" ? (
            <TableStatsPartnerTariffs
              stats={secondPeriod}
              logoAway={logoAway}
              logoHome={logoHome}
            />
          ) : (
            <></>
          )}
          {activeForecastTab === "time3" ? (
            <TableStatsPartnerTariffs
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
            <TableStatsPartnerTariffs
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
            <TableStatsPartnerTariffs
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
            <TableStatsPartnerTariffs
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

export default TablePartnerTariffs;
