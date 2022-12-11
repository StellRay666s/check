import React, { useState } from "react";
import HowItWork from "../components/how-it-work";
import { useDispatch, useSelector } from "react-redux";
import MainSlider from "../components/main-slider";
import { MainLayout } from "../layouts/MainLayout";
import ForecastBlock from "../components/forecast_block";
import SeoBlock from "../components/seo_block";
import MainTriggersBlock from "../components/main-triggers_block";
import Sidebar from "../components/sidebar";
import "swiper/css";
import SidebarTariffs from "../components/sidebar/sidebar-tariffs";
import { fetchLeagues } from "../redux/slices/leagueSlice";
import axios from "axios";

export default function Home() {
  const [isVisible, setIsVisible] = React.useState(false);
  const [todayMatchces, setTodayMatches] = React.useState([]);
  const [todayHockeyMatches, setTodayHockeyMatches] = React.useState([]);
  const [tomorrowMatches, setTomorrowMatches] = React.useState([]);
  const [tomorrowMatchesHockey, setTomorrowMatchesHockey] = React.useState([]);
  const leag = useSelector((state) => state.league);
  const TEMPLATE_ID = leag?.leag?.map((item) => item.TEMPLATE_ID);

  console.log(tomorrowMatches);

  async function todayEvents() {
    const response = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "1",
          indent_days: "0",
          timezone: "-3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );

    const response2 = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "4",
          indent_days: "0",
          timezone: "-3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );

    // setTodayHockeyMatches(
    //   response2.data.DATA.filter((item) => item.NAME === "США: НХЛ")
    // );

    setTodayMatches(
      response.data.DATA.filter((item) =>
        TEMPLATE_ID?.includes(item.TEMPLATE_ID)
      )
    );
  }

  async function tommorowEvents() {
    const response = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "1",
          indent_days: "1",
          timezone: "-3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    setTomorrowMatches(
      response.data.DATA.filter((item) =>
        TEMPLATE_ID?.includes(item.TEMPLATE_ID)
      )
    );

    const response2 = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/list",
      {
        params: {
          locale: "ru_RU",
          sport_id: "4",
          indent_days: "1",
          timezone: "-3",
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );

    setTomorrowMatchesHockey(
      response2.data.DATA.filter((item) => item.NAME === "США: НХЛ")
    );
  }

  const footmallTodayMatches = todayMatchces.flatMap((item) => item.EVENTS);
  const footballTommorowMAtches = tomorrowMatches.flatMap(
    (item) => item.EVENTS
  );

  const hockeyTomorrow = tomorrowMatchesHockey.map((item) => item.EVENTS);
  const dispatch = useDispatch();

  React.useEffect(() => {
    function resize() {
      if (window.innerWidth <= 500) {
        setIsVisible(true);
      }
      if (window.innerWidth > 500) {
        setIsVisible(false);
      }
    }
    window.addEventListener("resize", resize);
    dispatch(fetchLeagues());
  }, []);

  React.useEffect(() => {
    if (dispatch) {
      setTimeout(() => {
        todayEvents();
      }, 1000);
      setTimeout(() => {
        tommorowEvents(), 1500;
      });
    }
  }, [leag.leag]);

  return (
    <MainLayout title={"Главная"}>
      <main>
        <MainSlider />
        <HowItWork />
        <div className={`main-content sidebar-translate`}>
          <div className={`container mx-auto d-grid`}>
            <div className={`main-column d-flex flex-column`}>
              <ForecastBlock
                day={"сегодня"}
                // hocceyMatches={hockeyToday}
                footballMatches={footmallTodayMatches}
              />
              {isVisible && <SidebarTariffs />}
              <ForecastBlock
                footballMatches={footballTommorowMAtches}
                hocceyMatches={hockeyTomorrow}
                day={"завтра"}
              />
              <MainTriggersBlock />
              <SeoBlock />
            </div>
            <Sidebar leagues={leag} />
          </div>
        </div>
      </main>
    </MainLayout>
  );
}
