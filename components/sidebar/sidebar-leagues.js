import React from "react";
import Link from "next/link";
import axios from "axios";

export default function SidebarLeagues({ leagues }) {
  const [popularLeag, setPopularLeag] = React.useState([]);

  async function getPopularLeag() {
    const response = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/tournaments/popular",
      {
        params: { locale: "ru_RU" },
        headers: {
          "X-RapidAPI-Key":
            "be050b25e5msh6c1665177826c1cp187ca3jsn813ff1055e41",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    setPopularLeag(response.data[0].TEMPLATE_IDS);
  }

  React.useEffect(() => {
    // getPopularLeag();
  }, []);
  return (
    <div className={`popular-leagues`}>
      <div className={`sidebar-name`}>Популярные лиги</div>
      <div className={`popular-leagues-content`}>
        {leagues?.leag
          ?.filter(
            (item) =>
              item.TEMPLATE_ID === popularLeag[0] ||
              item.TEMPLATE_ID === popularLeag[1] ||
              item.TEMPLATE_ID === popularLeag[2] ||
              item.TEMPLATE_ID === popularLeag[3] ||
              item.TEMPLATE_ID === popularLeag[4] ||
              item.TEMPLATE_ID === popularLeag[5] ||
              item.TEMPLATE_ID === popularLeag[6] ||
              item.TEMPLATE_ID === popularLeag[7] ||
              item.TEMPLATE_ID === popularLeag[8]
          )

          .map((item, index) => (
            <Link key={index} href="/">
              <a className={`league-item d-flex align-items-center`}>
                <div className="league-icon">
                  <img src="../images/league.png" alt="" />
                </div>
                <div className="league-name">{item?.LEAGUE_NAME}</div>
              </a>
            </Link>
          ))}
      </div>
    </div>
  );
}
