//Хозяева
//Голы
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function useCalculateFormule(eventId) {
  const { query } = useRouter();
  const [currentMatch, setCurrentMatch] = React.useState();
  const [previosMatchHome, setPreviosMatchHome] = React.useState([]);
  const [previosMatchAway, setPreviosMatchAway] = React.useState([]);
  const [tournament, setTournament] = React.useState();
  const [statsForSixMatchesHome, setStatsForSixMatchesHome] = React.useState(
    []
  );
  const [statsForFourMatchesHome, setStatsForFourMatchesHome] = React.useState(
    []
  );
  const [statsForSixMatchesAway, setStatsForSixMatchesAway] = React.useState(
    []
  );
  const [statsForFourMatchesAway, setStatsForFourMatchesAway] = React.useState(
    []
  );

  const time = currentMatch?.START_TIME;
  const milleSeconds = time * 1000;
  const datteObject = new Date(milleSeconds);
  const hour = datteObject.toLocaleString("en-UK", { hour: "numeric" });
  const minute = datteObject.toLocaleString("en-UK", { minute: "numeric" });
  const day = datteObject.toLocaleString("en-UK", { day: "numeric" });
  const month = datteObject.toLocaleString("ru-RU", { month: "long" });

  // Кол-во игр в лиге

  function calculateStats(period) {
    if (currentMatch) {
      const countGameHome = previosMatchHome.length;
      const countGameAway = previosMatchAway.length;

      //Забито в лиге
      const goalsInTheLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.KX) || Number(match.HOME_SCORE_FULL);
      }, 0);
      const goalsInTheLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.KX) || Number(match.AWAY_SCORE_FULL);
      }, 0);

      const middleGoalInLeagHome = goalsInTheLeagHome / countGameHome;
      const middleGoalInLeagAway = goalsInTheLeagAway / countGameAway;

      //Пропущено в лиге
      const missedInLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.KY) || Number(match.AWAY_SCORE_FULL);
      }, 0);
      const missedInLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.KX) || Number(match.HOME_SCORE_FULL);
      }, 0);

      const middleMissInLeagHome = missedInLeagHome / countGameHome;
      const middleMissInLeagAway = missedInLeagAway / countGameAway;

      //Забито за 4 матча
      const goalsForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const goalsForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForFourMatchesHome = goalsForFourMatchHome / 4;
      const middleGoalForFourMatchesAway = goalsForFourMatchAway / 4;

      //Забито за 6 матчей
      const goalsForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const goalsForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForSixMatchesHome = goalsForSixMatchHome / 6;
      const middleGoalForSixMatchesAway = goalsForSixMatchAway / 6;

      //Голы хозяев и гостей
      const goalHome =
        middleGoalForFourMatchesHome * 0.6 + middleGoalForSixMatchesHome * 0.4;

      const goalAway =
        middleGoalForFourMatchesAway * 0.6 + middleGoalForSixMatchesAway * 0.4;

      //Пропущено за 4 матча
      const misedForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const misedForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForFourMatcesHome = misedForFourMatchHome / 4;
      const middleMissedForFourMatcesAway = misedForFourMatchAway / 4;

      //Пропущено за 6 матчей
      const misedForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const misedForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForSixMatcesHome = misedForSixMatchHome / 6;
      const middleMissedForSixMatcesAway = misedForSixMatchAway / 6;

      //Пропущенные хозяев и гостей
      const missedHome =
        middleMissedForFourMatcesHome * 0.6 +
        middleMissedForSixMatcesHome * 0.4;
      const missedAway =
        middleMissedForFourMatcesAway * 0.6 +
        middleMissedForSixMatcesAway * 0.4;

      //Голы тотал
      //Без травм
      const totalMatchWithoutInjuriesHome = goalHome + missedHome;
      const totalMatchWithoutInjuriesGuest = goalAway + missedAway;
      const finallyTotalGoal =
        (totalMatchWithoutInjuriesHome + totalMatchWithoutInjuriesGuest) / 2;

      //totalMatchWithoutInjuriesHome,,totalMatchWithoutInjuriesGuest,finallyTotalGoal
      //Индивидуальный тотал
      const individTotalHomeGoal = (goalHome + missedAway) / 2;
      const individTotalAwayGoal = (goalAway + missedHome) / 2;

      //Результативность лиги
      const efficiencyLeagHome =
        (goalsForSixMatchHome + misedForSixMatchHome) / 6;
      const efficiencyLeagAway =
        (goalsForSixMatchAway + misedForSixMatchAway) / 6;
      const middleEfficiencyLeagHome = efficiencyLeagHome / 2;
      const middleEfficiencyLeagAway = efficiencyLeagAway / 2;

      //Ценность  забитого
      const scoringValueHome = middleEfficiencyLeagHome / middleGoalInLeagHome;
      const scoringValueAway = middleEfficiencyLeagAway / middleGoalInLeagAway;

      //Ценность пропущенного
      const valueOfMissingHome =
        middleEfficiencyLeagHome / middleMissInLeagHome;
      const valueOfMissingAway =
        middleEfficiencyLeagAway / middleMissInLeagAway;

      const periods = statsForSixMatchesHome.filter(
        (item) => item.STAGE_NAME === period
      );

      const periodsAway = statsForSixMatchesAway.filter(
        (item) => item.STAGE_NAME === period
      );

      const statsForPeriodsHome = periods.map((item) => item?.GROUPS?.[0]);
      const statsForPeriodsAway = periodsAway.map((item) => item?.GROUPS?.[0]);

      const cornerShotsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Угловые")?.[0]
      );
      const cornerShotsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Угловые")?.[0]
      );
      const checkTeamSideHome = previosMatchHome.map(
        (item) => item.TEAM_MARK === "home"
      );

      const checkTeamSideAway = previosMatchAway.map(
        (item) => item.TEAM_MARK === "away"
      );

      function getBaseStats(a, b, c, d, e, arr) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? arr
                .filter((item) => item !== undefined)
                .slice(b, c)
                .reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_AWAY);
                }, 0)
            : arr
                .filter((item) => item !== undefined)
                .slice(b, c)
                .reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_HOME);
                }, 0)
          : checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0);
      }

      function getBaseStatsEnemy(a, b, c, d, e, arr) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? arr
                .filter((item) => item !== undefined)
                .slice(b, c)
                .reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_AWAY);
                }, 0)
            : arr
                .filter((item) => item !== undefined)
                .slice(b, c)
                .reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_HOME);
                }, 0)
          : !checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0);
      }

      function getBaseStatsAway(a, b, c, d, e, arr) {
        return checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0);
      }

      function getBaseStatsEnemyAway(a, b, c, d, e, arr) {
        return checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0);
      }

      const firstMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        cornerShotsAway
      );

      const secondMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        cornerShotsAway
      );

      const thirdMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        cornerShotsAway
      );

      const fouthMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        cornerShotsAway
      );

      const fivesMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        cornerShotsAway
      );
      const sixMatchCornerShotHomeAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        cornerShotsAway
      );

      const firstMatchCornerShotAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        cornerShotsAway
      );

      const secondMatchCornerShotAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        cornerShotsAway
      );

      const thirdMatchCornerShotAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        cornerShotsAway
      );

      const fouthMatchCornerShotAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        cornerShotsAway
      );

      const fivesMatchCornerShotAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        cornerShotsAway
      );

      const sixMatchCornerShotHomeAway = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        cornerShotsAway
      );

      const firstMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        cornerShotsHome
      );

      const secondMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        cornerShotsHome
      );

      const thirdMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        cornerShotsHome
      );
      const fouthMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        cornerShotsHome
      );

      const fivesMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        cornerShotsHome
      );
      const sixMatchCornerShotHomeHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        cornerShotsHome
      );

      const firstMatchCornerShotHome = getBaseStats(
        0,
        0,
        3,
        0,
        2,
        cornerShotsHome
      );

      const secondMatchCornerShotHome = getBaseStats(
        1,
        3,
        6,
        2,
        4,
        cornerShotsHome
      );
      const thirdMatchCornerShotHome = getBaseStats(
        2,
        6,
        9,
        4,
        6,
        cornerShotsHome
      );

      const fouthMatchCornerShotHome = getBaseStats(
        3,
        9,
        12,
        6,
        8,
        cornerShotsHome
      );

      const fivesMatchCornerShotHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        cornerShotsHome
      );

      const sixMatchCornerShotHomeHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        cornerShotsHome
      );

      const cornerShotsHomeForFourMatches =
        firstMatchCornerShotHome +
        secondMatchCornerShotHome +
        thirdMatchCornerShotHome +
        fouthMatchCornerShotHome;

      const cornerShotsHomeForSixMatches =
        cornerShotsHomeForFourMatches +
        fivesMatchCornerShotHome +
        sixMatchCornerShotHomeHome;

      const cornerShotsAwayForFourMatches =
        firstMatchCornerShotAway +
        secondMatchCornerShotAway +
        thirdMatchCornerShotAway +
        fouthMatchCornerShotAway;

      const cornerShotsAwayForSixMatches =
        cornerShotsAwayForFourMatches +
        fivesMatchCornerShotAway +
        sixMatchCornerShotHomeAway;

      const missedCorneForFourMatchesHome =
        firstMatchCornerShotHomeEnemy +
        secondMatchCornerShotHomeEnemy +
        thirdMatchCornerShotHomeEnemy +
        fouthMatchCornerShotHomeEnemy;

      const missedCorneForSixMatchesHome =
        missedCorneForFourMatchesHome +
        fivesMatchCornerShotHomeEnemy +
        sixMatchCornerShotHomeHomeEnemy;

      const missedCorneForFourMatchesAway =
        firstMatchCornerShotAwayEnemy +
        secondMatchCornerShotAwayEnemy +
        thirdMatchCornerShotAwayEnemy +
        fouthMatchCornerShotAwayEnemy;

      const missedCorneForSixMatchesAway =
        missedCorneForFourMatchesAway +
        fivesMatchCornerShotAwayEnemy +
        sixMatchCornerShotHomeAwayEnemy;

      const middleCornerShotsHomeForFourMatches =
        cornerShotsHomeForFourMatches / 4;
      const middleCornerShotsHomeForSixMatches =
        cornerShotsHomeForSixMatches / 6;

      const middleCornerShotsAwayForFourMatches =
        cornerShotsAwayForFourMatches / 4;
      const middleCornerShotsAwayForSixMatches =
        cornerShotsAwayForSixMatches / 6;

      const middleMissedCornerShotHomeForFourMatches =
        missedCorneForFourMatchesHome / 4;
      const middleMissedCornerShotHomeForSixMatches =
        missedCorneForSixMatchesHome / 6;

      const middleMissedCornerShotAwayForFourMatches =
        missedCorneForFourMatchesAway / 4;
      const middleMissedCornerShotAwayForSixMatches =
        missedCorneForSixMatchesAway / 6;

      const cornerHome =
        middleCornerShotsHomeForFourMatches * 0.6 +
        middleCornerShotsHomeForSixMatches * 0.4;
      const cornerAway =
        middleCornerShotsAwayForFourMatches * 0.6 +
        middleCornerShotsAwayForSixMatches * 0.4;

      const cornerHomeMissed =
        middleMissedCornerShotHomeForFourMatches * 0.6 +
        middleMissedCornerShotHomeForSixMatches * 0.4;

      const cornerAwayMissed =
        middleMissedCornerShotAwayForFourMatches * 0.6 +
        middleMissedCornerShotAwayForSixMatches * 0.4;

      const cornerIndividTotalHome = (cornerHome + cornerAwayMissed) / 2;
      const cornerIndividTotalAway = (cornerAway + cornerHomeMissed) / 2;

      const cornerInjuriesHome = cornerHome + cornerHomeMissed;
      const cornerInjuriesAway = cornerAway + cornerAwayMissed;
      const cornerTotalInjuries = (cornerInjuriesHome + cornerInjuriesAway) / 2;
      const ofsidesHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item.INCIDENT_NAME === "Офсайды")?.[0]
      );

      const ofsidesAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item.INCIDENT_NAME === "Офсайды")?.[0]
      );

      const firstMatchOffisideHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        ofsidesHome
      );

      const secondMatchOffisideHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        ofsidesHome
      );

      const thirdMatchOffisideHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        ofsidesHome
      );
      const fouthMatchOffisideHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        ofsidesHome
      );

      const fivesMatchOffisideHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        ofsidesHome
      );
      const sixMatchOffisideHomeHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        ofsidesHome
      );

      const firstMatchOffisideHome = getBaseStats(0, 0, 3, 0, 2, ofsidesHome);

      const secondMatchOffisideHome = getBaseStats(1, 3, 6, 2, 4, ofsidesHome);
      const thirdMatchOffisideHome = getBaseStats(2, 6, 9, 4, 6, ofsidesHome);

      const fouthMatchOffisideHome = getBaseStats(3, 9, 12, 6, 8, ofsidesHome);

      const fivesMatchOffisideHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        ofsidesHome
      );

      const sixMatchOffisideHomeHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        ofsidesHome
      );

      const firstMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        ofsidesAway
      );

      const secondMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        ofsidesAway
      );

      const thirdMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        ofsidesAway
      );
      const fouthMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        ofsidesAway
      );

      const fivesMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        ofsidesAway
      );
      const sixMatchOffisideHomeAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        ofsidesAway
      );

      const firstMatchOffisideAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        ofsidesAway
      );

      const secondMatchOffisideAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        ofsidesAway
      );
      const thirdMatchOffisideAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        ofsidesAway
      );

      const fouthMatchOffisideAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        ofsidesAway
      );

      const fivesMatchOffisideAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        ofsidesAway
      );

      const sixMatchOffisideHomeAway = getBaseStatsAway(
        5,
        15,
        18,
        10,
        12,
        ofsidesAway
      );

      const ofsidesHomeFourMatch =
        firstMatchOffisideHome +
        secondMatchOffisideHome +
        thirdMatchOffisideHome +
        fouthMatchOffisideHome;

      const ofsidesHomeSixMatch =
        ofsidesHomeFourMatch +
        fivesMatchOffisideHome +
        sixMatchOffisideHomeHome;

      const missedOffsidesHomeFourMatches =
        firstMatchOffisideHomeEnemy +
        secondMatchOffisideHomeEnemy +
        thirdMatchOffisideHomeEnemy +
        fouthMatchOffisideHomeEnemy;

      const missedOfsidesHomeSixMatch =
        missedOffsidesHomeFourMatches +
        fivesMatchOffisideHomeEnemy +
        sixMatchOffisideHomeHomeEnemy;

      const ofsidesAwayFourMatches =
        firstMatchOffisideAway +
        secondMatchOffisideAway +
        thirdMatchOffisideAway +
        fouthMatchOffisideAway;

      const ofsidesAwaySixMatches =
        ofsidesAwayFourMatches +
        fivesMatchOffisideAway +
        sixMatchOffisideHomeAway;

      const missedOfsidersAwayFour =
        firstMatchOffisideAwayEnemy +
        secondMatchOffisideAwayEnemy +
        thirdMatchOffisideAwayEnemy +
        fouthMatchOffisideAwayEnemy;

      const missedOfsidersAwaySix =
        missedOfsidersAwayFour +
        fivesMatchOffisideAwayEnemy +
        sixMatchOffisideHomeAwayEnemy;

      const middleOfsidersHomeFour = ofsidesHomeFourMatch / 4;
      const middleOfsidersHomeSix = ofsidesHomeSixMatch / 6;

      const middleOfsidersAwayFour = ofsidesAwayFourMatches / 4;
      const middleOfsidersAwaySix = ofsidesAwaySixMatches / 6;

      const middleMissedOfsidersHomeFour = missedOffsidesHomeFourMatches / 4;
      const middleMissedOfsidersHomeSix = missedOfsidesHomeSixMatch / 6;

      const middleMissedOfsidersAwayFour = missedOfsidersAwayFour / 4;
      const middleMissedOfsidersAwaySix = missedOfsidersAwaySix / 6;

      const ofsidersHome =
        middleOfsidersHomeFour * 0.6 + middleOfsidersHomeSix * 0.4;

      const ofsiderAway =
        middleOfsidersAwayFour * 0.6 + middleOfsidersAwaySix * 0.4;

      const missingOfsidersHome =
        middleMissedOfsidersHomeFour * 0.6 + middleMissedOfsidersHomeSix * 0.4;

      const missingOfsidersAway =
        middleMissedOfsidersAwayFour * 0.6 + middleMissedOfsidersAwaySix * 0.4;

      const individOfsidersHome = (ofsidersHome + missingOfsidersAway) / 2;
      const individOfsidersAway = (ofsiderAway + missingOfsidersHome) / 2;

      const offsidersInjurieHome = ofsidersHome + missingOfsidersHome;
      const offsidersInjuriesAway = ofsiderAway + missingOfsidersAway;
      const totalOfidersInjuriesHome =
        (offsidersInjurieHome + offsidersInjuriesAway) / 2;

      const follsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item.INCIDENT_NAME === "Фолы")?.[0]
      );
      const follsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item.INCIDENT_NAME === "Фолы")?.[0]
      );

      const firstMatchFollsEnemy = getBaseStatsEnemy(0, 0, 3, 0, 2, follsHome);

      const secondMatchFollsEnemy = getBaseStatsEnemy(1, 3, 6, 2, 4, follsHome);

      const thirdMatchFollsEnemy = getBaseStatsEnemy(2, 6, 9, 4, 6, follsHome);
      const fouthMatchFollsEnemy = getBaseStatsEnemy(3, 9, 12, 6, 8, follsHome);

      const fivesMatchFollsEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        follsHome
      );
      const sixMatchFollsHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        follsHome
      );

      const firstMatchFolls = getBaseStats(0, 0, 3, 0, 2, follsHome);

      const secondMatchFolls = getBaseStats(1, 3, 6, 2, 4, follsHome);
      const thirdMatchFolls = getBaseStats(2, 6, 9, 4, 6, follsHome);

      const fouthMatchFolls = getBaseStats(3, 9, 12, 6, 8, follsHome);

      const fivesMatchFolls = getBaseStats(4, 12, 15, 8, 10, follsHome);

      const sixMatchFollsHome = getBaseStats(5, 15, 18, 10, 12, follsHome);

      const follsHomeFourMatch =
        firstMatchFolls + secondMatchFolls + thirdMatchFolls + fouthMatchFolls;

      const follsHomeSixMatch =
        fivesMatchFolls + sixMatchFollsHome + follsHomeFourMatch;

      const missedFollsHomeFourMatches =
        firstMatchFollsEnemy +
        secondMatchFollsEnemy +
        thirdMatchFollsEnemy +
        fouthMatchFollsEnemy;

      const missedFollsHomeSixMatch =
        missedFollsHomeFourMatches +
        fivesMatchFollsEnemy +
        sixMatchFollsHomeEnemy;

      const firstMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        follsAway
      );

      const secondMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        follsAway
      );

      const thirdMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        follsAway
      );
      const fouthMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        follsAway
      );

      const fivesMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        follsAway
      );
      const sixMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        follsAway
      );

      const firstMatchFollsAway = getBaseStatsAway(0, 0, 3, 0, 2, follsAway);

      const secondMatchFollsAway = getBaseStatsAway(1, 3, 6, 2, 4, follsAway);
      const thirdMatchFollsAway = getBaseStatsAway(2, 6, 9, 4, 6, follsAway);

      const fouthMatchFollsAway = getBaseStatsAway(3, 9, 12, 6, 8, follsAway);

      const fivesMatchFollsAway = getBaseStatsAway(4, 12, 15, 8, 10, follsAway);

      const sixMatchFollsAway = getBaseStatsAway(5, 15, 18, 10, 12, follsAway);

      const follsAwayFourMatches =
        firstMatchFollsAway +
        secondMatchFollsAway +
        thirdMatchFollsAway +
        fouthMatchFollsAway;

      const follsAwaySixMatches =
        follsAwayFourMatches + fivesMatchFollsAway + sixMatchFollsAway;

      const missedFollsAwayFour =
        firstMatchFollsAwayEnemy +
        secondMatchFollsAwayEnemy +
        thirdMatchFollsAwayEnemy +
        fouthMatchFollsAwayEnemy;

      const missedFollsAwaySix =
        missedFollsAwayFour + fivesMatchFollsAwayEnemy + sixMatchFollsAwayEnemy;

      const middlefollsHomeFour = follsHomeFourMatch / 4;
      const middlefollsHomeSix = follsHomeSixMatch / 6;

      const middlefollsAwayFour = follsAwayFourMatches / 4;
      const middlefollsAwaySix = follsAwaySixMatches / 6;

      const middleMissedfollsHomeFour = missedFollsHomeFourMatches / 4;
      const middleMissedfollsHomeSix = missedFollsHomeSixMatch / 6;

      const middleMissedfollsAwayFour = missedFollsAwayFour / 4;
      const middleMissedfollsAwaySix = missedFollsAwaySix / 6;

      const follsAllHome = middlefollsHomeFour * 0.6 + middlefollsHomeSix * 0.4;

      const ofsiderAllAway =
        middlefollsAwayFour * 0.6 + middlefollsAwaySix * 0.4;

      const missingfollsHome =
        middleMissedfollsHomeFour * 0.6 + middleMissedfollsHomeSix * 0.4;

      const missingfollsAway =
        middleMissedfollsAwayFour * 0.6 + middleMissedfollsAwaySix * 0.4;

      const individfollsHome = (follsAllHome + missingfollsAway) / 2;
      const individfollsAway = (ofsiderAllAway + missingfollsHome) / 2;

      const follsInjurieHome = follsAllHome + missingfollsHome;
      const follsInjuriesAway = ofsiderAway + missingfollsAway;
      const totalFollsInjuries = (follsInjurieHome + follsInjuriesAway) / 2;

      const yellowCardHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item.INCIDENT_NAME === "Желтые карточки"
          )?.[0]
      );
      const yellowCardAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item.INCIDENT_NAME === "Желтые карточки"
          )?.[0]
      );

      const firstMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        yellowCardHome
      );

      const secondMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        yellowCardHome
      );

      const thirdMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        yellowCardHome
      );
      const fouthMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        yellowCardHome
      );

      const fivesMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        yellowCardHome
      );
      const sixMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        yellowCardHome
      );

      const firstMatchYellowCardHome = getBaseStats(
        0,
        0,
        3,
        0,
        2,
        yellowCardHome
      );

      const secondMatchYellowCardHome = getBaseStats(
        1,
        3,
        6,
        2,
        4,
        yellowCardHome
      );
      const thirdMatchYellowCardHome = getBaseStats(
        2,
        6,
        9,
        4,
        6,
        yellowCardHome
      );

      const fouthMatchYellowCardHome = getBaseStats(
        3,
        9,
        12,
        6,
        8,
        yellowCardHome
      );

      const fivesMatchYellowCardHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        yellowCardHome
      );

      const sixMatchYellowCardHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        yellowCardHome
      );

      const yellowCardHomeFourMatch =
        firstMatchYellowCardHome +
        secondMatchYellowCardHome +
        thirdMatchYellowCardHome +
        fouthMatchYellowCardHome;

      const yellowCardHomeSixMatch =
        yellowCardHomeFourMatch +
        fivesMatchYellowCardHome +
        sixMatchYellowCardHome;

      const enemyYellowCardHomeFour =
        firstMatchYellowCardHomeEnemy +
        secondMatchYellowCardHomeEnemy +
        thirdMatchYellowCardHomeEnemy +
        fouthMatchYellowCardHomeEnemy;

      const enemyYellowCardHomeSix =
        enemyYellowCardHomeFour +
        fivesMatchYellowCardHomeEnemy +
        sixMatchYellowCardHomeEnemy;

      const firstMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        yellowCardAway
      );

      const secondMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        yellowCardAway
      );

      const thirdMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        yellowCardAway
      );
      const fouthMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        yellowCardAway
      );

      const fivesMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        yellowCardAway
      );
      const sixMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        yellowCardAway
      );

      const firstMatchYellowCardAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        yellowCardAway
      );

      const secondMatchYellowCardAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        yellowCardAway
      );
      const thirdMatchYellowCardAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        yellowCardAway
      );

      const fouthMatchYellowCardAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        yellowCardAway
      );

      const fivesMatchYellowCardAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        yellowCardAway
      );

      const sixMatchYellowCardAway = getBaseStatsAway(
        5,
        15,
        18,
        10,
        12,
        yellowCardAway
      );

      const yellowCardAwayFourMatch =
        firstMatchYellowCardAway +
        secondMatchYellowCardAway +
        thirdMatchYellowCardAway +
        fouthMatchYellowCardAway;

      const yellowCardAwaySixMatch =
        yellowCardAwayFourMatch +
        fivesMatchYellowCardAway +
        sixMatchYellowCardAway;

      const yellowCardAwayFourMatchEnemy =
        firstMatchYellowCardAwayEnemy +
        secondMatchYellowCardAwayEnemy +
        thirdMatchYellowCardAwayEnemy +
        fouthMatchYellowCardAwayEnemy;

      const yellowCardAwaySixMatchEnemy =
        yellowCardAwayFourMatchEnemy +
        fivesMatchYellowCardAwayEnemy +
        sixMatchYellowCardAwayEnemy;

      const twoMinutesOfRemovalHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Удаления")?.[0]
      );

      const twoMinutesOfRemovalAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Удаления")?.[0]
      );

      const twoMinutesOfRemovalHomeFour = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesOfRemovalHomeSix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesOfRemovalHomeFour);

      const twoMinutesOfRemovalAwayFour = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesOfRemovalAwaySix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesOfRemovalAwayFour);

      const twoMinutesMissedOfRemovalHomeFour = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const twoMinutesMissedOfRemovalHomeSix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, twoMinutesMissedOfRemovalHomeFour);

      const twoMinutesMissedOfRemovalAwayFour = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesMissedOfRemovalAwaySix = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesMissedOfRemovalAwayFour);

      const midlleTwoMinutsRemoveHomeFour = twoMinutesOfRemovalHomeFour / 4;
      const midlleTwoMinutsRemoveHomeSix = twoMinutesOfRemovalHomeSix / 6;

      const midlleTwoMinutsRemoveAwayFour = twoMinutesOfRemovalAwayFour / 4;
      const midlleTwoMinutsRemoveAwaySix = twoMinutesOfRemovalAwaySix / 6;

      const middleMissedTwoMinutsRemoveHomeFour =
        twoMinutesMissedOfRemovalHomeFour / 4;
      const middleMissedTwoMinutsRemoveHomeSix =
        twoMinutesMissedOfRemovalHomeSix / 6;

      const middleMissedTwoMinutsRemoveAwayFour =
        twoMinutesMissedOfRemovalAwayFour / 4;
      const middleMissedTwoMinutsRemoveAwaySix =
        twoMinutesMissedOfRemovalAwaySix / 6;

      const allTwoMinutsRemove =
        midlleTwoMinutsRemoveHomeFour * 0.6 +
        midlleTwoMinutsRemoveHomeSix * 0.4;

      const allTwoMinutsRemoveAway =
        midlleTwoMinutsRemoveAwayFour * 0.6 +
        midlleTwoMinutsRemoveAwaySix * 0.4;

      const allMissedTwoMissedRemoveHome =
        middleMissedTwoMinutsRemoveHomeFour * 0.6 +
        middleMissedTwoMinutsRemoveHomeSix * 0.4;

      const allMissedTwoMissedRemoveAway =
        middleMissedTwoMinutsRemoveAwayFour * 0.6 +
        middleMissedTwoMinutsRemoveAwaySix * 0.4;

      const twiMinutsIndividTotalHome =
        (allTwoMinutsRemove + allMissedTwoMissedRemoveAway) / 2;
      const twoMinutsIndividTotalAway =
        (allTwoMinutsRemoveAway + allMissedTwoMissedRemoveHome) / 2;

      const twoMinutsRemoveInjuriesHome =
        allTwoMinutsRemove + allMissedTwoMissedRemoveHome;
      const twoMinutsRemoveInjuriesAway =
        allTwoMinutsRemoveAway + allMissedTwoMissedRemoveAway;
      const twoMinutsRemoveTotalInjuries =
        (twoMinutsRemoveInjuriesHome + twoMinutsRemoveInjuriesAway) / 2;

      const middleYellowCardHomeFour = yellowCardHomeFourMatch / 4;
      const middleYellowCardAwayFour = yellowCardAwayFourMatch / 4;

      const middleYellowCardHomeSix = yellowCardHomeSixMatch / 6;
      const middleYellowCardAwaySix = yellowCardAwaySixMatch / 6;

      const middleYellowCardHomeFourEnemy = enemyYellowCardHomeFour / 4;
      const middleYellowCardAwayFourEnemy = yellowCardAwayFourMatchEnemy / 4;

      const middleYellowCardHomeSixEnemy = enemyYellowCardHomeSix / 6;
      const middleYellowCardAwaySixEnemy = yellowCardAwaySixMatchEnemy / 6;

      const yellowAllHome =
        middleYellowCardHomeFour * 0.6 + middleYellowCardHomeSix * 0.4;

      const yellowAllAway =
        middleYellowCardAwayFour * 0.6 + middleYellowCardAwaySix * 0.4;

      const missedYellowHome =
        middleYellowCardHomeFourEnemy * 0.6 +
        middleYellowCardHomeSixEnemy * 0.4;

      const missedYellowAway =
        middleYellowCardAwayFourEnemy * 0.6 +
        middleYellowCardAwaySixEnemy * 0.4;

      const individTotalYellowCardHome = (yellowAllHome + missedYellowAway) / 2;
      const individTotalYellowCardAway = (yellowAllAway + missedYellowHome) / 2;

      const injuriesYellowCardHome = yellowAllHome + missedYellowHome;
      const injuriesYellowCardAway = yellowAllAway + missedYellowAway;

      const totalYellowCardInjuries =
        (injuriesYellowCardHome + injuriesYellowCardAway) / 2;

      const shotsOnTargetHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) =>
              item.INCIDENT_NAME === "Броски в створ ворот" ||
              item.INCIDENT_NAME === "Удары в створ"
          )?.[0]
      );

      function getShottsOnTargetHome(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideHome[a]
            ? shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideHome[a]
          ? shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchShotsOnTarget = getShottsOnTargetHome(0, 0, 1, 0, 1);

      const secondMatchShotsOnTarget = getShottsOnTargetHome(1, 1, 2, 1, 2);

      const thirdMatchShotsOnTarget = getShottsOnTargetHome(2, 2, 3, 2, 3);

      const fouthMatchShotsOnTarget = getShottsOnTargetHome(3, 3, 4, 3, 4);

      const fivesMatchShotsOnTarget = getShottsOnTargetHome(4, 4, 5, 4, 5);

      const sixMatchShotsOnTarget = getShottsOnTargetHome(5, 5, 6, 5, 6);

      const shotsOnTargetHomeForFourMatch =
        firstMatchShotsOnTarget +
        secondMatchShotsOnTarget +
        thirdMatchShotsOnTarget +
        fouthMatchShotsOnTarget;

      const shotsOnTargetHomeForSixMatches =
        shotsOnTargetHomeForFourMatch +
        fivesMatchShotsOnTarget +
        sixMatchShotsOnTarget;

      function getShotsOnTargetHomeEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideHome[a]
            ? shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideHome[a]
          ? shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        0,
        0,
        1,
        0,
        1
      );

      const secondMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        1,
        1,
        2,
        1,
        2
      );

      const thirdMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        2,
        2,
        3,
        2,
        3
      );

      const fourhMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        3,
        3,
        4,
        3,
        4
      );

      const fivesMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        4,
        4,
        5,
        4,
        5
      );

      const sixMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        5,
        5,
        6,
        5,
        6
      );

      const shotsOnTargetMissedHomeForFourMatch =
        firstMatchShotsOnTargetHomeEnemy +
        secondMatchShotsOnTargetHomeEnemy +
        thirdMatchShotsOnTargetHomeEnemy +
        fourhMatchShotsOnTargetHomeEnemy;

      const shotsOnTargeMissedtHomeForSixMatches =
        shotsOnTargetMissedHomeForFourMatch +
        fivesMatchShotsOnTargetHomeEnemy +
        sixMatchShotsOnTargetHomeEnemy;

      const middleMissedShotsOnTargetForSixMatches =
        shotsOnTargeMissedtHomeForSixMatches / 6;
      const middleMissedShotsOnTargetForFourMatches =
        shotsOnTargetMissedHomeForFourMatch / 4;
      const middleShotsOnTargetHomeForSixMatch =
        shotsOnTargetHomeForSixMatches / 6;

      const middleShotsOnTargetHomeForFourMatch =
        shotsOnTargetHomeForFourMatch / 4;
      const shotsOnTargetAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter(
            (item) =>
              item.INCIDENT_NAME === "Броски в створ ворот" ||
              item.INCIDENT_NAME === "Удары в створ"
          )?.[0]
      );

      function getShottsOnTargetAway(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideAway[a]
          ? shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchShotsOnTargetAway = getShottsOnTargetAway(0, 0, 1, 0, 1);

      const secondMatchShotsOnTargetAway = getShottsOnTargetAway(1, 1, 2, 1, 2);

      const thirdMatchShotsOnTargetAway = getShottsOnTargetAway(2, 2, 3, 2, 3);

      const fouthMatchShotsOnTargetAway = getShottsOnTargetAway(3, 3, 4, 3, 4);

      const fivesMatchShotsOnTargetAway = getShottsOnTargetAway(4, 4, 5, 4, 5);

      const sixMatchShotsOnTargetAway = getShottsOnTargetAway(5, 5, 6, 5, 6);

      const shotsOnTargetAwayForFourMatch =
        firstMatchShotsOnTargetAway +
        secondMatchShotsOnTargetAway +
        thirdMatchShotsOnTargetAway +
        fouthMatchShotsOnTargetAway;

      const shotsOnTargetAwayForSixMatches =
        shotsOnTargetAwayForFourMatch +
        fivesMatchShotsOnTargetAway +
        sixMatchShotsOnTargetAway;

      function getShottsOnTargetAwayEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideAway[a]
            ? shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideAway[a]
          ? shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        0,
        0,
        1,
        0,
        1
      );

      const secondMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        1,
        1,
        2,
        1,
        2
      );

      const thirdMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        2,
        2,
        3,
        2,
        3
      );

      const fouthMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        3,
        3,
        4,
        3,
        4
      );

      const fivesMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        4,
        4,
        5,
        4,
        5
      );

      const sixMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        5,
        5,
        6,
        5,
        6
      );

      const shotsOnTargetMissedAwayForFourMatch =
        firstMatchShotsOnTargetAwayEnemy +
        secondMatchShotsOnTargetAwayEnemy +
        thirdMatchShotsOnTargetAwayEnemy +
        fouthMatchShotsOnTargetAwayEnemy;

      const shotsOnTargeMissedtAwayForSixMatches =
        shotsOnTargetMissedAwayForFourMatch +
        fivesMatchShotsOnTargetAwayEnemy +
        sixMatchShotsOnTargetAwayEnemy;

      const middleMissedShotsOnTargetForSixMatchesAway =
        shotsOnTargeMissedtAwayForSixMatches / 6;
      const middleMissedShotsOnTargetForFourMatchesAway =
        shotsOnTargetMissedAwayForFourMatch / 4;
      const middleShotsOnTargetAwayForSixMatch =
        shotsOnTargetAwayForSixMatches / 6;
      const middleShotsOnTargetAwayForFourMatch =
        shotsOnTargetAwayForFourMatch / 4;

      const allShotOnTargetHome =
        middleShotsOnTargetHomeForFourMatch * 0.6 +
        middleShotsOnTargetHomeForSixMatch * 0.4;

      const allShotOnTargetAway =
        middleShotsOnTargetAwayForFourMatch * 0.6 +
        middleShotsOnTargetAwayForSixMatch * 0.4;

      const allMissedHome =
        middleMissedShotsOnTargetForFourMatches * 0.6 +
        middleMissedShotsOnTargetForSixMatches * 0.4;

      const allMissedAway =
        middleMissedShotsOnTargetForFourMatchesAway * 0.6 +
        middleMissedShotsOnTargetForSixMatchesAway * 0.4;

      const totalInjuriesHome = allShotOnTargetHome + allMissedHome;
      const totalInjuriesAway = allShotOnTargetAway + allMissedAway;
      const totalShotsOnTarget = (totalInjuriesHome + totalInjuriesAway) / 2;

      const individTotalHome = (allShotOnTargetHome + allMissedAway) / 2;
      const individTotalAway = (allShotOnTargetAway + allMissedHome) / 2;
      const blockedShotsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item.INCIDENT_NAME === "Блок-но ударов"
          )?.[0]
      );

      function getShottsOnBlockedAway(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideAway[a]
          ? blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchBlockedShotAway = getShottsOnBlockedAway(0, 0, 1, 0, 1);

      const secondMatchBlockedShotAway = getShottsOnBlockedAway(1, 1, 2, 1, 2);

      const thirdMatchBlockedShotAway = getShottsOnBlockedAway(2, 2, 3, 2, 3);

      const fouthMatchBlockedShotAway = getShottsOnBlockedAway(3, 3, 4, 3, 4);

      const fivesMatchBlockedShotAway = getShottsOnBlockedAway(4, 4, 5, 4, 5);

      const sixMatchBlockedShotHomeAway = getShottsOnBlockedAway(5, 5, 6, 5, 6);

      const blockedShotsForFourMatchAway =
        firstMatchBlockedShotAway +
        secondMatchBlockedShotAway +
        thirdMatchBlockedShotAway +
        fouthMatchBlockedShotAway;

      const blockedShotsForSixMatchAway =
        blockedShotsForFourMatchAway +
        fivesMatchBlockedShotAway +
        sixMatchBlockedShotHomeAway;

      function getShottsOnBlockedAwayEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideAway[a]
            ? blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideAway[a]
          ? blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        0,
        0,
        1,
        0,
        1
      );

      const secondMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        1,
        1,
        2,
        1,
        2
      );

      const thirdMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        2,
        2,
        3,
        2,
        3
      );

      const fouthMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        3,
        3,
        4,
        3,
        4
      );

      const fivesMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        4,
        4,
        5,
        4,
        5
      );

      const sixMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        5,
        5,
        6,
        5,
        6
      );

      const missedBlockedShotsForFourMatchAway =
        firstMatchBlockedShotAwayEnemy +
        secondMatchBlockedShotAwayEnemy +
        thirdMatchBlockedShotAwayEnemy +
        fouthMatchBlockedShotAwayEnemy;

      const missedBlockedShotsForSixMatchAway =
        missedBlockedShotsForFourMatchAway +
        fivesMatchBlockedShotAwayEnemy +
        sixMatchBlockedShotAwayEnemy;

      const blockedShotsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item.INCIDENT_NAME === "Блок-но ударов"
          )?.[0]
      );

      function getShottsOnBlockedHome(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideHome[a]
            ? blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideHome[a]
          ? blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchBlockedShotHome = getShottsOnBlockedHome(0, 0, 1, 0, 1);

      const secondMatchBlockedShotHome = getShottsOnBlockedHome(1, 1, 2, 1, 2);

      const thirdMatchBlockedShotHome = getShottsOnBlockedHome(2, 2, 3, 2, 3);

      const fouthMatchBlockedShotHome = getShottsOnBlockedHome(3, 3, 4, 3, 4);

      const fivesMatchBlockedShotHome = getShottsOnBlockedHome(4, 4, 5, 4, 5);

      const sixMatchBlockedShotHome = getShottsOnBlockedHome(5, 5, 6, 5, 6);

      const blockedShotsForFourMatch =
        firstMatchBlockedShotHome +
        secondMatchBlockedShotHome +
        thirdMatchBlockedShotHome +
        fouthMatchBlockedShotHome;

      const blockedShotsForSixMatch =
        blockedShotsForFourMatch +
        fivesMatchBlockedShotHome +
        sixMatchBlockedShotHome;

      function getShottsOnBlockedHomeEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideHome[a]
            ? blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideHome[a]
          ? blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        0,
        0,
        1,
        0,
        1
      );

      const secondMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        1,
        1,
        2,
        1,
        2
      );

      const thirdMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        2,
        2,
        3,
        2,
        3
      );

      const fouthMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        3,
        3,
        4,
        3,
        4
      );

      const fivesMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        4,
        4,
        5,
        4,
        5
      );

      const sixMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        5,
        5,
        6,
        5,
        6
      );

      const missedBlockedShotsForFourMatchHome =
        firstMatchBlockedShotHomeEnemy +
        secondMatchBlockedShotHomeEnemy +
        thirdMatchBlockedShotHomeEnemy +
        fouthMatchBlockedShotHomeEnemy;

      const missedBlockedShotsForSixMatchHome =
        missedBlockedShotsForFourMatchHome +
        fivesMatchBlockedShotHomeEnemy +
        sixMatchBlockedShotHomeEnemy;

      const middleBlockedShotsHomeFour = blockedShotsForFourMatch / 4;
      const middleBlockedShotsHomeSix = blockedShotsForSixMatch / 6;

      const missedMiddleBlockedShotsHomeFour =
        missedBlockedShotsForFourMatchHome / 4;
      const missedMiddleBlockedShotsHomeSix =
        missedBlockedShotsForSixMatchHome / 6;

      const allBlockedShotsHome =
        middleBlockedShotsHomeFour * 0.6 + middleBlockedShotsHomeSix * 0.4;
      const allMissedBlockedShotsHome =
        missedMiddleBlockedShotsHomeFour * 0.6 +
        missedMiddleBlockedShotsHomeSix * 0.4;

      const middleBlockedShotsForFourMatchesAway =
        blockedShotsForFourMatchAway / 4;
      const middleBlockedShotsForSixMatchesAway =
        blockedShotsForSixMatchAway / 6;

      const missedMidleBlockedShotsForFourMatches =
        missedBlockedShotsForFourMatchAway / 4;
      const missedMidleBlockedShotsForSixMatches =
        missedBlockedShotsForSixMatchAway / 6;

      const allBlockedShotsAway =
        middleBlockedShotsForFourMatchesAway * 0.6 +
        middleBlockedShotsForSixMatchesAway * 0.4;
      const allMissedBlockedShotsAway =
        missedMidleBlockedShotsForFourMatches * 0.6 +
        missedMidleBlockedShotsForSixMatches * 0.4;

      const injuriesBlockedShotsHome =
        allBlockedShotsHome + allMissedBlockedShotsHome;
      const injuriesBlockedShotsAway =
        allBlockedShotsAway + allMissedBlockedShotsAway;
      const totalShotsBlocked =
        (injuriesBlockedShotsHome + injuriesBlockedShotsAway) / 2;

      const individeTotalBlockedShotsHome =
        (allBlockedShotsHome + allMissedBlockedShotsAway) / 2;
      const individeTotalBlockedShotsAway =
        (allBlockedShotsAway + allMissedBlockedShotsHome) / 2;

      //individeTotalBlockedShotsHome,individeTotalBlockedShotsAway

      const throwForFourMatchHome =
        shotsOnTargetHomeForFourMatch + blockedShotsForFourMatch;
      const throwForSixMatchesHome =
        shotsOnTargetHomeForSixMatches + blockedShotsForSixMatch;

      const missedThorwForFourMatchesHome =
        shotsOnTargetMissedHomeForFourMatch +
        missedBlockedShotsForFourMatchHome;
      const missedThorwForSixMatchesHome =
        shotsOnTargeMissedtHomeForSixMatches +
        missedBlockedShotsForSixMatchHome;

      const middleThrowFourMatchesHome = throwForFourMatchHome / 4;
      const middleThrowSixMatchesHome = throwForSixMatchesHome / 6;
      const middleMissedThrowHomeFourMatches =
        missedThorwForFourMatchesHome / 4;
      const middleMissedThrowHomeSixMatches = missedThorwForSixMatchesHome / 6;
      const throwForFourMatchAway =
        shotsOnTargetAwayForFourMatch + blockedShotsForFourMatchAway;
      const throwForSixMatchesAway =
        shotsOnTargetAwayForSixMatches + blockedShotsForSixMatchAway;

      const missedThorwForFourMatchesAway =
        shotsOnTargetMissedAwayForFourMatch +
        missedBlockedShotsForFourMatchAway;
      const missedThorwForSixMatchesAway =
        shotsOnTargeMissedtAwayForSixMatches +
        missedBlockedShotsForSixMatchAway;
      const middleThrowFourMatchesAway = throwForFourMatchAway / 4;
      const middleThrowSixMatchesAway = throwForSixMatchesAway / 6;

      const middleMissedThrowAwayFourMatches =
        missedThorwForFourMatchesAway / 4;
      const middleMissedThrowAwaySixMatches = missedThorwForSixMatchesAway / 6;
      const allThrowHome =
        middleThrowFourMatchesHome * 0.6 + middleThrowSixMatchesHome * 0.4;
      const allThrowAway =
        middleThrowFourMatchesAway * 0.6 + middleThrowSixMatchesAway * 0.4;

      const allMissedThrowHome =
        middleMissedThrowHomeFourMatches * 0.6 +
        middleMissedThrowHomeSixMatches * 0.4;

      const allMissedThrowAway =
        middleMissedThrowAwayFourMatches * 0.6 +
        middleMissedThrowAwaySixMatches * 0.4;

      const individTotalHomeThrow = (allThrowHome + allMissedThrowAway) / 2;
      const individTotalAwayThrow = (allThrowAway + allMissedThrowHome) / 2;

      const prevGoalsHome = previosMatchHome
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.HOME_SCORE_FULL
            : item.KY || item?.AWAY_SCORE_FULL
        );

      const prevGoalsEnemyHome = previosMatchHome
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.AWAY_SCORE_FULL
            : item.KY || item?.HOME_SCORE_FULL
        );

      const prevGoalsAway = previosMatchAway
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.HOME_SCORE_FULL
            : item.KY || item?.AWAY_SCORE_FULL
        );

      const prevGoalsEnemyAway = previosMatchAway
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.AWAY_SCORE_FULL
            : item.KY || item?.HOME_SCORE_FULL
        );

      function passRateCalc(b, c) {
        const a = b / c;
        return isNaN(a) ? 0 : a && isFinite(a) ? a : 0;
      }

      // const a = b / c;
      // return isNaN(a) ? 0 : a || isFinite(a) ? a : 0;

      const firstMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[0]),
        firstMatchShotsOnTarget
      );

      // console.log(prevGoalsHome);
      // console.log(shotsOnTargetHome);

      const secondMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[1]),
        secondMatchShotsOnTarget
      );
      const thirdMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[2]),
        Number(thirdMatchShotsOnTarget)
      );

      const fouthMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[3]),
        Number(fouthMatchShotsOnTarget)
      );

      const fivesMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[4]),
        Number(fivesMatchShotsOnTarget)
      );

      const sixMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[5]),
        Number(sixMatchShotsOnTarget)
      );

      const firstMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[0]),
        Number(firstMatchShotsOnTargetAway)
      );

      const secondMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[1]),
        Number(secondMatchShotsOnTargetAway)
      );

      const thirdMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[2]),
        Number(thirdMatchShotsOnTargetAway)
      );

      const fouthMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[3]),
        Number(fouthMatchShotsOnTargetAway)
      );

      const fivesMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[4]),
        Number(fivesMatchShotsOnTargetAway)
      );

      const sixMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[5]),
        Number(sixMatchShotsOnTargetAway)
      );
      const passRateHome =
        (firstMatchPassRateHome +
          secondMatchPassRateHome +
          thirdMatchPassRateHome +
          fouthMatchPassRateHome +
          fivesMatchPassRateHome +
          sixMatchPassRateHome) /
        6;

      const passRateAway =
        (firstMatchPassRateAway +
          secondMatchPassRateAway +
          thirdMatchPassRateAway +
          fouthMatchPassRateAway +
          fivesMatchPassRateAway +
          sixMatchPassRateAway) /
        6;

      const firstMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[0]),
        firstMatchShotsOnTargetHomeEnemy
      );

      const secondMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[1]),
        secondMatchShotsOnTargetHomeEnemy
      );

      const thirdMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[2]),
        thirdMatchShotsOnTargetHomeEnemy
      );

      const fouthMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[3]),
        fourhMatchShotsOnTargetHomeEnemy
      );

      const fivesMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[4]),
        fivesMatchShotsOnTargetHomeEnemy
      );

      const sixMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[5]),
        sixMatchShotsOnTargetHomeEnemy
      );

      const firstMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[0]),
        firstMatchShotsOnTargetAwayEnemy
      );

      const secondMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[1]),
        secondMatchShotsOnTargetAwayEnemy
      );

      const thirdMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[2]),
        thirdMatchShotsOnTargetAwayEnemy
      );

      const fouthMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[3]),
        fouthMatchShotsOnTargetAwayEnemy
      );

      const fivesMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[4]),
        fivesMatchShotsOnTargetAwayEnemy
      );

      const sixMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[5]),
        sixMatchShotsOnTargetAwayEnemy
      );

      const missedRateHome =
        (firstMatchPassRateHomeEnemy +
          secondMatchPassRateHomeEnemy +
          thirdMatchPassRateHomeEnemy +
          fouthMatchPassRateHomeEnemy +
          fivesMatchPassRateHomeEnemy +
          sixMatchPassRateHomeEnemy) /
        6;

      const missedRateAway =
        (firstMatchPassRateAwayEnemy +
          secondMatchPassRateAwayEnemy +
          thirdMatchPassRateAwayEnemy +
          fouthMatchPassRateAwayEnemy +
          fivesMatchPassRateAwayEnemy +
          sixMatchPassRateAwayEnemy) /
        6;

      //За все периоды
      // Ценность удары в створ НАПАДЕНИЕ
      const shotToGoalRatioAttackHome = checkIsNanAndFinint(
        goalsForSixMatchHome,
        shotsOnTargetHomeForSixMatches
      );

      const shotToGoalRatioAttackAway = checkIsNanAndFinint(
        goalsForSixMatchAway,
        shotsOnTargetAwayForSixMatches
      );

      //Ценность удары в створ ЗАЩИТА
      const shotToGoalRatioSafeHome = checkIsNanAndFinint(
        misedForSixMatchHome,
        shotsOnTargeMissedtHomeForSixMatches
      );

      const shotToGoalRatioSafeAway = checkIsNanAndFinint(
        misedForSixMatchAway,
        shotsOnTargeMissedtAwayForSixMatches
      );

      // Хозяева Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M27-название ячейки
      const M27 = checkIsNanAndFinint(
        middleThrowSixMatchesHome,
        middleShotsOnTargetHomeForSixMatch
      );

      //Хозяева Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N27-название ячейки
      const N27 = checkIsNanAndFinint(
        middleMissedThrowHomeSixMatches,
        middleMissedShotsOnTargetForSixMatches
      );

      // //Гости Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M28-название
      // console.log(middleMissedShotsOnTargetForSixMatches);
      const M28 = checkIsNanAndFinint(
        middleThrowSixMatchesAway,
        middleShotsOnTargetAwayForSixMatch
      );

      //Гости Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N28-название ячейки
      const N28 = checkIsNanAndFinint(
        middleMissedThrowAwaySixMatches,
        middleMissedShotsOnTargetForSixMatchesAway
      );
      //Хозяева D10
      const host = checkIsNanAndFinint(individTotalHomeThrow, M27);

      // //Гости
      const guest = checkIsNanAndFinint(individTotalAwayThrow, M28);

      // //К соотношению атаки
      const toTheRatioOfAttackHost = host * shotToGoalRatioAttackHome;
      const toTheRatioOfAttackGuest = guest * shotToGoalRatioAttackAway;

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M4
      const M4host = checkIsNanAndFinint(
        middleEfficiencyLeagHome,
        middleGoalForSixMatchesHome
      );

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M5
      const M5guest = checkIsNanAndFinint(
        middleEfficiencyLeagAway,
        middleGoalForSixMatchesAway
      );

      // //ИТБ к ценности нападения
      const itbToTheValueOfTheAttackHost = checkIsNanAndFinint(
        individTotalHomeGoal,
        M4host
      );
      const itbToTheValueOfTheAttackGuest = checkIsNanAndFinint(
        individTotalAwayGoal,
        M5guest
      );

      // //F10=Индивидуальный тотал(удары, хозява)/N28
      const F10 = checkIsNanAndFinint(individTotalHomeThrow, N28);
      // //F11=Индивидуальный тотал(удары, гости)/N27
      const F11 = checkIsNanAndFinint(individTotalAwayThrow, N27);

      // //Атака H13
      const attackHost = F10 * passRateHome;
      // //Атака H14
      const attackGuest = F11 * passRateAway;
      // //Атака H13*Ценность удары в створ защита хоз
      const I13 = attackHost * shotToGoalRatioSafeAway;
      // //Атака H14*Ценность удары в створ защита гости
      const I14 = attackGuest * shotToGoalRatioSafeHome;

      // //S4, S5 =Средняя результативность лиги/Среднее пропущенное за 6 матчей
      const S4host = checkIsNanAndFinint(
        middleEfficiencyLeagHome,
        middleMissedForSixMatcesHome
      );

      const S5guest = checkIsNanAndFinint(
        middleEfficiencyLeagAway,
        middleMissedForSixMatcesAway
      );

      // //К ценности защиты противника
      const valueOfTheEnemysDefenseHost = checkIsNanAndFinint(
        attackHost,
        S5guest
      );
      const valueOfTheEnemysDefenseGuest = checkIsNanAndFinint(
        attackGuest,
        S4host
      );

      // //H8 ИТБ к ценности нападения/К ценности защиты противника
      const H8host = checkIsNanAndFinint(
        valueOfTheEnemysDefenseHost,
        itbToTheValueOfTheAttackHost
      );
      const H8guest = checkIsNanAndFinint(
        valueOfTheEnemysDefenseGuest,
        itbToTheValueOfTheAttackGuest
      );

      // //Тренд
      const trandHost = checkIsNanAndFinint(toTheRatioOfAttackHost, H8host);
      const trandGuest = checkIsNanAndFinint(toTheRatioOfAttackGuest, H8guest);

      // //E15 =Индивидуальный тотал ГОЛЫ ХОЗЯЕВА/M4
      const E15host = checkIsNanAndFinint(individTotalHomeGoal, M4host);
      const E16guest = checkIsNanAndFinint(individTotalAwayGoal, M5guest);

      // //F15
      const F15host = checkIsNanAndFinint(toTheRatioOfAttackHost, S5guest);
      const F16guest = checkIsNanAndFinint(toTheRatioOfAttackGuest, S4host);

      // //D15/D16
      const D15host = checkIsNanAndFinint(E15host, F15host);

      const D16guest = checkIsNanAndFinint(E16guest, F16guest);

      // //H16 =Индивидуальный тотал голы хозяева /s5
      const h16 = checkIsNanAndFinint(individTotalHomeGoal, S5guest);

      const h15 = checkIsNanAndFinint(individTotalAwayGoal, S4host);

      const J19 = checkIsNanAndFinint(individTotalAwayThrow, N27);

      const m14 = checkIsNanAndFinint(
        middleMissedForSixMatcesHome,
        middleMissedShotsOnTargetForSixMatches
      );

      // //Пропустят хозяева
      const k14 = J19 * m14;

      const i16 = checkIsNanAndFinint(k14, M5guest);

      const H16 = checkIsNanAndFinint(individTotalHomeGoal, S5guest);

      const g16 = checkIsNanAndFinint(H16, i16);

      const c19 = checkIsNanAndFinint(D16guest, g16);

      // //B15 = тренд /d15
      const B15 = trandHost * D15host;

      const B18 = checkIsNanAndFinint(B15, c19);

      const A18 = checkIsNanAndFinint(B18, individTotalHomeGoal);

      // //Показаьель хозяева
      const indicatorHome = checkIsNanAndFinint(trandHost, A18);

      const B16 = trandGuest * D16guest;

      const m15 = checkIsNanAndFinint(
        middleMissedForSixMatcesAway,
        middleMissedShotsOnTargetForSixMatchesAway
      );

      const J18 = checkIsNanAndFinint(individTotalHomeThrow, N28);

      const K15 = J18 * m15;

      const I15 = checkIsNanAndFinint(K15, M4host);

      const G15 = checkIsNanAndFinint(h15, I15);

      const C18 = checkIsNanAndFinint(D15host, G15);

      const B19 = checkIsNanAndFinint(B16, C18);

      const A19 = checkIsNanAndFinint(B19, individTotalAwayGoal);

      const indicatorAway = checkIsNanAndFinint(trandGuest, A19); ///Показатель гости
      const h10 = F10 * missedRateAway;

      const l10 = checkIsNanAndFinint(h10, M4host);

      const k11 = checkIsNanAndFinint(attackHost, S5guest);

      const j11 = checkIsNanAndFinint(l10, k11);

      const l18 = checkIsNanAndFinint(K15, j11);

      const c13 = checkIsNanAndFinint(l18, trandHost);

      // ////////
      const stabilizerHome = trandHost * c13; /////Стабилизатор Хозяева
      // ////////

      const h11 = F11 * missedRateHome;

      const l11 = checkIsNanAndFinint(h11, M5guest);

      const k10 = checkIsNanAndFinint(attackGuest, S4host);

      const j10 = checkIsNanAndFinint(l11, k10);

      const l17 = checkIsNanAndFinint(k14, j10);

      const c14 = checkIsNanAndFinint(l17, trandGuest);

      // ///////
      const stabilizerAway = trandGuest * c14; /////Стабилизатор гости
      // //////

      ///Трендовый показатель хозяева

      const trendIndicatorHome = checkIsNanAndFinint(stabilizerHome, A19);
      // ////

      function checkIsNanAndFinint(a, b) {
        return isNaN(a / b) ? 0 : a / b && isFinite(a / b) ? a / b : 0;
      }

      // ///Трендовый показатель гости
      const trendIndicatorAway = checkIsNanAndFinint(stabilizerAway, A18);

      // /////// Якорный показатель хозяева
      const anchorValueHome =
        (trendIndicatorHome / efficiencyLeagAway) * indicatorHome;

      // /////Якорный показатель гости
      const anchorValueAway =
        (trendIndicatorAway / efficiencyLeagHome) * indicatorAway;

      return {
        individTotalHomeGoal,
        individeTotalBlockedShotsHome,
        individeTotalBlockedShotsAway,
        individTotalAwayGoal,
        indicatorHome,
        indicatorAway,
        stabilizerHome,
        stabilizerAway,
        trendIndicatorHome,
        trendIndicatorAway,
        anchorValueHome,
        anchorValueAway,
        individfollsHome,
        individfollsAway,
        individTotalYellowCardHome,
        individTotalYellowCardAway,
        individOfsidersHome,
        individOfsidersAway,
        individTotalHome,
        individTotalAway,
        cornerIndividTotalHome,
        cornerIndividTotalAway,
        individTotalHomeThrow,
        individTotalAwayThrow,
        twiMinutsIndividTotalHome,
        twoMinutsIndividTotalAway,
      };
    }
  }

  function calculateAllStats() {
    if (currentMatch) {
      const countGameHome = previosMatchHome.length;
      const countGameAway = previosMatchAway.length;

      //Забито в лиге
      const goalsInTheLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.KX || match?.HOME_SCORE_FULL);
      }, 0);
      const goalsInTheLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
      }, 0);

      const middleGoalInLeagHome = goalsInTheLeagHome / countGameHome;
      const middleGoalInLeagAway = goalsInTheLeagAway / countGameAway;

      //Пропущено в лиге
      const missedInLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
      }, 0);
      const missedInLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.KX || match?.HOME_SCORE_FULL);
      }, 0);

      const middleMissInLeagHome = missedInLeagHome / countGameHome;
      const middleMissInLeagAway = missedInLeagAway / countGameAway;

      //Забито за 4 матча
      const goalsForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const goalsForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForFourMatchesHome = goalsForFourMatchHome / 4;
      const middleGoalForFourMatchesAway = goalsForFourMatchAway / 4;

      //Забито за 6 матчей
      const goalsForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const goalsForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KX || match?.HOME_SCORE_FULL)
            : sum + Number(match?.KY || match?.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForSixMatchesHome = goalsForSixMatchHome / 6;
      const middleGoalForSixMatchesAway = goalsForSixMatchAway / 6;

      //Голы хозяев и гостей
      const goalHome =
        middleGoalForFourMatchesHome * 0.6 + middleGoalForSixMatchesHome * 0.4;

      const goalAway =
        middleGoalForFourMatchesAway * 0.6 + middleGoalForSixMatchesAway * 0.4;

      //Пропущено за 4 матча
      const misedForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const misedForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForFourMatcesHome = misedForFourMatchHome / 4;
      const middleMissedForFourMatcesAway = misedForFourMatchAway / 4;

      //Пропущено за 6 матчей
      const misedForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const misedForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return match.TEAM_MARK === "home"
            ? sum + Number(match?.KY || match?.AWAY_SCORE_FULL)
            : sum + Number(match?.KX || match?.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForSixMatcesHome = misedForSixMatchHome / 6;
      const middleMissedForSixMatcesAway = misedForSixMatchAway / 6;

      //Пропущенные хозяев и гостей
      const missedHome =
        middleMissedForFourMatcesHome * 0.6 +
        middleMissedForSixMatcesHome * 0.4;
      const missedAway =
        middleMissedForFourMatcesAway * 0.6 +
        middleMissedForSixMatcesAway * 0.4;

      //Голы тотал
      //Без травм
      const totalMatchWithoutInjuriesHome = goalHome + missedHome;
      const totalMatchWithoutInjuriesGuest = goalAway + missedAway;

      const finallyTotalGoal =
        (totalMatchWithoutInjuriesHome + totalMatchWithoutInjuriesGuest) / 2;

      //Индивидуальный тотал
      const individTotalHomeGoal = (goalHome + missedAway) / 2;
      const individTotalAwayGoal = (goalAway + missedHome) / 2;

      //
      //Результативность лиги
      const efficiencyLeagHome =
        (goalsForSixMatchHome + misedForSixMatchHome) / 6;
      const efficiencyLeagAway =
        (goalsForSixMatchAway + misedForSixMatchAway) / 6;
      const middleEfficiencyLeagHome = efficiencyLeagHome / 2;
      const middleEfficiencyLeagAway = efficiencyLeagAway / 2;

      //Ценность  забитого
      const scoringValueHome = middleEfficiencyLeagHome / middleGoalInLeagHome;
      const scoringValueAway = middleEfficiencyLeagAway / middleGoalInLeagAway;

      //Ценность пропущенного
      const valueOfMissingHome =
        middleEfficiencyLeagHome / middleMissInLeagHome;
      const valueOfMissingAway =
        middleEfficiencyLeagAway / middleMissInLeagAway;

      const periods = statsForSixMatchesHome.filter(
        (item) =>
          item?.STAGE_NAME === "1-й период" ||
          item?.STAGE_NAME === "2-й период" ||
          item?.STAGE_NAME === "3-й период" ||
          item?.STAGE_NAME === "1-й тайм" ||
          item?.STAGE_NAME === "2-й тайм"
      );

      const periodsAway = statsForSixMatchesAway.filter(
        (item) =>
          item?.STAGE_NAME === "1-й период" ||
          item?.STAGE_NAME === "2-й период" ||
          item?.STAGE_NAME === "3-й период" ||
          item?.STAGE_NAME === "1-й тайм" ||
          item?.STAGE_NAME === "2-й тайм"
      );

      const statsForPeriodsHome = periods.map((item) => item.GROUPS?.[0]);
      const statsForPeriodsAway = periodsAway.map((item) => item.GROUPS?.[0]);

      const shotsOnTargetHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) =>
              item?.INCIDENT_NAME === "Броски в створ ворот" ||
              item?.INCIDENT_NAME === "Удары в створ"
          )?.[0]
      );

      const checkTeamSideHome = previosMatchHome.map(
        (item) => item.TEAM_MARK === "home"
      );

      const checkTeamSideAway = previosMatchAway.map(
        (item) => item.TEAM_MARK === "home"
      );

      function getShottsOnTargetHome(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideHome[a]
            ? shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideHome[a]
          ? shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchShotsOnTarget = getShottsOnTargetHome(0, 0, 3, 0, 2);

      const secondMatchShotsOnTarget = getShottsOnTargetHome(1, 3, 6, 2, 4);

      const thirdMatchShotsOnTarget = getShottsOnTargetHome(2, 6, 9, 4, 6);

      const fouthMatchShotsOnTarget = getShottsOnTargetHome(3, 9, 12, 6, 8);

      const fivesMatchShotsOnTarget = getShottsOnTargetHome(4, 12, 15, 8, 10);

      const sixMatchShotsOnTarget = getShottsOnTargetHome(5, 15, 18, 10, 12);

      const shotsOnTargetHomeForFourMatch =
        firstMatchShotsOnTarget +
        secondMatchShotsOnTarget +
        thirdMatchShotsOnTarget +
        fouthMatchShotsOnTarget;

      const shotsOnTargetHomeForSixMatches =
        shotsOnTargetHomeForFourMatch +
        fivesMatchShotsOnTarget +
        sixMatchShotsOnTarget;

      function getShotsOnTargetHomeEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideHome[a]
            ? shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideHome[a]
          ? shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        0,
        0,
        3,
        0,
        2
      );

      const secondMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        1,
        3,
        6,
        2,
        4
      );

      const thirdMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        2,
        6,
        9,
        4,
        6
      );

      const fourhMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        3,
        9,
        12,
        6,
        8
      );

      const fivesMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchShotsOnTargetHomeEnemy = getShotsOnTargetHomeEnemy(
        5,
        15,
        18,
        10,
        12
      );

      const shotsOnTargetMissedHomeForFourMatch =
        firstMatchShotsOnTargetHomeEnemy +
        secondMatchShotsOnTargetHomeEnemy +
        thirdMatchShotsOnTargetHomeEnemy +
        fourhMatchShotsOnTargetHomeEnemy;

      const shotsOnTargeMissedtHomeForSixMatches =
        shotsOnTargetMissedHomeForFourMatch +
        fivesMatchShotsOnTargetHomeEnemy +
        sixMatchShotsOnTargetHomeEnemy;

      const middleMissedShotsOnTargetForSixMatches =
        shotsOnTargeMissedtHomeForSixMatches / 6;
      const middleMissedShotsOnTargetForFourMatches =
        shotsOnTargetMissedHomeForFourMatch / 4;
      const middleShotsOnTargetHomeForSixMatch =
        shotsOnTargetHomeForSixMatches / 6;
      const middleShotsOnTargetHomeForFourMatch =
        shotsOnTargetHomeForFourMatch / 4;
      const shotsOnTargetAway = statsForPeriodsAway.map(
        (item) =>
          item?.ITEMS.filter(
            (item) =>
              item.INCIDENT_NAME === "Броски в створ ворот" ||
              item.INCIDENT_NAME === "Удары в створ"
          )?.[0]
      );

      function getShottsOnTargetAway(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideAway[a]
          ? shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchShotsOnTargetAway = getShottsOnTargetAway(0, 0, 3, 0, 2);

      const secondMatchShotsOnTargetAway = getShottsOnTargetAway(1, 3, 6, 2, 4);

      const thirdMatchShotsOnTargetAway = getShottsOnTargetAway(2, 6, 9, 4, 6);

      const fouthMatchShotsOnTargetAway = getShottsOnTargetAway(3, 9, 12, 6, 8);

      const fivesMatchShotsOnTargetAway = getShottsOnTargetAway(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchShotsOnTargetAway = getShottsOnTargetAway(
        5,
        15,
        18,
        10,
        12
      );

      const shotsOnTargetAwayForFourMatch =
        firstMatchShotsOnTargetAway +
        secondMatchShotsOnTargetAway +
        thirdMatchShotsOnTargetAway +
        fouthMatchShotsOnTargetAway;

      const shotsOnTargetAwayForSixMatches =
        shotsOnTargetAwayForFourMatch +
        fivesMatchShotsOnTargetAway +
        sixMatchShotsOnTargetAway;

      function getShottsOnTargetAwayEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideAway[a]
            ? shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : checkTeamSideAway[a]
          ? shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        0,
        0,
        3,
        0,
        2
      );

      const secondMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        1,
        3,
        6,
        2,
        4
      );

      const thirdMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        2,
        6,
        9,
        4,
        6
      );

      const fouthMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        3,
        9,
        12,
        6,
        8
      );

      const fivesMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchShotsOnTargetAwayEnemy = getShottsOnTargetAwayEnemy(
        5,
        15,
        18,
        10,
        12
      );

      const shotsOnTargetMissedAwayForFourMatch =
        firstMatchShotsOnTargetAwayEnemy +
        secondMatchShotsOnTargetAwayEnemy +
        thirdMatchShotsOnTargetAwayEnemy +
        fouthMatchShotsOnTargetAwayEnemy;

      const shotsOnTargeMissedtAwayForSixMatches =
        shotsOnTargetMissedAwayForFourMatch +
        fivesMatchShotsOnTargetAwayEnemy +
        sixMatchShotsOnTargetAwayEnemy;

      const middleMissedShotsOnTargetForSixMatchesAway =
        shotsOnTargeMissedtAwayForSixMatches / 6;
      const middleMissedShotsOnTargetForFourMatchesAway =
        shotsOnTargetMissedAwayForFourMatch / 4;
      const middleShotsOnTargetAwayForSixMatch =
        shotsOnTargetAwayForSixMatches / 6;
      const middleShotsOnTargetAwayForFourMatch =
        shotsOnTargetAwayForFourMatch / 4;
      const allShotOnTargetHome =
        middleShotsOnTargetHomeForFourMatch * 0.6 +
        middleShotsOnTargetHomeForSixMatch * 0.4;

      const allShotOnTargetAway =
        middleShotsOnTargetAwayForFourMatch * 0.6 +
        middleShotsOnTargetAwayForSixMatch * 0.4;

      const allMissedHome =
        middleMissedShotsOnTargetForFourMatches * 0.6 +
        middleMissedShotsOnTargetForSixMatches * 0.4;

      const allMissedAway =
        middleMissedShotsOnTargetForFourMatchesAway * 0.6 +
        middleMissedShotsOnTargetForSixMatchesAway * 0.4;

      const totalInjuriesHome = allShotOnTargetHome + allMissedHome;
      const totalInjuriesAway = allShotOnTargetAway + allMissedAway;

      const totalShotsOnTarget = (totalInjuriesHome + totalInjuriesAway) / 2;
      const individTotalHome = (allShotOnTargetHome + allMissedAway) / 2;
      const individTotalAway = (allShotOnTargetAway + allMissedHome) / 2;

      const blockedShotsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item?.INCIDENT_NAME === "Блок-но ударов"
          )?.[0]
      );

      function getShottsOnBlockedHome(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideHome[a]
            ? blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideHome[a]
          ? blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchBlockedShotHome = getShottsOnBlockedHome(0, 0, 3, 0, 2);

      const secondMatchBlockedShotHome = getShottsOnBlockedHome(1, 3, 6, 2, 4);

      const thirdMatchBlockedShotHome = getShottsOnBlockedHome(2, 6, 9, 4, 6);

      const fouthMatchBlockedShotHome = getShottsOnBlockedHome(3, 9, 12, 6, 8);

      const fivesMatchBlockedShotHome = getShottsOnBlockedHome(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchBlockedShotHome = getShottsOnBlockedHome(5, 15, 18, 10, 12);

      const blockedShotsForFourMatch =
        firstMatchBlockedShotHome +
        secondMatchBlockedShotHome +
        thirdMatchBlockedShotHome +
        fouthMatchBlockedShotHome;

      const blockedShotsForSixMatch =
        blockedShotsForFourMatch +
        fivesMatchBlockedShotHome +
        sixMatchBlockedShotHome;

      function getShottsOnBlockedHomeEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideHome[a]
            ? blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsHome.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideHome[a]
          ? blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsHome.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        0,
        0,
        3,
        0,
        2
      );

      const secondMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        1,
        3,
        6,
        2,
        4
      );

      const thirdMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        2,
        6,
        9,
        4,
        6
      );

      const fouthMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        3,
        9,
        12,
        6,
        8
      );

      const fivesMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchBlockedShotHomeEnemy = getShottsOnBlockedHomeEnemy(
        5,
        15,
        18,
        10,
        12
      );

      const missedBlockedShotsForFourMatchHome =
        firstMatchBlockedShotHomeEnemy +
        secondMatchBlockedShotHomeEnemy +
        thirdMatchBlockedShotHomeEnemy +
        fouthMatchBlockedShotHomeEnemy;

      const missedBlockedShotsForSixMatchHome =
        missedBlockedShotsForFourMatchHome +
        fivesMatchBlockedShotHomeEnemy +
        sixMatchBlockedShotHomeEnemy;

      const middleBlockedShotsHomeFour = blockedShotsForFourMatch / 4;
      const middleBlockedShotsHomeSix = blockedShotsForSixMatch / 6;

      const missedMiddleBlockedShotsHomeFour =
        missedBlockedShotsForFourMatchHome / 4;
      const missedMiddleBlockedShotsHomeSix =
        missedBlockedShotsForSixMatchHome / 6;

      const allBlockedShotsHome =
        middleBlockedShotsHomeFour * 0.6 + middleBlockedShotsHomeSix * 0.4;
      const allMissedBlockedShotsHome =
        missedMiddleBlockedShotsHomeFour * 0.6 +
        missedMiddleBlockedShotsHomeSix * 0.4;

      const throwForFourMatchHome =
        shotsOnTargetHomeForFourMatch + blockedShotsForFourMatch;
      const throwForSixMatchesHome =
        shotsOnTargetHomeForSixMatches + blockedShotsForSixMatch;

      const missedThorwForFourMatchesHome =
        shotsOnTargetMissedHomeForFourMatch +
        missedBlockedShotsForFourMatchHome;

      const missedThorwForSixMatchesHome =
        shotsOnTargeMissedtHomeForSixMatches +
        missedBlockedShotsForSixMatchHome;

      const middleThrowFourMatchesHome = throwForFourMatchHome / 4;
      const middleThrowSixMatchesHome = throwForSixMatchesHome / 6;
      const middleMissedThrowHomeFourMatches =
        missedThorwForFourMatchesHome / 4;
      const middleMissedThrowHomeSixMatches = missedThorwForSixMatchesHome / 6;

      const blockedShotsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item?.INCIDENT_NAME === "Блок-но ударов"
          )?.[0]
      );

      function getShottsOnBlockedAway(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? checkTeamSideAway[a]
            ? blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideAway[a]
          ? blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);
      }

      const firstMatchBlockedShotAway = getShottsOnBlockedAway(0, 0, 3, 0, 2);

      const secondMatchBlockedShotAway = getShottsOnBlockedAway(1, 3, 6, 2, 4);

      const thirdMatchBlockedShotAway = getShottsOnBlockedAway(2, 6, 9, 4, 6);

      const fouthMatchBlockedShotAway = getShottsOnBlockedAway(3, 9, 12, 6, 8);

      const fivesMatchBlockedShotAway = getShottsOnBlockedAway(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchBlockedShotHomeAway = getShottsOnBlockedAway(
        5,
        15,
        18,
        10,
        12
      );

      const twoMinutesOfRemovalHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Удаления")?.[0]
      );

      const twoMinutesOfRemovalAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Удаления")?.[0]
      );

      const twoMinutesOfRemovalHomeFour = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesOfRemovalHomeSix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesOfRemovalHomeFour);

      const twoMinutesOfRemovalAwayFour = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesOfRemovalAwaySix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesOfRemovalAwayFour);

      const twoMinutesMissedOfRemovalHomeFour = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const twoMinutesMissedOfRemovalHomeSix = twoMinutesOfRemovalHome
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, twoMinutesMissedOfRemovalHomeFour);

      const twoMinutesMissedOfRemovalAwayFour = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(0, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const twoMinutesMissedOfRemovalAwaySix = twoMinutesOfRemovalAway
        .filter((item) => item !== undefined)
        .slice(12, 18)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, twoMinutesMissedOfRemovalAwayFour);

      const midlleTwoMinutsRemoveHomeFour = twoMinutesOfRemovalHomeFour / 4;
      const midlleTwoMinutsRemoveHomeSix = twoMinutesOfRemovalHomeSix / 6;

      const midlleTwoMinutsRemoveAwayFour = twoMinutesOfRemovalAwayFour / 4;
      const midlleTwoMinutsRemoveAwaySix = twoMinutesOfRemovalAwaySix / 6;

      const middleMissedTwoMinutsRemoveHomeFour =
        twoMinutesMissedOfRemovalHomeFour / 4;
      const middleMissedTwoMinutsRemoveHomeSix =
        twoMinutesMissedOfRemovalHomeSix / 6;

      const middleMissedTwoMinutsRemoveAwayFour =
        twoMinutesMissedOfRemovalAwayFour / 4;
      const middleMissedTwoMinutsRemoveAwaySix =
        twoMinutesMissedOfRemovalAwaySix / 6;

      const allTwoMinutsRemove =
        midlleTwoMinutsRemoveHomeFour * 0.6 +
        midlleTwoMinutsRemoveHomeSix * 0.4;

      const allTwoMinutsRemoveAway =
        midlleTwoMinutsRemoveAwayFour * 0.6 +
        midlleTwoMinutsRemoveAwaySix * 0.4;

      const allMissedTwoMissedRemoveHome =
        middleMissedTwoMinutsRemoveHomeFour * 0.6 +
        middleMissedTwoMinutsRemoveHomeSix * 0.4;

      const allMissedTwoMissedRemoveAway =
        middleMissedTwoMinutsRemoveAwayFour * 0.6 +
        middleMissedTwoMinutsRemoveAwaySix * 0.4;

      const twiMinutsIndividTotalHome =
        (allTwoMinutsRemove + allMissedTwoMissedRemoveAway) / 2;
      const twoMinutsIndividTotalAway =
        (allTwoMinutsRemoveAway + allMissedTwoMissedRemoveHome) / 2;

      const twoMinutsRemoveInjuriesHome =
        allTwoMinutsRemove + allMissedTwoMissedRemoveHome;
      const twoMinutsRemoveInjuriesAway =
        allTwoMinutsRemoveAway + allMissedTwoMissedRemoveAway;
      const twoMinutsRemoveTotalInjuries =
        (twoMinutsRemoveInjuriesHome + twoMinutsRemoveInjuriesAway) / 2;

      const cornerShotsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Угловые")?.[0]
      );
      const cornerShotsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Угловые")?.[0]
      );

      function getBaseStats(a, b, c, d, e, arr) {
        return checkTeamSideHome[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0);
      }

      function getBaseStatsEnemy(a, b, c, d, e, arr) {
        return checkTeamSideHome[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0);
      }

      function getBaseStatsAway(a, b, c, d, e, arr) {
        return checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0);
      }

      function getBaseStatsEnemyAway(a, b, c, d, e, arr) {
        return checkTeamSideAway[a]
          ? arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
          : arr
              .filter((item) => item !== undefined)
              .slice(d, e)
              .reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0);
      }

      const firstMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        cornerShotsAway
      );

      const secondMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        cornerShotsAway
      );

      const thirdMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        cornerShotsAway
      );

      const fouthMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        cornerShotsAway
      );

      const fivesMatchCornerShotAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        cornerShotsAway
      );
      const sixMatchCornerShotHomeAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        cornerShotsAway
      );

      const firstMatchCornerShotAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        cornerShotsAway
      );

      const secondMatchCornerShotAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        cornerShotsAway
      );

      const thirdMatchCornerShotAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        cornerShotsAway
      );

      const fouthMatchCornerShotAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        cornerShotsAway
      );

      const fivesMatchCornerShotAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        cornerShotsAway
      );

      const sixMatchCornerShotHomeAway = getBaseStatsAway(
        5,
        15,
        18,
        10,
        12,
        cornerShotsAway
      );

      const firstMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        cornerShotsHome
      );

      const secondMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        cornerShotsHome
      );

      const thirdMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        cornerShotsHome
      );

      const fouthMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        cornerShotsHome
      );

      const fivesMatchCornerShotHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        cornerShotsHome
      );

      const sixMatchCornerShotHomeHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        cornerShotsHome
      );

      const firstMatchCornerShotHome = getBaseStats(
        0,
        0,
        3,
        0,
        2,
        cornerShotsHome
      );

      const secondMatchCornerShotHome = getBaseStats(
        1,
        3,
        6,
        2,
        4,
        cornerShotsHome
      );

      const thirdMatchCornerShotHome = getBaseStats(
        2,
        6,
        9,
        4,
        6,
        cornerShotsHome
      );

      const fouthMatchCornerShotHome = getBaseStats(
        3,
        9,
        12,
        6,
        8,
        cornerShotsHome
      );

      const fivesMatchCornerShotHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        cornerShotsHome
      );

      const sixMatchCornerShotHomeHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        cornerShotsHome
      );

      const cornerShotsHomeForFourMatches =
        firstMatchCornerShotHome +
        secondMatchCornerShotHome +
        thirdMatchCornerShotHome +
        fouthMatchCornerShotHome;

      const cornerShotsHomeForSixMatches =
        cornerShotsHomeForFourMatches +
        fivesMatchCornerShotHome +
        sixMatchCornerShotHomeHome;

      const cornerShotsAwayForFourMatches =
        firstMatchCornerShotAway +
        secondMatchCornerShotAway +
        thirdMatchCornerShotAway +
        fouthMatchCornerShotAway;

      const cornerShotsAwayForSixMatches =
        cornerShotsAwayForFourMatches +
        fivesMatchCornerShotAway +
        sixMatchCornerShotHomeAway;

      const missedCorneForFourMatchesHome =
        firstMatchCornerShotHomeEnemy +
        secondMatchCornerShotHomeEnemy +
        thirdMatchCornerShotHomeEnemy +
        fouthMatchCornerShotHomeEnemy;

      const missedCorneForSixMatchesHome =
        missedCorneForFourMatchesHome +
        fivesMatchCornerShotHomeEnemy +
        sixMatchCornerShotHomeHomeEnemy;

      const missedCorneForFourMatchesAway =
        firstMatchCornerShotAwayEnemy +
        secondMatchCornerShotAwayEnemy +
        thirdMatchCornerShotAwayEnemy +
        fouthMatchCornerShotAwayEnemy;

      const missedCorneForSixMatchesAway =
        missedCorneForFourMatchesAway +
        fivesMatchCornerShotAwayEnemy +
        sixMatchCornerShotHomeAwayEnemy;

      const middleCornerShotsHomeForFourMatches =
        cornerShotsHomeForFourMatches / 4;
      const middleCornerShotsHomeForSixMatches =
        cornerShotsHomeForSixMatches / 6;

      const middleCornerShotsAwayForFourMatches =
        cornerShotsAwayForFourMatches / 4;
      const middleCornerShotsAwayForSixMatches =
        cornerShotsAwayForSixMatches / 6;

      const middleMissedCornerShotHomeForFourMatches =
        missedCorneForFourMatchesHome / 4;
      const middleMissedCornerShotHomeForSixMatches =
        missedCorneForSixMatchesHome / 6;

      const middleMissedCornerShotAwayForFourMatches =
        missedCorneForFourMatchesAway / 4;
      const middleMissedCornerShotAwayForSixMatches =
        missedCorneForSixMatchesAway / 6;

      const cornerHome =
        middleCornerShotsHomeForFourMatches * 0.6 +
        middleCornerShotsHomeForSixMatches * 0.4;
      const cornerAway =
        middleCornerShotsAwayForFourMatches * 0.6 +
        middleCornerShotsAwayForSixMatches * 0.4;

      const cornerHomeMissed =
        middleMissedCornerShotHomeForFourMatches * 0.6 +
        middleMissedCornerShotHomeForSixMatches * 0.4;

      const cornerAwayMissed =
        middleMissedCornerShotAwayForFourMatches * 0.6 +
        middleMissedCornerShotAwayForSixMatches * 0.4;

      const cornerIndividTotalHome = (cornerHome + cornerAwayMissed) / 2;
      const cornerIndividTotalAway = (cornerAway + cornerHomeMissed) / 2;

      const cornerInjuriesHome = cornerHome + cornerHomeMissed;
      const cornerInjuriesAway = cornerAway + cornerAwayMissed;
      const cornerTotalInjuries = (cornerInjuriesHome + cornerInjuriesAway) / 2;

      const ofsidesHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Офсайды")?.[0]
      );

      const ofsidesAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item?.INCIDENT_NAME === "Офсайды")?.[0]
      );

      const firstMatchOffisideHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        ofsidesHome
      );

      const secondMatchOffisideHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        ofsidesHome
      );

      const thirdMatchOffisideHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        ofsidesHome
      );
      const fouthMatchOffisideHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        ofsidesHome
      );

      const fivesMatchOffisideHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        ofsidesHome
      );
      const sixMatchOffisideHomeHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        ofsidesHome
      );

      const firstMatchOffisideHome = getBaseStats(0, 0, 3, 0, 2, ofsidesHome);

      const secondMatchOffisideHome = getBaseStats(1, 3, 6, 2, 4, ofsidesHome);
      const thirdMatchOffisideHome = getBaseStats(2, 6, 9, 4, 6, ofsidesHome);

      const fouthMatchOffisideHome = getBaseStats(3, 9, 12, 6, 8, ofsidesHome);

      const fivesMatchOffisideHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        ofsidesHome
      );

      const sixMatchOffisideHomeHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        ofsidesHome
      );

      const firstMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        ofsidesAway
      );

      const secondMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        ofsidesAway
      );

      const thirdMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        ofsidesAway
      );
      const fouthMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        ofsidesAway
      );

      const fivesMatchOffisideAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        ofsidesAway
      );
      const sixMatchOffisideHomeAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        ofsidesAway
      );

      const firstMatchOffisideAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        ofsidesAway
      );

      const secondMatchOffisideAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        ofsidesAway
      );
      const thirdMatchOffisideAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        ofsidesAway
      );

      const fouthMatchOffisideAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        ofsidesAway
      );

      const fivesMatchOffisideAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        ofsidesAway
      );

      const sixMatchOffisideHomeAway = getBaseStatsAway(
        5,
        15,
        18,
        10,
        12,
        ofsidesAway
      );

      const ofsidesHomeFourMatch =
        firstMatchOffisideHome +
        secondMatchOffisideHome +
        thirdMatchOffisideHome +
        fouthMatchOffisideHome;

      const ofsidesHomeSixMatch =
        ofsidesHomeFourMatch +
        fivesMatchOffisideHome +
        sixMatchOffisideHomeHome;

      const missedOffsidesHomeFourMatches =
        firstMatchOffisideHomeEnemy +
        secondMatchOffisideHomeEnemy +
        thirdMatchOffisideHomeEnemy +
        fouthMatchOffisideHomeEnemy;

      const missedOfsidesHomeSixMatch =
        missedOffsidesHomeFourMatches +
        fivesMatchOffisideHomeEnemy +
        sixMatchOffisideHomeHomeEnemy;

      const ofsidesAwayFourMatches =
        firstMatchOffisideAway +
        secondMatchOffisideAway +
        thirdMatchOffisideAway +
        fouthMatchOffisideAway;

      const ofsidesAwaySixMatches =
        ofsidesAwayFourMatches +
        fivesMatchOffisideAway +
        sixMatchOffisideHomeAway;

      const missedOfsidersAwayFour =
        firstMatchOffisideAwayEnemy +
        secondMatchOffisideAwayEnemy +
        thirdMatchOffisideAwayEnemy +
        fouthMatchOffisideAwayEnemy;

      const missedOfsidersAwaySix =
        missedOfsidersAwayFour +
        fivesMatchOffisideAwayEnemy +
        sixMatchOffisideHomeAwayEnemy;

      const middleOfsidersHomeFour = ofsidesHomeFourMatch / 4;
      const middleOfsidersHomeSix = ofsidesHomeSixMatch / 6;

      const middleOfsidersAwayFour = ofsidesAwayFourMatches / 4;
      const middleOfsidersAwaySix = ofsidesAwaySixMatches / 6;

      const middleMissedOfsidersHomeFour = missedOffsidesHomeFourMatches / 4;
      const middleMissedOfsidersHomeSix = missedOfsidesHomeSixMatch / 6;

      const middleMissedOfsidersAwayFour = missedOfsidersAwayFour / 4;
      const middleMissedOfsidersAwaySix = missedOfsidersAwaySix / 6;

      const ofsidersHome =
        middleOfsidersHomeFour * 0.6 + middleOfsidersHomeSix * 0.4;

      const ofsiderAway =
        middleOfsidersAwayFour * 0.6 + middleOfsidersAwaySix * 0.4;

      const missingOfsidersHome =
        middleMissedOfsidersHomeFour * 0.6 + middleMissedOfsidersHomeSix * 0.4;

      const missingOfsidersAway =
        middleMissedOfsidersAwayFour * 0.6 + middleMissedOfsidersAwaySix * 0.4;

      const individOfsidersHome = (ofsidersHome + missingOfsidersAway) / 2;
      const individOfsidersAway = (ofsiderAway + missingOfsidersHome) / 2;

      const offsidersInjurieHome = ofsidersHome + missingOfsidersHome;
      const offsidersInjuriesAway = ofsiderAway + missingOfsidersAway;
      const totalOfidersInjuriesHome =
        (offsidersInjurieHome + offsidersInjuriesAway) / 2;
      const follsHome = statsForPeriodsHome.map(
        (item) =>
          item?.ITEMS.filter((item) => item?.INCIDENT_NAME === "Фолы")?.[0]
      );
      const follsAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter((item) => item.INCIDENT_NAME === "Фолы")?.[0]
      );

      const firstMatchFollsEnemy = getBaseStatsEnemy(0, 0, 3, 0, 2, follsHome);

      const secondMatchFollsEnemy = getBaseStatsEnemy(1, 3, 6, 2, 4, follsHome);

      const thirdMatchFollsEnemy = getBaseStatsEnemy(2, 6, 9, 4, 6, follsHome);
      const fouthMatchFollsEnemy = getBaseStatsEnemy(3, 9, 12, 6, 8, follsHome);

      const fivesMatchFollsEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        follsHome
      );
      const sixMatchFollsHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        follsHome
      );

      const firstMatchFolls = getBaseStats(0, 0, 3, 0, 2, follsHome);

      const secondMatchFolls = getBaseStats(1, 3, 6, 2, 4, follsHome);
      const thirdMatchFolls = getBaseStats(2, 6, 9, 4, 6, follsHome);

      const fouthMatchFolls = getBaseStats(3, 9, 12, 6, 8, follsHome);

      const fivesMatchFolls = getBaseStats(4, 12, 15, 8, 10, follsHome);

      const sixMatchFollsHome = getBaseStats(5, 15, 18, 10, 12, follsHome);

      const follsHomeFourMatch =
        firstMatchFolls + secondMatchFolls + thirdMatchFolls + fouthMatchFolls;

      const follsHomeSixMatch =
        fivesMatchFolls + sixMatchFollsHome + follsHomeFourMatch;

      const missedFollsHomeFourMatches =
        firstMatchFollsEnemy +
        secondMatchFollsEnemy +
        thirdMatchFollsEnemy +
        fouthMatchFollsEnemy;

      const missedFollsHomeSixMatch =
        missedFollsHomeFourMatches +
        fivesMatchFollsEnemy +
        sixMatchFollsHomeEnemy;

      const firstMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        follsAway
      );

      const secondMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        follsAway
      );

      const thirdMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        follsAway
      );
      const fouthMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        follsAway
      );

      const fivesMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        follsAway
      );
      const sixMatchFollsAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        follsAway
      );

      const firstMatchFollsAway = getBaseStatsAway(0, 0, 3, 0, 2, follsAway);

      const secondMatchFollsAway = getBaseStatsAway(1, 3, 6, 2, 4, follsAway);
      const thirdMatchFollsAway = getBaseStatsAway(2, 6, 9, 4, 6, follsAway);

      const fouthMatchFollsAway = getBaseStatsAway(3, 9, 12, 6, 8, follsAway);

      const fivesMatchFollsAway = getBaseStatsAway(4, 12, 15, 8, 10, follsAway);

      const sixMatchFollsAway = getBaseStatsAway(5, 15, 18, 10, 12, follsAway);

      const follsAwayFourMatches =
        firstMatchFollsAway +
        secondMatchFollsAway +
        thirdMatchFollsAway +
        fouthMatchFollsAway;

      const follsAwaySixMatches =
        follsAwayFourMatches + fivesMatchFollsAway + sixMatchFollsAway;

      const missedFollsAwayFour =
        firstMatchFollsAwayEnemy +
        secondMatchFollsAwayEnemy +
        thirdMatchFollsAwayEnemy +
        fouthMatchFollsAwayEnemy;

      const missedFollsAwaySix =
        missedFollsAwayFour + fivesMatchFollsAwayEnemy + sixMatchFollsAwayEnemy;

      const middlefollsHomeFour = follsHomeFourMatch / 4;
      const middlefollsHomeSix = follsHomeSixMatch / 6;

      const middlefollsAwayFour = follsAwayFourMatches / 4;
      const middlefollsAwaySix = follsAwaySixMatches / 6;

      const middleMissedfollsHomeFour = missedFollsHomeFourMatches / 4;
      const middleMissedfollsHomeSix = missedFollsHomeSixMatch / 6;

      const middleMissedfollsAwayFour = missedFollsAwayFour / 4;
      const middleMissedfollsAwaySix = missedFollsAwaySix / 6;

      const follsAllHome = middlefollsHomeFour * 0.6 + middlefollsHomeSix * 0.4;

      const ofsiderAllAway =
        middlefollsAwayFour * 0.6 + middlefollsAwaySix * 0.4;

      const missingfollsHome =
        middleMissedfollsHomeFour * 0.6 + middleMissedfollsHomeSix * 0.4;

      const missingfollsAway =
        middleMissedfollsAwayFour * 0.6 + middleMissedfollsAwaySix * 0.4;

      const individfollsHome = (follsAllHome + missingfollsAway) / 2;
      const individfollsAway = (ofsiderAllAway + missingfollsHome) / 2;

      const follsInjurieHome = follsAllHome + missingfollsHome;
      const follsInjuriesAway = ofsiderAway + missingfollsAway;
      const totalFollsInjuries = (follsInjurieHome + follsInjuriesAway) / 2;

      const yellowCardHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item?.INCIDENT_NAME === "Желтые карточки"
          )?.[0]
      );

      const yellowCardAway = statsForPeriodsAway.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item?.INCIDENT_NAME === "Желтые карточки"
          )?.[0]
      );

      const firstMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        0,
        0,
        3,
        0,
        2,
        yellowCardHome
      );

      const secondMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        1,
        3,
        6,
        2,
        4,
        yellowCardHome
      );

      const thirdMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        2,
        6,
        9,
        4,
        6,
        yellowCardHome
      );
      const fouthMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        3,
        9,
        12,
        6,
        8,
        yellowCardHome
      );

      const fivesMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        4,
        12,
        15,
        8,
        10,
        yellowCardHome
      );
      const sixMatchYellowCardHomeEnemy = getBaseStatsEnemy(
        5,
        15,
        18,
        10,
        12,
        yellowCardHome
      );

      const firstMatchYellowCardHome = getBaseStats(
        0,
        0,
        3,
        0,
        2,
        yellowCardHome
      );

      const secondMatchYellowCardHome = getBaseStats(
        1,
        3,
        6,
        2,
        4,
        yellowCardHome
      );
      const thirdMatchYellowCardHome = getBaseStats(
        2,
        6,
        9,
        4,
        6,
        yellowCardHome
      );

      const fouthMatchYellowCardHome = getBaseStats(
        3,
        9,
        12,
        6,
        8,
        yellowCardHome
      );

      const fivesMatchYellowCardHome = getBaseStats(
        4,
        12,
        15,
        8,
        10,
        yellowCardHome
      );

      const sixMatchYellowCardHome = getBaseStats(
        5,
        15,
        18,
        10,
        12,
        yellowCardHome
      );

      const yellowCardHomeFourMatch =
        firstMatchYellowCardHome +
        secondMatchYellowCardHome +
        thirdMatchYellowCardHome +
        fouthMatchYellowCardHome;

      const yellowCardHomeSixMatch =
        yellowCardHomeFourMatch +
        fivesMatchYellowCardHome +
        sixMatchYellowCardHome;

      const enemyYellowCardHomeFour =
        firstMatchYellowCardHomeEnemy +
        secondMatchYellowCardHomeEnemy +
        thirdMatchYellowCardHomeEnemy +
        fouthMatchYellowCardHomeEnemy;

      const enemyYellowCardHomeSix =
        enemyYellowCardHomeFour +
        fivesMatchYellowCardHomeEnemy +
        sixMatchYellowCardHomeEnemy;

      const firstMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        0,
        0,
        3,
        0,
        2,
        yellowCardAway
      );

      const secondMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        1,
        3,
        6,
        2,
        4,
        yellowCardAway
      );

      const thirdMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        2,
        6,
        9,
        4,
        6,
        yellowCardAway
      );
      const fouthMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        3,
        9,
        12,
        6,
        8,
        yellowCardAway
      );

      const fivesMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        4,
        12,
        15,
        8,
        10,
        yellowCardAway
      );
      const sixMatchYellowCardAwayEnemy = getBaseStatsEnemyAway(
        5,
        15,
        18,
        10,
        12,
        yellowCardAway
      );

      const firstMatchYellowCardAway = getBaseStatsAway(
        0,
        0,
        3,
        0,
        2,
        yellowCardAway
      );

      const secondMatchYellowCardAway = getBaseStatsAway(
        1,
        3,
        6,
        2,
        4,
        yellowCardAway
      );
      const thirdMatchYellowCardAway = getBaseStatsAway(
        2,
        6,
        9,
        4,
        6,
        yellowCardAway
      );

      const fouthMatchYellowCardAway = getBaseStatsAway(
        3,
        9,
        12,
        6,
        8,
        yellowCardAway
      );

      const fivesMatchYellowCardAway = getBaseStatsAway(
        4,
        12,
        15,
        8,
        10,
        yellowCardAway
      );

      const sixMatchYellowCardAway = getBaseStatsAway(
        5,
        15,
        18,
        10,
        12,
        yellowCardAway
      );

      const yellowCardAwayFourMatch =
        firstMatchYellowCardAway +
        secondMatchYellowCardAway +
        thirdMatchYellowCardAway +
        fouthMatchYellowCardAway;

      const yellowCardAwaySixMatch =
        yellowCardAwayFourMatch +
        fivesMatchYellowCardAway +
        sixMatchYellowCardAway;

      const yellowCardAwayFourMatchEnemy =
        firstMatchYellowCardAwayEnemy +
        secondMatchYellowCardAwayEnemy +
        thirdMatchYellowCardAwayEnemy +
        fouthMatchYellowCardAwayEnemy;

      const yellowCardAwaySixMatchEnemy =
        yellowCardAwayFourMatchEnemy +
        fivesMatchYellowCardAwayEnemy +
        sixMatchYellowCardAwayEnemy;

      const middleYellowCardHomeFour = yellowCardHomeFourMatch / 4;
      const middleYellowCardAwayFour = yellowCardAwayFourMatch / 4;

      const middleYellowCardHomeSix = yellowCardHomeSixMatch / 6;
      const middleYellowCardAwaySix = yellowCardAwaySixMatch / 6;

      const middleYellowCardHomeFourEnemy = enemyYellowCardHomeFour / 4;
      const middleYellowCardAwayFourEnemy = yellowCardAwayFourMatchEnemy / 4;

      const middleYellowCardHomeSixEnemy = enemyYellowCardHomeSix / 6;
      const middleYellowCardAwaySixEnemy = yellowCardAwaySixMatchEnemy / 6;
      const yellowAllHome =
        middleYellowCardHomeFour * 0.6 + middleYellowCardHomeSix * 0.4;

      const yellowAllAway =
        middleYellowCardAwayFour * 0.6 + middleYellowCardAwaySix * 0.4;

      const missedYellowHome =
        middleYellowCardHomeFourEnemy * 0.6 +
        middleYellowCardHomeSixEnemy * 0.4;

      const missedYellowAway =
        middleYellowCardAwayFourEnemy * 0.6 +
        middleYellowCardAwaySixEnemy * 0.4;

      const individTotalYellowCardHome = (yellowAllHome + missedYellowAway) / 2;
      const individTotalYellowCardAway = (yellowAllAway + missedYellowHome) / 2;

      //  individTotalYellowCardHome,individTotalYellowCardAway,

      const injuriesYellowCardHome = yellowAllHome + missedYellowHome;
      const injuriesYellowCardAway = yellowAllAway + missedYellowAway;

      const totalYellowCardInjuries =
        (injuriesYellowCardHome + injuriesYellowCardAway) / 2;

      function getShottsOnBlockedAwayEnemy(a, b, c, d, e) {
        return tournament.NAME === "США: НХЛ"
          ? !checkTeamSideAway[a]
            ? blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : blockedShotsAway.slice(b, c).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
          : checkTeamSideAway[a]
          ? blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsAway.slice(d, e).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);
      }

      const firstMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        0,
        0,
        3,
        0,
        2
      );

      const secondMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        1,
        3,
        6,
        2,
        4
      );

      const thirdMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        2,
        6,
        9,
        4,
        6
      );

      const fouthMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        3,
        9,
        12,
        6,
        8
      );

      const fivesMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        4,
        12,
        15,
        8,
        10
      );

      const sixMatchBlockedShotAwayEnemy = getShottsOnBlockedAwayEnemy(
        5,
        15,
        18,
        10,
        12
      );

      const kedShotsForFourMatchAway =
        firstMatchBlockedShotAway +
        secondMatchBlockedShotAway +
        thirdMatchBlockedShotAway +
        fouthMatchBlockedShotAway;

      const blockedShotsForSixMatchAway =
        kedShotsForFourMatchAway +
        fivesMatchBlockedShotAway +
        sixMatchBlockedShotHomeAway;

      const missedBlockedShotsForFourMatchAway =
        firstMatchBlockedShotAwayEnemy +
        secondMatchBlockedShotAwayEnemy +
        thirdMatchBlockedShotAwayEnemy +
        fouthMatchBlockedShotAwayEnemy;

      const missedBlockedShotsForSixMatchAway =
        missedBlockedShotsForFourMatchAway +
        fivesMatchBlockedShotAwayEnemy +
        sixMatchBlockedShotAwayEnemy;

      const middleBlockedShotsForFourMatchesAway = kedShotsForFourMatchAway / 4;
      const middleBlockedShotsForSixMatchesAway =
        blockedShotsForSixMatchAway / 6;

      const missedMidleBlockedShotsForFourMatches =
        missedBlockedShotsForFourMatchAway / 4;
      const missedMidleBlockedShotsForSixMatches =
        missedBlockedShotsForSixMatchAway / 6;

      const allBlockedShotsAway =
        middleBlockedShotsForFourMatchesAway * 0.6 +
        middleBlockedShotsForSixMatchesAway * 0.4;
      const allMissedBlockedShotsAway =
        missedMidleBlockedShotsForFourMatches * 0.6 +
        missedMidleBlockedShotsForSixMatches * 0.4;

      const injuriesBlockedShotsHome =
        allBlockedShotsHome + allMissedBlockedShotsHome;
      const injuriesBlockedShotsAway =
        allBlockedShotsAway + allMissedBlockedShotsAway;
      const totalShotsBlocked =
        (injuriesBlockedShotsHome + injuriesBlockedShotsAway) / 2;

      const individeTotalBlockedShotsHome =
        (allBlockedShotsHome + allMissedBlockedShotsAway) / 2;
      const individeTotalBlockedShotsAway =
        (allBlockedShotsAway + allMissedBlockedShotsHome) / 2;

      const throwForFourMatchAway =
        shotsOnTargetAwayForFourMatch + kedShotsForFourMatchAway;
      const throwForSixMatchesAway =
        shotsOnTargetAwayForSixMatches + blockedShotsForSixMatchAway;

      const missedThorwForFourMatchesAway =
        shotsOnTargetMissedAwayForFourMatch +
        missedBlockedShotsForFourMatchAway;

      const missedThorwForSixMatchesAway =
        shotsOnTargeMissedtAwayForSixMatches +
        missedBlockedShotsForSixMatchAway;

      const middleThrowFourMatchesAway = throwForFourMatchAway / 4;
      const middleThrowSixMatchesAway = throwForSixMatchesAway / 6;

      const middleMissedThrowAwayFourMatches =
        missedThorwForFourMatchesAway / 4;
      const middleMissedThrowAwaySixMatches = missedThorwForSixMatchesAway / 6;

      const allThrowHome =
        middleThrowFourMatchesHome * 0.6 + middleThrowSixMatchesHome * 0.4;
      const allThrowAway =
        middleThrowFourMatchesAway * 0.6 + middleThrowSixMatchesAway * 0.4;
      const allMissedThrowHome =
        middleMissedThrowHomeFourMatches * 0.6 +
        middleMissedThrowHomeSixMatches * 0.4;

      const allMissedThrowAway =
        middleMissedThrowAwayFourMatches * 0.6 +
        middleMissedThrowAwaySixMatches * 0.4;

      const individTotalHomeThrow = (allThrowHome + allMissedThrowAway) / 2;
      const individTotalAwayThrow = (allThrowAway + allMissedThrowHome) / 2;

      const prevGoalsHome = previosMatchHome
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.HOME_SCORE_FULL
            : item.KY || item?.AWAY_SCORE_FULL
        );

      const prevGoalsEnemyHome = previosMatchHome
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.AWAY_SCORE_FULL
            : item.KY || item?.HOME_SCORE_FULL
        );

      const prevGoalsAway = previosMatchAway
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.HOME_SCORE_FULL
            : item.KY || item?.AWAY_SCORE_FULL
        );

      const prevGoalsEnemyAway = previosMatchAway
        .slice(0, 6)
        .map((item) =>
          item.TEAM_MARK === "home"
            ? item.KX || item?.AWAY_SCORE_FULL
            : item.KY || item?.HOME_SCORE_FULL
        );

      function passRateCalc(b, c) {
        const a = b / c;
        return isNaN(a) ? 0 : a || isFinite(a) ? a : 0;
      }

      const firstMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[0]),
        firstMatchShotsOnTarget
      );

      const secondMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[1]),
        Number(secondMatchShotsOnTarget)
      );

      const thirdMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[2]),
        Number(thirdMatchShotsOnTarget)
      );

      const fouthMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[3]),
        Number(fouthMatchShotsOnTarget)
      );

      const fivesMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[4]),
        Number(fivesMatchShotsOnTarget)
      );

      const sixMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[5]),
        Number(sixMatchShotsOnTarget)
      );

      const firstMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[0]),
        Number(firstMatchShotsOnTargetAway)
      );

      const secondMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[1]),

        Number(secondMatchShotsOnTargetAway)
      );

      const thirdMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[2]),
        Number(thirdMatchShotsOnTargetAway)
      );

      const fouthMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[3]),
        Number(fouthMatchShotsOnTargetAway)
      );

      const fivesMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[4]),
        Number(fivesMatchShotsOnTargetAway)
      );

      const sixMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[5]),
        Number(sixMatchShotsOnTargetAway)
      );

      const passRateHome =
        (firstMatchPassRateHome +
          secondMatchPassRateHome +
          thirdMatchPassRateHome +
          fouthMatchPassRateHome +
          fivesMatchPassRateHome +
          sixMatchPassRateHome) /
        6;

      const passRateAway =
        (firstMatchPassRateAway +
          secondMatchPassRateAway +
          thirdMatchPassRateAway +
          fouthMatchPassRateAway +
          fivesMatchPassRateAway +
          sixMatchPassRateAway) /
        6;

      const firstMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[0]),
        firstMatchShotsOnTargetHomeEnemy
      );

      const secondMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[1]),
        secondMatchShotsOnTargetHomeEnemy
      );

      const thirdMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[2]),
        thirdMatchShotsOnTargetHomeEnemy
      );
      const fouthMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[3]),
        fourhMatchShotsOnTargetHomeEnemy
      );

      const fivesMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[4]),
        fivesMatchShotsOnTargetHomeEnemy
      );

      const sixMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[5]),
        sixMatchShotsOnTargetHomeEnemy
      );

      const firstMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[0]),
        firstMatchShotsOnTargetAwayEnemy
      );

      const secondMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[1]),
        secondMatchShotsOnTargetAwayEnemy
      );

      const thirdMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[2]),
        thirdMatchShotsOnTargetAwayEnemy
      );

      const fouthMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[3]),
        fouthMatchShotsOnTargetAwayEnemy
      );

      const fivesMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[4]),
        fivesMatchShotsOnTargetAwayEnemy
      );

      const sixMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[5]),
        sixMatchShotsOnTargetAwayEnemy
      );

      const missedRateHome =
        (firstMatchPassRateHomeEnemy +
          secondMatchPassRateHomeEnemy +
          thirdMatchPassRateHomeEnemy +
          fouthMatchPassRateHomeEnemy +
          fivesMatchPassRateHomeEnemy +
          sixMatchPassRateHomeEnemy) /
        6;

      const missedRateAway =
        (firstMatchPassRateAwayEnemy +
          secondMatchPassRateAwayEnemy +
          thirdMatchPassRateAwayEnemy +
          fouthMatchPassRateAwayEnemy +
          fivesMatchPassRateAwayEnemy +
          sixMatchPassRateAwayEnemy) /
        6;

      //За все периоды
      // Ценность удары в створ НАПАДЕНИЕ
      const shotToGoalRatioAttackHome =
        goalsForSixMatchHome / shotsOnTargetHomeForSixMatches;
      const shotToGoalRatioAttackAway =
        goalsForSixMatchAway / shotsOnTargetAwayForSixMatches;

      //Ценность удары в створ ЗАЩИТА
      const shotToGoalRatioSafeHome =
        misedForSixMatchHome / shotsOnTargeMissedtHomeForSixMatches;

      const shotToGoalRatioSafeAway =
        misedForSixMatchAway / shotsOnTargeMissedtAwayForSixMatches;

      // Хозяева Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M27-название ячейки
      const M27 =
        middleThrowSixMatchesHome / middleShotsOnTargetHomeForSixMatch;

      //Хозяева Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N27-название ячейки
      const N27 =
        middleMissedThrowHomeSixMatches /
        middleMissedShotsOnTargetForSixMatches;
      // //Гости Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M28-название

      const M28 =
        middleThrowSixMatchesAway / middleShotsOnTargetAwayForSixMatch;

      //Гости Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N28-название ячейки
      const N28 =
        middleMissedThrowAwaySixMatches /
        middleMissedShotsOnTargetForSixMatchesAway;

      //Хозяева D10
      const host = individTotalHomeThrow / M27;

      // //Гости
      const guest = individTotalAwayThrow / M28;

      // //К соотношению атаки
      const toTheRatioOfAttackHost = host * shotToGoalRatioAttackHome;
      const toTheRatioOfAttackGuest = guest * shotToGoalRatioAttackAway;

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M4
      const M4host = middleEfficiencyLeagHome / middleGoalForSixMatchesHome;

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M5
      const M5guest = middleEfficiencyLeagAway / middleGoalForSixMatchesAway;

      // //ИТБ к ценности нападения
      const itbToTheValueOfTheAttackHost = individTotalHomeGoal / M4host;
      const itbToTheValueOfTheAttackGuest = individTotalAwayGoal / M5guest;

      // //F10=Индивидуальный тотал(удары, хозява)/N28
      const F10 = individTotalHomeThrow / N28;
      // //F11=Индивидуальный тотал(удары, гости)/N27
      const F11 = individTotalAwayThrow / N27;

      // //Атака H13
      const attackHost = F10 * passRateHome;
      // //Атака H14
      const attackGuest = F11 * passRateAway;
      // //Атака H13*Ценность удары в створ защита хоз
      const I13 = attackHost * shotToGoalRatioSafeAway;
      // //Атака H14*Ценность удары в створ защита гости
      const I14 = attackGuest * shotToGoalRatioSafeHome;

      // //S4, S5 =Средняя результативность лиги/Среднее пропущенное за 6 матчей
      const S4host = middleEfficiencyLeagHome / middleMissedForSixMatcesHome;
      const S5guest = middleEfficiencyLeagAway / middleMissedForSixMatcesAway;

      // //К ценности защиты противника
      const valueOfTheEnemysDefenseHost = attackHost / S5guest;
      const valueOfTheEnemysDefenseGuest = attackGuest / S4host;

      // //H8 ИТБ к ценности нападения/К ценности защиты противника
      const H8host = valueOfTheEnemysDefenseHost / itbToTheValueOfTheAttackHost;
      const H8guest =
        valueOfTheEnemysDefenseGuest / itbToTheValueOfTheAttackGuest;

      // //Тренд
      const trandHost = toTheRatioOfAttackHost / H8host;
      const trandGuest = toTheRatioOfAttackGuest / H8guest;

      // //E15 =Индивидуальный тотал ГОЛЫ ХОЗЯЕВА/M4
      const E15host = individTotalHomeGoal / M4host;
      const E16guest = individTotalAwayGoal / M5guest;

      // //F15
      const F15host = toTheRatioOfAttackHost / S5guest;
      const F16guest = toTheRatioOfAttackGuest / S4host;

      // //D15/D16
      const D15host = E15host / F15host;
      const D16guest = E16guest / F16guest;

      // //H16 =Индивидуальный тотал голы хозяева /s5
      const h16 = individTotalHomeGoal / S5guest;
      const h15 = individTotalAwayGoal / S4host;

      const J19 = individTotalAwayThrow / N27;

      const m14 =
        middleMissedForSixMatcesHome / middleMissedShotsOnTargetForSixMatches;

      // //Пропустят хозяева
      const k14 = J19 * m14;

      const i16 = k14 / M5guest;

      const H16 = individTotalHomeGoal / S5guest;

      const g16 = H16 / i16;

      const c19 = D16guest / g16;

      // //B15 = тренд /d15
      const B15 = trandHost * D15host;

      const B18 = B15 / c19;

      const A18 = B18 / individTotalHomeGoal;

      // //Показаьель хозяева
      const indicatorHome = trandHost / A18;

      const B16 = trandGuest * D16guest;

      const m15 =
        middleMissedForSixMatcesAway /
        middleMissedShotsOnTargetForSixMatchesAway;
      const J18 = individTotalHomeThrow / N28;

      const K15 = J18 * m15;

      const I15 = K15 / M4host;

      const G15 = h15 / I15;

      const C18 = D15host / G15;

      const B19 = B16 / C18;

      const A19 = B19 / individTotalAwayGoal;

      const indicatorAway = trandGuest / A19; ///Показатель гости

      const h10 = F10 * missedRateAway;

      const l10 = h10 / M4host;

      const k11 = attackHost / S5guest;

      const j11 = l10 / k11;

      const l18 = K15 / j11;

      const c13 = l18 / trandHost;

      // ////////
      const stabilizerHome = trandHost * c13; /////Стабилизатор Хозяева
      // ////////

      const h11 = F11 * missedRateHome;

      const l11 = h11 / M5guest;

      const k10 = attackGuest / S4host;

      const j10 = l11 / k10;

      const l17 = k14 / j10;

      const c14 = l17 / trandGuest;

      // ///////
      const stabilizerAway = trandGuest * c14; /////Стабилизатор гости
      // //////

      ///Трендовый показатель хозяева

      const trendIndicatorHome = stabilizerHome / A19;
      // ////

      // ///Трендовый показатель гости
      const trendIndicatorAway = stabilizerAway / A18;

      // /////// Якорный показатель хозяева
      const anchorValueHome =
        (trendIndicatorHome / efficiencyLeagAway) * indicatorHome;

      // /////Якорный показатель гости
      const anchorValueAway =
        (trendIndicatorAway / efficiencyLeagHome) * indicatorAway;

      return {
        individTotalHomeGoal,
        individTotalAwayGoal,
        individeTotalBlockedShotsHome,
        individeTotalBlockedShotsAway,
        indicatorHome,
        indicatorAway,
        stabilizerHome,
        stabilizerAway,
        trendIndicatorHome,
        trendIndicatorAway,
        anchorValueHome,
        anchorValueAway,
        individfollsHome,
        individfollsAway,
        individTotalYellowCardHome,
        individTotalYellowCardAway,
        individOfsidersHome,
        individOfsidersAway,
        individTotalHome,
        individTotalAway,
        cornerIndividTotalHome,
        cornerIndividTotalAway,
        individTotalHomeThrow,
        individTotalAwayThrow,
        twiMinutsIndividTotalHome,
        twoMinutsIndividTotalAway,
      };
    }
  }

  const statsAll = calculateAllStats();
  const firstTime = calculateStats("1-й тайм");
  const secondTime = calculateStats("2-й тайм");
  const firstPeriod = calculateStats("1-й период");
  const secondPeriod = calculateStats("2-й период");
  const thirdPeriod = calculateStats("3-й период");

  function getDateFromTimeStamp() {
    const time = currentMatch?.START_TIME;
    const milleSeconds = time * 1000;
    const datteObject = new Date(milleSeconds);
    const hour = datteObject.toLocaleString("en-UK", { hour: "numeric" });
    const minute = datteObject.toLocaleString("en-UK", { minute: "numeric" });
    const day = datteObject.toLocaleString("en-UK", { day: "numeric" });
    const month = datteObject.toLocaleString("ru-RU", { month: "long" });
    const date = {
      hour: hour,
      minute: minute,
      day: day,
      month: month,
    };
    return date;
  }

  async function getCurrentMatch(id) {
    const response = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/data",
      {
        params: { event_id: id, locale: "ru_RU" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    setCurrentMatch(response.data.DATA.EVENT);
    setTournament(response.data.DATA.TOURNAMENT);
  }

  async function getPrevMatches(currentMatch) {
    const response = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/h2h",
      {
        params: { event_id: currentMatch?.EVENT_ID, locale: "ru_RU" },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    setPreviosMatchHome(
      response.data.DATA[0]?.GROUPS[0].ITEMS.filter(
        (item) => item.EVENT_NAME === tournament.NAME_PART_2
      )
    );
    setPreviosMatchAway(
      response.data.DATA[0]?.GROUPS[1].ITEMS.filter(
        (item) => item.EVENT_NAME === tournament.NAME_PART_2
      )
    );
  }

  // )

  async function getStatsHome(previosMatchHome) {
    const response1 = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
      {
        params: {
          locale: "ru_RU",
          event_id: previosMatchHome[0]?.EVENT_ID,
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    const firstMatch = response1.data.DATA;

    if (firstMatch) {
      const response2 = await axios.get(
        "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
        {
          params: {
            locale: "ru_RU",
            event_id: previosMatchHome[1]?.EVENT_ID,
          },
          headers: {
            "X-RapidAPI-Key":
              "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        }
      );
      const secondMatch = response2.data.DATA;

      if (secondMatch) {
        const response3 = await axios.get(
          "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
          {
            params: {
              locale: "ru_RU",
              event_id: previosMatchHome[2]?.EVENT_ID,
            },
            headers: {
              "X-RapidAPI-Key":
                "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
              "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
            },
          }
        );
        const thirdMatch = response3.data.DATA;
        if (thirdMatch) {
          const response4 = await axios.get(
            "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
            {
              params: {
                locale: "ru_RU",
                event_id: previosMatchHome[3]?.EVENT_ID,
              },
              headers: {
                "X-RapidAPI-Key":
                  "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
              },
            }
          );
          const fouthMatch = response4.data.DATA;
          if (fouthMatch) {
            const response5 = await axios.get(
              "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
              {
                params: {
                  locale: "ru_RU",
                  event_id: previosMatchHome[4]?.EVENT_ID,
                },
                headers: {
                  "X-RapidAPI-Key":
                    "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                  "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
                },
              }
            );
            const fifthMatch = response5.data.DATA;
            if (fifthMatch) {
              const response6 = await axios.get(
                "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
                {
                  params: {
                    locale: "ru_RU",
                    event_id: previosMatchHome[5]?.EVENT_ID,
                  },
                  headers: {
                    "X-RapidAPI-Key":
                      "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                    "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
                  },
                }
              );
              const sixMatch = response6.data.DATA;
              const matches = firstMatch.concat(
                secondMatch.concat(
                  thirdMatch.concat(
                    fouthMatch.concat(fifthMatch.concat(sixMatch))
                  )
                )
              );
              setStatsForSixMatchesHome(matches);
            }
          }
        }
      }
    }
  }

  async function getStatsAway(previosMatchAway) {
    const response1 = await axios.get(
      "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
      {
        params: {
          locale: "ru_RU",
          event_id: previosMatchAway[0]?.EVENT_ID,
        },
        headers: {
          "X-RapidAPI-Key":
            "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
          "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
        },
      }
    );
    const firstMatch = response1.data.DATA;

    if (firstMatch) {
      const response2 = await axios.get(
        "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
        {
          params: {
            locale: "ru_RU",
            event_id: previosMatchAway[1]?.EVENT_ID,
          },
          headers: {
            "X-RapidAPI-Key":
              "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
            "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
          },
        }
      );
      const secondMatch = response2.data.DATA;

      if (secondMatch) {
        const response3 = await axios.get(
          "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
          {
            params: {
              locale: "ru_RU",
              event_id: previosMatchAway[2]?.EVENT_ID,
            },
            headers: {
              "X-RapidAPI-Key":
                "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
              "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
            },
          }
        );
        const thirdMatch = response3.data.DATA;
        if (thirdMatch) {
          const response4 = await axios.get(
            "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
            {
              params: {
                locale: "ru_RU",
                event_id: previosMatchAway[3]?.EVENT_ID,
              },
              headers: {
                "X-RapidAPI-Key":
                  "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
              },
            }
          );
          const fouthMatch = response4.data.DATA;
          if (fouthMatch) {
            const response5 = await axios.get(
              "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
              {
                params: {
                  locale: "ru_RU",
                  event_id: previosMatchAway[4]?.EVENT_ID,
                },
                headers: {
                  "X-RapidAPI-Key":
                    "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                  "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
                },
              }
            );
            const fifthMatch = response5.data.DATA;
            if (fifthMatch) {
              const response6 = await axios.get(
                "https://flashlive-sports.p.rapidapi.com/v1/events/statistics",
                {
                  params: {
                    locale: "ru_RU",
                    event_id: previosMatchAway[5]?.EVENT_ID,
                  },
                  headers: {
                    "X-RapidAPI-Key":
                      "08e003e353msh5f64ec3ee6ecbeep151a3bjsn2b8d2f5d4103",
                    "X-RapidAPI-Host": "flashlive-sports.p.rapidapi.com",
                  },
                }
              );
              const sixMatch = response6.data.DATA;
              const matches = firstMatch.concat(
                secondMatch.concat(
                  thirdMatch.concat(
                    fouthMatch.concat(fifthMatch.concat(sixMatch))
                  )
                )
              );
              setStatsForSixMatchesAway(matches);
            }
          }
        }
      }
    }
  }

  React.useEffect(() => {
    if (query.id && !currentMatch) {
      getCurrentMatch(query.id);
    }
    if (currentMatch) {
      getPrevMatches(currentMatch);
      getDateFromTimeStamp(previosMatchHome);
    }
  }, [query.id, currentMatch]);

  React.useEffect(() => {
    setTimeout(() => {
      if (previosMatchHome.length != 0) {
        getStatsHome(previosMatchHome);
      }
    }, 3000);
    setTimeout(() => {
      if (previosMatchAway.length != 0) {
        getStatsAway(previosMatchAway);
      }
    }, 5000);
  }, [previosMatchHome]);

  return {
    currentMatch,
    hour,
    minute,
    day,
    month,
    tournament,
    previosMatchHome,
    statsAll,
    firstTime,
    secondTime,
    firstPeriod,
    secondPeriod,
    thirdPeriod,
  };
}

export { useCalculateFormule };
// const goalForFourMatchesHost = 12;
// const goalForSixMatchesHost = 17;
// const middleForFourMAtchesHost = 3;
// const middleForSixMAtchesHost = 2.833333333;

// //Пропущенные
// const missedForFourMatchesHost = 10;
// const missedForSixMatchesHost = 18;
// const middleMissedForFourMatchesHost = 2.5;
// const middleMissedForSixMatchesHost = 3;

// //голы соперников хозяеев + удары в створ
// const goalsEnemyHost = [1, 4, 5, 0, 5, 3];
// const shotOnGoalsEnemyHost = [28, 38, 43, 34, 35, 27];

// //голы хозяев + удары в ствоgoalGuestgoalHost = [2, 3, 3, 4, 2, 3];
// const shotOnGoalHost = [20, 27, 31, 22, 28, 42];
// const goalHost = [2, 3, 3, 4, 2, 3];

// //Кол-во игр
// const countGameHost = 13;

// //Забито в лиге хозяев
// const goalInLeagueHost = 35;
// const missedInLeagueHost = 29;

// //Голы хозяев
// const goalsHost =
//   middleForFourMAtchesHost * 0.6 + middleForSixMAtchesHost * 0.4;
// //Пропущенные хозяев
// const missedHost =
//   middleMissedForFourMatchesHost * 0.6 + middleMissedForSixMatchesHost * 0.4;

// //Результативность лиги хозяева
// const resultLeagueHost = (goalForSixMatchesHost + missedForSixMatchesHost) / 6;
// //Средняя результативность лиги хозяева
// const middleResultLeagueHost = resultLeagueHost / 2;

// //среднее забитое в лиге хозяева
// const middleGoalInLeagueHost = goalInLeagueHost / countGameHost;
// //Среднее пропущенное в лиге хозяева
// const middleMissedInLeagueHost = missedInLeagueHost / countGameHost;

// //ценность забитого хозяева
// const valueGoalsHost = middleResultLeagueHost / middleGoalInLeagueHost;

// //ценность пропущенного хозяева
// const valueMissedHost = middleResultLeagueHost / middleMissedInLeagueHost;
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////////////
// //Гости
// //Голы
// const goalForFourMatchesGuest = 12;
// const goalForSixMatchesGuest = 23;
// const middleForFourMAtchesGuest = 3;
// const middleForSixMAtchesGuest = 3.833333333;
// //Пропущенные
// const missedForFourMatchesGuest = 10;
// const missedForSixMatchesGuest = 15;
// const middleMissedForFourMatches = 2.5;
// const middleMissedForSixMatches = 2.5;

// //голы соперников гостей + удары в створ
// const goalsEnemyGuest = [3, 2, 3, 2, 3, 2];
// const shotOnGoalsEnemyGuest = [36, 29, 31, 36, 29, 34];

// //голы гостей + удары в створ
// const goalGuest = [3, 1, 5, 3, 6, 5];
// const shotOnGoalGuest = [35, 43, 43, 21, 42, 31];

// //Кол-во игр
// const countGameGuest = 12;

// //Забито в лиге гости
// const goalInLeagueGuest = 41;
// const missedInLeagueGuest = 33;

// //Голы гости
// const goalsGuest =
//   middleForFourMAtchesGuest * 0.6 + middleForSixMAtchesGuest * 0.4;
// //Пропущенные гости
// const missedGuest =
//   middleMissedForFourMatches * 0.6 + middleMissedForSixMatches * 0.4;

// //Результативность лиги гости
// const resultLeagueGuest =
//   (goalForSixMatchesGuest + missedForSixMatchesGuest) / 6;
// //Средняя результативность лиги гости
// const middleResultLeagueGuest = resultLeagueGuest / 2;

// //среднее забитое в лиге гости
// const middleGoalInLeagueGuest = goalInLeagueGuest / countGameGuest;
// //Среднее пропущенное в лиге гости
// const middleMissedInLeagueGuest = missedInLeagueGuest / countGameGuest;

// //ценность забитого гости
// const valueGoalsGuest = middleResultLeagueGuest / middleGoalInLeagueGuest;

// //ценность пропущенного гости
// const valueMissedGuest = middleResultLeagueGuest / middleMissedInLeagueGuest;

// //Голы тотал
// //Тотал матча без травм
// const totalMatchWithoutInjuriesHost = goalsHost + missedHost;
// const totalMatchWithoutInjuriesGuest = goalsGuest + missedGuest;

// //Итоговый тотал
// const finallyTotal =
//   (totalMatchWithoutInjuriesHost + totalMatchWithoutInjuriesGuest) / 2;

// //Индивидуальный тотал хозяева
// const individTotalHost = (goalsHost + missedGuest) / 2;
// const individTotalGuest = (goalsGuest + missedHost) / 2;
// ///Броски хозяева(Блокированные удары+удары в створ)
// const totalShotsForFourMatches = 157;
// const totalShotsForSixMatches = 256;
// //Средние общие броски зозяева
// const middleTotalShotsForFourMatches = totalShotsForFourMatches / 4;
// const middleTotalShotsForSixMatches = totalShotsForSixMatches / 6;
// //Пропущенные броски
// const missedTotalShotsForFourMatches = 227;
// const missedTotalShotsForSixMatches = 321;
// //Средние пропущенные броски
// const middleMissedShotsForFourMatches = missedTotalShotsForFourMatches / 4;
// const middleMissedShotsForSixMatches = missedTotalShotsForSixMatches / 6;
// //Общие броски хозяева
// const totalShotsHost =
//   middleTotalShotsForFourMatches * 0.6 + middleTotalShotsForSixMatches * 0.4;
// //Общие пропущенные броски хозяева
// const totalMissedHost =
//   middleMissedShotsForFourMatches * 0.6 + middleMissedShotsForSixMatches * 0.4;

// ///Броски гости(Блокированные удары+удары в створ)
// const totalShotsForFourMatchesGuest = 215;
// const totalShotsForSixMatchesGuest = 326;
// //Средние общие броски гости
// const middleTotalShotsForFourMatchesGuest = totalShotsForFourMatchesGuest / 4;
// const middleTotalShotsForSixMatchesGuest = totalShotsForSixMatchesGuest / 6;
// //Пропущенные броски
// const missedTotalShotsForFourMatchesGuest = 186;
// const missedTotalShotsForSixMatchesGuest = 276;
// //Средние пропущенные броски
// const middleMissedShotsForFourMatchesGuest =
//   missedTotalShotsForFourMatchesGuest / 4;
// const middleMissedShotsForSixMatchesGuest =
//   missedTotalShotsForSixMatchesGuest / 6;
// //Общие броски гости
// const totalShotsGuest =
//   middleTotalShotsForFourMatchesGuest * 0.6 +
//   middleTotalShotsForSixMatchesGuest * 0.4;
// //Общие пропущенные броски гости
// const totalMissedGuest =
//   middleMissedShotsForFourMatchesGuest * 0.6 +
//   middleMissedShotsForSixMatchesGuest * 0.4;

// //Броски тотал
// const individtotalShotsHost = (totalShotsHost + totalMissedGuest) / 2;
// const individtotalShotsGuest = (totalMissedHost + totalShotsGuest) / 2;

// //Удары в створ хозяева
// const shotsOnGoalHostFourMatches = 100;
// const shotsOnGoalHostSixMatches = 170;
// //Средние удары в створ хоз
// const middleShotsOnGoalHostFourMatches = shotsOnGoalHostFourMatches / 4;
// const middleShotsOnGoalHostSixMatches = shotsOnGoalHostSixMatches / 6;
// //Пропущенные удары в створ
// const missedShotsOnGoalHostFourMatches = 143;
// const missedShotsOnGoalHostSixMatches = 205;
// //Средние пропущенные удары в створ хоз
// const missedMiddleShotsOnGoalHostFourMatches =
//   missedShotsOnGoalHostFourMatches / 4;
// const missedMiddleShotsOnGoalHostSixMatches =
//   missedShotsOnGoalHostSixMatches / 6;
// //Удары в створ хозяева
// const shotsOnGoalHost =
//   middleShotsOnGoalHostFourMatches * 0.6 +
//   middleShotsOnGoalHostSixMatches * 0.4;
// //пропущенные удары в створ хозяева
// const missedOnGoalShotsHost =
//   missedMiddleShotsOnGoalHostFourMatches * 0.6 +
//   missedMiddleShotsOnGoalHostSixMatches * 0.4;

// //Удары в створ гости
// const shotsOnGoalGuestFourMatches = 142;
// const shotsOnGoalGuestSixMatches = 215;
// //Средние удары в створ гости
// const middleShotsOnGoalGuestFourMatches = shotsOnGoalGuestFourMatches / 4;
// const middleShotsOnGoalGuestSixMatches = shotsOnGoalGuestSixMatches / 6;
// //Пропущенные удары в створ
// const missedShotsOnGoalGuestFourMatches = 132;
// const missedShotsOnGoalGuestSixMatches = 195;
// //Средние пропущенные удары в створ гости
// const missedMiddleShotsOnGoalGuestFourMatches =
//   missedShotsOnGoalGuestFourMatches / 4;
// const missedMiddleShotsOnGoalGuestSixMatches =
//   missedShotsOnGoalGuestSixMatches / 6;
// //Удары в створ гости
// const shotsOnGoalGuest =
//   middleShotsOnGoalGuestFourMatches * 0.6 +
//   middleShotsOnGoalGuestSixMatches * 0.4;
// //пропущенные удары в створ гости
// const missedOnGoalShotsGuest =
//   missedMiddleShotsOnGoalGuestFourMatches * 0.6 +
//   missedMiddleShotsOnGoalGuestSixMatches * 0.4;

// //Удары в створ тотал
// const totalShotsOnGoalWithoutInjuryHost =
//   shotsOnGoalHost + missedOnGoalShotsHost;
// const totalShotsOnGoalWithoutInjuryGuest =
//   shotsOnGoalGuest + missedOnGoalShotsGuest;
// const summeryTotalShotsOnGoal =
//   (totalShotsOnGoalWithoutInjuryHost + totalShotsOnGoalWithoutInjuryGuest) / 2;

// //Индивидуальный тотал
// const individShotsOnGoalHost = (shotsOnGoalHost + missedOnGoalShotsGuest) / 2;
// const individShotsOnGoalGuest = (shotsOnGoalGuest + missedOnGoalShotsHost) / 2;
// //Ценность ударов в створ(Нападение)
// const valueShotsOnGoalHostAttack =
//   goalForSixMatchesHost / shotsOnGoalHostSixMatches;
// const valueShotsOnGoalGuestAttack =
//   goalForSixMatchesGuest / shotsOnGoalGuestSixMatches;
// //Ценность ударов в створ(Защита)
// const valueShotsOnGoalHostSave =
//   missedForSixMatchesHost / missedShotsOnGoalHostSixMatches;
// const valueShotsOnGoalGuestSave =
//   missedForSixMatchesGuest / missedShotsOnGoalGuestSixMatches;

// //средний процент отбития хозяева
// const battingAverageHost =
//   (goalsEnemyHost[0] / shotOnGoalsEnemyHost[0] +
//     goalsEnemyHost[1] / shotOnGoalsEnemyHost[1] +
//     goalsEnemyHost[2] / shotOnGoalsEnemyHost[2] +
//     goalsEnemyHost[3] / shotOnGoalsEnemyHost[3] +
//     goalsEnemyHost[4] / shotOnGoalsEnemyHost[4] +
//     goalsEnemyHost[5] / shotOnGoalsEnemyHost[5]) /
//   6;

// //средний процент отбития гости
// const battingAverageGuest =
//   (goalsEnemyGuest[0] / shotOnGoalsEnemyGuest[0] +
//     goalsEnemyGuest[1] / shotOnGoalsEnemyGuest[1] +
//     goalsEnemyGuest[2] / shotOnGoalsEnemyGuest[2] +
//     goalsEnemyGuest[3] / shotOnGoalsEnemyGuest[3] +
//     goalsEnemyGuest[4] / shotOnGoalsEnemyGuest[4] +
//     goalsEnemyGuest[5] / shotOnGoalsEnemyGuest[5]) /
//   6;

// //Процент забитых к вствор
// const fieldGoalPercentageHost =
//   (goalHost[0] / shotOnGoalHost[0] +
//     goalHost[1] / shotOnGoalHost[1] +
//     goalHost[2] / shotOnGoalHost[2] +
//     goalHost[3] / shotOnGoalHost[3] +
//     goalHost[4] / shotOnGoalHost[4] +
//     goalHost[5] / shotOnGoalHost[5]) /
//   6;

// //Процент забитых к вствор
// const fieldGoalPercentageGuest =
//   (goalGuest[0] / shotOnGoalGuest[0] +
//     goalGuest[1] / shotOnGoalGuest[1] +
//     goalGuest[2] / shotOnGoalGuest[2] +
//     goalGuest[3] / shotOnGoalGuest[3] +
//     goalGuest[4] / shotOnGoalGuest[4] +
//     goalGuest[5] / shotOnGoalGuest[5]) /
//   6;

// // Хозяева Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M27-название ячейки
// const M27 = middleTotalShotsForSixMatches / middleShotsOnGoalHostSixMatches;

// //Хозяева Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N27-название ячейки
// const N27 =
//   middleMissedShotsForSixMatches / missedMiddleShotsOnGoalHostSixMatches;

// //Гости Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M28-название ячейки
// const M28 =
//   middleTotalShotsForSixMatchesGuest / middleShotsOnGoalGuestSixMatches;

// //Гости Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N28-название ячейки
// const N28 =
//   middleMissedShotsForSixMatchesGuest / missedMiddleShotsOnGoalGuestSixMatches;

// //Хозяева D10
// const host = individtotalShotsHost / M27;
// //Гости
// const guest = individtotalShotsGuest / M28;

// //К соотношению атаки
// const toTheRatioOfAttackHost = host * valueShotsOnGoalHostAttack;
// const toTheRatioOfAttackGuest = guest * valueShotsOnGoalGuestAttack;

// //Среднее результативность в лиге/Среднее забитое за 6 матчей M4
// const M4host = middleResultLeagueHost / middleForSixMAtchesHost;

// //Среднее результативность в лиге/Среднее забитое за 6 матчей M5
// const M5guest = middleResultLeagueGuest / middleForSixMAtchesGuest;

// //ИТБ к ценности нападения
// const itbToTheValueOfTheAttackHost = individTotalHost / M4host;
// const itbToTheValueOfTheAttackGuest = individTotalGuest / M5guest;

// //F10=Индивидуальный тотал(удары, хозява)/N28
// const F10 = individtotalShotsHost / N28;
// //F11=Индивидуальный тотал(удары, гости)/N27
// const F11 = individtotalShotsGuest / N27;

// //Атака H13
// const attackHost = F10 * fieldGoalPercentageHost;
// //Атака H14
// const attackGuest = F11 * fieldGoalPercentageGuest;
// //Атака H13*Ценность удары в створ защита хоз
// const I13 = attackHost * valueShotsOnGoalGuestSave;
// //Атака H14*Ценность удары в створ защита гости
// const I14 = attackGuest * valueShotsOnGoalHostSave;

// //S4, S5 =Средняя результативность лиги/Среднее пропущенное за 6 матчей
// const S4host = middleResultLeagueGuest / middleMissedForSixMatchesHost;
// const S5guest = middleResultLeagueGuest / middleMissedForSixMatches;

// //К ценности защиты противника
// const valueOfTheEnemysDefenseHost = attackHost / S5guest;
// const valueOfTheEnemysDefenseGuest = attackGuest / S4host;

// //H8 ИТБ к ценности нападения/К ценности защиты противника
// const H8host = valueOfTheEnemysDefenseHost / itbToTheValueOfTheAttackHost;
// const H8guest = valueOfTheEnemysDefenseGuest / itbToTheValueOfTheAttackGuest;

// //Тренд
// const trandHost = toTheRatioOfAttackHost / H8host;
// const trandGuest = toTheRatioOfAttackGuest / H8guest;

// //B14 = B18/S16(индивидуальный тотал)

// //E15 =Индивидуальный тотал ГОЛЫ ХОЗЯЕВА/M4
// const E15host = individTotalHost / M4host;
// const E16guest = individTotalGuest / M5guest;

// //F15
// const F15host = toTheRatioOfAttackHost / S5guest;
// const F16guest = toTheRatioOfAttackGuest / S4host;

// //D15/D16
// const D15host = E15host / F15host;
// const D16guest = E16guest / F16guest;

// //H16 =Индивидуальный тотал голы хозяева /s5
// const h16 = individTotalHost / S5guest;
// const h15 = individTotalGuest / S4host;

// //i16 =k14/m5 k14=j19*m14 j19=z9/n27 m14 =t2/t21

// const J19 = individtotalShotsGuest / N27;
// const m14 =
//   middleMissedForSixMatchesHost / missedMiddleShotsOnGoalHostSixMatches;

// //Пропустят хозяева
// const k14 = J19 * m14;

// //i16
// const i16 = k14 / M5guest;

// const H16 = individTotalHost / S5guest;

// const g16 = H16 / i16;

// const c19 = D16guest / g16;

// //B15 = тренд /d15
// const B15 = trandHost * D15host;

// const B18 = B15 / c19;

// const A18 = B18 / individTotalHost;

// /////////
// const B13 = trandHost / A18; ////Показатель Хозяев
// /////////

// // B14=E14/A19 A19=B19/s17 B19=B16/C18 B16 = E14*D16

// const B16 = trandGuest * D16guest;

// //C18 = D15/g15 G15=H15/i15 h15 = s17/s4 i15 = k15/m4 k15 =j18*m15 J18 =z8/n28 m15 = t3/t22

// const m15 = middleMissedForSixMatches / missedMiddleShotsOnGoalGuestSixMatches;

// const J18 = individtotalShotsHost / N28;

// const K15 = J18 * m15;

// const I15 = K15 / M4host;

// const G15 = h15 / I15;

// const C18 = D15host / G15;

// const B19 = B16 / C18;

// const A19 = B19 / individTotalGuest;

// ////
// const B14 = trandGuest / A19; ///Показатель гости
// ////
// //стабилизатор хозяева
// //f13=e13*c13 c13 = l18/e13 l18=k15/j11 j11 =l10/k11 l10=h10/m4

// const h10 = F10 * battingAverageGuest;

// const l10 = h10 / M4host;

// const k11 = attackHost / S5guest;

// const j11 = l10 / k11;

// const l18 = K15 / j11;

// const c13 = l18 / trandHost;

// ////////
// const f13 = trandHost * c13; /////Стабилизатор Хозяева
// ////////

// ////
// //const f14=E14*C14, c14=l17/e14 l17=k14/j10 j10=l11/k10

// const h11 = F11 * battingAverageHost;

// const l11 = h11 / M5guest;

// const k10 = attackGuest / S4host;

// const j10 = l11 / k10;

// const l17 = k14 / j10;

// const c14 = l17 / trandGuest;

// ///////
// const f14 = trandGuest * c14; /////Стабилизатор гости
// //////

// ///Трендовый показатель хозяева

// const c43 = f13 / A19;
// ////

// ///Трендовый показатель гости

// const c44 = f14 / A18;

// /////// Якорный показатель хозяева
// const e43 = (c43 / resultLeagueGuest) * B13;

// /////Якорный показатель гости
// const e44 = (c44 / resultLeagueHost) * B14;

// function IndicatorHosts() {
//   return trandHost / A18;
// }

// function IndicatorGuest() {
//   return trandGuest / A19;
// }

// function stabilizerHost() {
//   return trandHost * c13;
// }

// function stabilizerGuest() {
//   return trandGuest * c14;
// }

// function anchorIndicatorHost() {
//   return (c43 / resultLeagueGuest) * B13;
// }

// function anchorIndicatorGuest() {
//   return (c44 / resultLeagueHost) * B14;
// }

// export {
//   IndicatorHosts,
//   IndicatorGuest,
//   stabilizerHost,
//   stabilizerGuest,
//   anchorIndicatorHost,
//   anchorIndicatorGuest,
// };
