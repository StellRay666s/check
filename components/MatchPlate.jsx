import React from "react";
import Link from "next/link";
import axios from "axios";
import { useDispatch } from "react-redux";
import { fetchCurrentMatch } from "../redux/slices/currentMatchesSlice";

function MatchPlate({ match, awayTeamId, homeTeamId }) {
  const [logoTeamAway, setLogoTeamAway] = React.useState("");
  const [logoTeamHome, setLogoTeamHome] = React.useState("");
  const dispatch = useDispatch();

  // function getCurrentMatch(id) {
  //   dispatch(fetchCurrentMatch({ id }));
  // }

  const timeStamp = match.startTimestamp;
  const milleSeconds = timeStamp * 1000;
  const datteObject = new Date(milleSeconds);
  const hour = datteObject.toLocaleString("en-UK", { hour: "numeric" });
  const minute = datteObject.toLocaleString("en-UK", { minute: "numeric" });

  async function getLogoAwayTeam() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/teams/logo",

      {
        responseType: "blob",
        params: { team_id: awayTeamId },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          "content-type": "image/png",
        },
      }
    );

    let blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    let image = URL.createObjectURL(blob);
    setLogoTeamAway(image);
  }
  async function getLogoHomeTeam() {
    const response = await axios.get(
      "https://os-sports-perform.p.rapidapi.com/v1/teams/logo",

      {
        responseType: "blob",
        params: { team_id: homeTeamId },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
          "content-type": "image/png",
        },
      }
    );

    let blob = new Blob([response.data], {
      type: response.headers["content-type"],
    });
    let image = URL.createObjectURL(blob);
    setLogoTeamHome(image);
  }

  // React.useState(() => {
  //   getLogoHomeTeam();
  //   getLogoAwayTeam();
  // }, []);

  return (
    <Link href={`/match/${match.id}`}>
      <a
        // onClick={() => getCurrentMatch(match.id)}
        className={`forecast-item d-flex align-items-center`}
      >
        <div
          className={`forecast-item-date d-flex align-items-center justify-content-center`}
        >
          {" "}
          {hour}:{minute}
        </div>
        <div
          className={`forecast-item-content d-flex align-items-center justify-content-between`}
        >
          <div
            className={`forecast-item-team d-flex align-items-center justify-content-between position-relative`}
          >
            <div className={`forecast-item-name text-center`}>
              {match.homeTeam.name}
            </div>
            <div className={`forecast-item-team-logo`}>
              <img className={`w-100 h-100`} src={logoTeamHome} alt="" />
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
              <img className={`w-100 h-100`} src={logoTeamAway} alt="" />
            </div>
            <div className={`forecast-item-name ms-auto text-center`}>
              {match.awayTeam.name}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
}

export default MatchPlate;
