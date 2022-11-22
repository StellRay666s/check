import React from "react";
import Link from "next/link";
import MatchPlate from "./MatchPlate";
import axios from "axios";

function PronosisTable({
  titleTable,
  matches = [],
  logo,
  id,
  sportTitle,
  isLoad,
}) {
  const [season, setSeason] = React.useState("");
  const oneLeague = matches.filter((item) => item.tournament.id === Number(id));
  const [leagLogo, setLeagLogo] = React.useState("");
  // React.useEffect(() => {
  //   axios
  //     .get("https://os-sports-perform.p.rapidapi.com/v1/tournaments/seasons", {
  //       params: { tournament_id: id },
  //       headers: {
  //         "X-RapidAPI-Key":
  //           "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
  //         "X-RapidAPI-Host": "os-sports-perform.p.rapidapi.com",
  //       },
  //     })
  //     .then((res) => setSeason(res.data.data.seasons[0]));
  // }, [id]);
  const uniqueID = String(
    matches.map((item) => item.tournament.uniqueTournament.id)
  );

  async function getLogoLeag() {
    if (isLoad) {
      const response = await axios.get(
        "https://os-sports-perform.p.rapidapi.com/v1/unique-tournaments/logo",

        {
          responseType: "blob",
          params: { unique_tournament_id: uniqueID },
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
      setLeagLogo(image);
    }
  }

  React.useEffect(() => {
    setTimeout(() => {
      // getLogoLeag();
    });
  }, [uniqueID]);

  return (
    <div className={`forecast-block`}>
      <div className={`forecast-title`}>
        Прогнозы на <span>{titleTable}</span>
      </div>
      <div className={`forecast-tab-content`}>
        <div className="forecast-head d-flex align-items-center">
          <div className="  league-logo">
            <img src={leagLogo} alt="" />
          </div>
          <div className="forecast-head-info">
            <div className="forecast-head-name"></div>
            <div className="forecast-head-text">
              {sportTitle} / {season.name}
            </div>
          </div>
        </div>
        <div className={`forecast-table d-flex flex-column`}>
          {matches
            .filter((item) => item.tournament.id === Number(id))
            .slice(0, 6)
            .map((item, index) => (
              <MatchPlate
                key={index}
                match={item}
                awayTeamId={item.awayTeam.id}
                homeTeamId={item.homeTeam.id}
              />
            ))}
        </div>
      </div>
    </div>
  );
}

export default PronosisTable;
