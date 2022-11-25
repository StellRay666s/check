import React from "react";
import Link from "next/link";
import axios from "axios";

function MatchPlate({
  logoTeamHome,
  logoTeamAway,
  timeStamp,
  nameAway,
  nameHome,
  eventId,
}) {
  const time = timeStamp;
  const milleSeconds = time * 1000;
  const datteObject = new Date(milleSeconds);
  const hour = datteObject.toLocaleString("en-UK", { hour: "numeric" });
  const minute = datteObject.toLocaleString("en-UK", { minute: "numeric" });

  return (
    <Link href={`/match/${eventId}`}>
      <a className={`forecast-item d-flex align-items-center`}>
        <div
          className={`forecast-item-date d-flex align-items-center justify-content-center`}
        >
          {" "}
          {hour}:{minute < 9 ? minute + "0" : minute}
        </div>
        <div
          className={`forecast-item-content d-flex align-items-center justify-content-between`}
        >
          <div
            className={`forecast-item-team d-flex align-items-center justify-content-between position-relative`}
          >
            <div className={`forecast-item-name text-center`}>{nameHome}</div>
            <div className={`forecast-item-team-logo`}>
              <img
                className={`w-100 h-100`}
                src={logoTeamHome[0].replace("flashscore", "flashscorekz")}
                alt=""
              />
            </div>
          </div>
          <div className={`forecast-item-nums d-flex align-items-center`}>
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
                src={logoTeamAway[0].replace("flashscore", "flashscorekz")}
                alt=""
              />
            </div>
            <div className={`forecast-item-name ms-auto text-center`}>
              {nameAway}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default MatchPlate;
