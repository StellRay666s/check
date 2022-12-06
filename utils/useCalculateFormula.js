//Хозяева
//Голы
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

function useCalculateFormule() {
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
        return sum + Number(match.HOME_SCORE_FULL);
      }, 0);
      const goalsInTheLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match.AWAY_SCORE_FULL);
      }, 0);

      const middleGoalInLeagHome = goalsInTheLeagHome / countGameHome;
      const middleGoalInLeagAway = goalsInTheLeagAway / countGameAway;

      //Пропущено в лиге
      const missedInLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match.AWAY_SCORE_FULL);
      }, 0);
      const missedInLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match.HOME_SCORE_FULL);
      }, 0);

      const middleMissInLeagHome = missedInLeagHome / countGameHome;
      const middleMissInLeagAway = missedInLeagAway / countGameAway;

      //Забито за 4 матча
      const goalsForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match.HOME_SCORE_FULL);
        }, 0);

      const goalsForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForFourMatchesHome = goalsForFourMatchHome / 4;
      const middleGoalForFourMatchesAway = goalsForFourMatchAway / 4;

      //Забито за 6 матчей
      const goalsForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match.HOME_SCORE_FULL);
        }, 0);

      const goalsForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match.AWAY_SCORE_FULL);
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
          return sum + Number(match.AWAY_SCORE_FULL);
        }, 0);

      const misedForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForFourMatcesHome = misedForFourMatchHome / 4;
      const middleMissedForFourMatcesAway = misedForFourMatchAway / 4;

      //Пропущено за 6 матчей
      const misedForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match.AWAY_SCORE_FULL);
        }, 0);

      const misedForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match.HOME_SCORE_FULL);
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

      const cornerShotsHomeForFourMatches = cornerShotsHome
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const cornerShotsHomeForSixMatches = cornerShotsHome
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, cornerShotsHomeForFourMatches);

      const cornerShotsAwayForFourMatches = cornerShotsAway
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const cornerShotsAwayForSixMatches = cornerShotsAway
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, cornerShotsAwayForFourMatches);

      const missedCorneForFourMatchesHome = cornerShotsHome
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedCorneForSixMatchesHome = cornerShotsHome
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedCorneForFourMatchesHome);

      const missedCorneForFourMatchesAway = cornerShotsAway
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedCorneForSixMatchesAway = cornerShotsAway
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedCorneForFourMatchesAway);

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

      const ofsidesHomeFourMatch = ofsidesHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const ofsidesHomeSixMatch = ofsidesHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, ofsidesHomeFourMatch);

      const missedOffsidesHomeFourMatches = ofsidesHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedOfsidesHomeSixMatch = ofsidesHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedOffsidesHomeFourMatches);

      const ofsidesAwayFourMatches = ofsidesAway
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const ofsidesAwaySixMatches = ofsidesAway
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, ofsidesAwayFourMatches);

      const missedOfsidersAwayFour = ofsidesAway
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedOfsidersAwaySix = ofsidesAway
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedOfsidersAwayFour);

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

      const follsHomeFourMatch = follsHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const follsHomeSixMatch = follsHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, follsHomeFourMatch);

      const missedFollsHomeFourMatches = follsHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedFollsHomeSixMatch = follsHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedFollsHomeFourMatches);

      const follsAwayFourMatches = follsAway.slice(0, 8).reduce((sum, obj) => {
        return sum + Number(obj?.VALUE_AWAY);
      }, 0);

      const follsAwaySixMatches = follsAway.slice(8, 12).reduce((sum, obj) => {
        return sum + Number(obj?.VALUE_AWAY);
      }, follsAwayFourMatches);

      const missedFollsAwayFour = follsAway.slice(0, 8).reduce((sum, obj) => {
        return sum + Number(obj?.VALUE_HOME);
      }, 0);

      const missedFollsAwaySix = follsAway.slice(8, 12).reduce((sum, obj) => {
        return sum + Number(obj?.VALUE_HOME);
      }, missedFollsAwayFour);

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

      const yellowCardHomeFourMatch = yellowCardHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const yellowCardHomeSixMatch = yellowCardHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, yellowCardHomeFourMatch);

      const enemyYellowCardHomeFour = yellowCardHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const enemyYellowCardHomeSix = yellowCardHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, enemyYellowCardHomeFour);

      const yellowCardAwayFourMatch = yellowCardAway
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const yellowCardAwaySixMatch = yellowCardAway
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, yellowCardAwayFourMatch);

      const yellowCardAwayFourMatchEnemy = yellowCardAway
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const yellowCardAwaySixMatchEnemy = yellowCardAway
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, yellowCardAwayFourMatchEnemy);

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

      const shotsOnTargetHomeForFourMatch = shotsOnTargetHome
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const shotsOnTargetHomeForSixMatches = shotsOnTargetHome
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, shotsOnTargetHomeForFourMatch);

      const shotsOnTargetMissedHomeForFourMatch = shotsOnTargetHome
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const shotsOnTargeMissedtHomeForSixMatches = shotsOnTargetHome
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, shotsOnTargetMissedHomeForFourMatch);

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

      const shotsOnTargetAwayForFourMatch = shotsOnTargetAway
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const shotsOnTargetAwayForSixMatches = shotsOnTargetAway
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, shotsOnTargetAwayForFourMatch);

      const shotsOnTargetMissedAwayForFourMatch = shotsOnTargetAway
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const shotsOnTargeMissedtAwayForSixMatches = shotsOnTargetAway
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, shotsOnTargetMissedAwayForFourMatch);

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

      const blockedShotsForFourMatchAway = blockedShotsAway
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const blockedShotsForSixMatchAway = blockedShotsAway
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, blockedShotsForFourMatchAway);

      const missedBlockedShotsForFourMatchAway = blockedShotsAway
        .slice(0, 4)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedBlockedShotsForSixMatchAway = blockedShotsAway
        .slice(4, 6)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedBlockedShotsForFourMatchAway);

      const blockedShotsHome = statsForPeriodsHome.map(
        (item) =>
          item.ITEMS.filter(
            (item) => item.INCIDENT_NAME === "Блок-но ударов"
          )?.[0]
      );

      const blockedShotsForFourMatch = blockedShotsHome
        .slice(0, 4)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const blockedShotsForSixMatch = blockedShotsHome
        .slice(4, 6)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, blockedShotsForFourMatch);

      const missedBlockedShotsForFourMatchHome = blockedShotsHome
        .slice(0, 4)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedBlockedShotsForSixMatchHome = blockedShotsHome
        .slice(4, 6)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedBlockedShotsForFourMatchHome);

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
        .map((item) => item.HOME_SCORE_FULL);

      const prevGoalsEnemyHome = previosMatchHome
        .slice(0, 6)
        .map((item) => item.AWAY_SCORE_FULL);

      const prevGoalsAway = previosMatchAway
        .slice(0, 6)
        .map((item) => item.AWAY_SCORE_FULL);

      const prevGoalsEnemyAway = previosMatchAway
        .slice(0, 6)
        .map((item) => item.HOME_SCORE_FULL);

      function passRateCalc(b, c) {
        const a = b / c;
        return isNaN(a) ? 0 : a || isFinite(a) ? a : 0;
      }

      const firstMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[0]),
        Number(shotsOnTargetHome?.[0]?.VALUE_HOME)
      );

      const secondMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[1]),
        Number(shotsOnTargetHome?.[1]?.VALUE_HOME)
      );

      const thirdMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[2]),
        Number(shotsOnTargetHome?.[2]?.VALUE_HOME)
      );

      const fouthMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[3]),
        Number(shotsOnTargetHome?.[3]?.VALUE_HOME)
      );

      const fivesMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[4]),
        Number(shotsOnTargetHome?.[4]?.VALUE_HOME)
      );

      const sixMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[5]),
        Number(shotsOnTargetHome?.[5]?.VALUE_HOME)
      );

      const firstMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[0]),
        Number(shotsOnTargetAway?.[0]?.VALUE_AWAY)
      );

      const secondMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[1]),
        Number(shotsOnTargetAway?.[1]?.VALUE_AWAY)
      );

      const thirdMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[2]),
        Number(shotsOnTargetAway?.[2]?.VALUE_AWAY)
      );

      const fouthMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[3]),
        Number(shotsOnTargetAway?.[3]?.VALUE_AWAY)
      );

      const fivesMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[4]),
        Number(shotsOnTargetAway?.[4]?.VALUE_AWAY)
      );

      const sixMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[5]),
        Number(shotsOnTargetAway?.[5]?.VALUE_AWAY)
      );
      const passRateHome = checkIsNanAndFinint(
        (firstMatchPassRateHome +
          secondMatchPassRateHome +
          thirdMatchPassRateHome +
          fouthMatchPassRateHome +
          fivesMatchPassRateHome +
          sixMatchPassRateHome) /
          6
      );

      const passRateAway = checkIsNanAndFinint(
        (firstMatchPassRateAway +
          secondMatchPassRateAway +
          thirdMatchPassRateAway +
          fouthMatchPassRateAway +
          fivesMatchPassRateAway +
          sixMatchPassRateAway) /
          6
      );

      const firstMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[0]),
        Number(shotsOnTargetHome?.[0]?.VALUE_AWAY)
      );

      const secondMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[1]),
        Number(shotsOnTargetHome?.[1]?.VALUE_AWAY)
      );

      const thirdMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[2]),
        Number(shotsOnTargetHome?.[2]?.VALUE_AWAY)
      );

      const fouthMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[3]),
        Number(shotsOnTargetHome?.[3]?.VALUE_AWAY)
      );

      const fivesMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[4]),
        Number(shotsOnTargetHome?.[4]?.VALUE_AWAY)
      );

      const sixMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[5]),
        Number(shotsOnTargetHome?.[5]?.VALUE_AWAY)
      );

      const firstMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[0]),
        Number(shotsOnTargetAway?.[0]?.VALUE_HOME)
      );

      const secondMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[1]),
        Number(shotsOnTargetAway?.[1]?.VALUE_HOME)
      );

      const thirdMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[2]),
        Number(shotsOnTargetAway?.[2]?.VALUE_HOME)
      );

      const fouthMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[3]),
        Number(shotsOnTargetAway?.[3]?.VALUE_HOME)
      );

      const fivesMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[4]),
        Number(shotsOnTargetAway?.[4]?.VALUE_HOME)
      );

      const sixMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[5]),
        Number(shotsOnTargetAway?.[5]?.VALUE_HOME)
      );

      const missedRateHome = checkIsNanAndFinint(
        (firstMatchPassRateHomeEnemy +
          secondMatchPassRateHomeEnemy +
          thirdMatchPassRateHomeEnemy +
          fouthMatchPassRateHomeEnemy +
          fivesMatchPassRateHomeEnemy +
          sixMatchPassRateHomeEnemy) /
          6
      );

      const missedRateAway = checkIsNanAndFinint(
        (firstMatchPassRateAwayEnemy +
          secondMatchPassRateAwayEnemy +
          thirdMatchPassRateAwayEnemy +
          fouthMatchPassRateAwayEnemy +
          fivesMatchPassRateAwayEnemy +
          sixMatchPassRateAwayEnemy) /
          6
      );

      //За все периоды
      // Ценность удары в створ НАПАДЕНИЕ
      const shotToGoalRatioAttackHome = checkIsNanAndFinint(
        goalsForSixMatchHome / shotsOnTargetHomeForSixMatches
      );

      console.log(missedRateHome);
      const shotToGoalRatioAttackAway = checkIsNanAndFinint(
        goalsForSixMatchAway / shotsOnTargetAwayForSixMatches
      );

      //Ценность удары в створ ЗАЩИТА
      const shotToGoalRatioSafeHome = checkIsNanAndFinint(
        misedForSixMatchHome / shotsOnTargeMissedtHomeForSixMatches
      );

      const shotToGoalRatioSafeAway = checkIsNanAndFinint(
        misedForSixMatchAway / shotsOnTargeMissedtAwayForSixMatches
      );

      // Хозяева Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M27-название ячейки
      const M27 = checkIsNanAndFinint(
        middleThrowSixMatchesHome / middleShotsOnTargetHomeForSixMatch
      );

      //Хозяева Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N27-название ячейки
      const N27 = checkIsNanAndFinint(
        middleMissedThrowHomeSixMatches / middleMissedShotsOnTargetForSixMatches
      );
      // //Гости Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M28-название

      const M28 = checkIsNanAndFinint(
        middleThrowSixMatchesAway / middleShotsOnTargetAwayForSixMatch
      );

      //Гости Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N28-название ячейки
      const N28 = checkIsNanAndFinint(
        middleMissedThrowAwaySixMatches /
          middleMissedShotsOnTargetForSixMatchesAway
      );

      //Хозяева D10
      const host = checkIsNanAndFinint(individTotalHomeThrow / M27);

      // //Гости
      const guest = checkIsNanAndFinint(individTotalAwayThrow / M28);

      // //К соотношению атаки
      const toTheRatioOfAttackHost = host * shotToGoalRatioAttackHome;
      const toTheRatioOfAttackGuest = guest * shotToGoalRatioAttackAway;

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M4
      const M4host = checkIsNanAndFinint(
        middleEfficiencyLeagHome / middleGoalForSixMatchesHome
      );

      // //Среднее результативность в лиге/Среднее забитое за 6 матчей M5
      const M5guest = checkIsNanAndFinint(
        middleEfficiencyLeagAway / middleGoalForSixMatchesAway
      );

      // //ИТБ к ценности нападения
      const itbToTheValueOfTheAttackHost = checkIsNanAndFinint(
        individTotalHomeGoal / M4host
      );
      const itbToTheValueOfTheAttackGuest = checkIsNanAndFinint(
        individTotalAwayGoal / M5guest
      );

      // //F10=Индивидуальный тотал(удары, хозява)/N28
      const F10 = checkIsNanAndFinint(individTotalHomeThrow / N28);
      // //F11=Индивидуальный тотал(удары, гости)/N27
      const F11 = checkIsNanAndFinint(individTotalAwayThrow / N27);

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
        middleEfficiencyLeagAway / middleMissedForSixMatcesHome
      );
      const S5guest = checkIsNanAndFinint(
        middleEfficiencyLeagAway / middleMissedForSixMatcesAway
      );

      // //К ценности защиты противника
      const valueOfTheEnemysDefenseHost = checkIsNanAndFinint(
        attackHost / S5guest
      );
      const valueOfTheEnemysDefenseGuest = checkIsNanAndFinint(
        attackGuest / S4host
      );

      // //H8 ИТБ к ценности нападения/К ценности защиты противника
      const H8host = checkIsNanAndFinint(
        valueOfTheEnemysDefenseHost / itbToTheValueOfTheAttackHost
      );
      const H8guest = checkIsNanAndFinint(
        valueOfTheEnemysDefenseGuest / itbToTheValueOfTheAttackGuest
      );

      // //Тренд
      const trandHost = checkIsNanAndFinint(toTheRatioOfAttackHost / H8host);
      const trandGuest = checkIsNanAndFinint(toTheRatioOfAttackGuest / H8guest);

      // //E15 =Индивидуальный тотал ГОЛЫ ХОЗЯЕВА/M4
      const E15host = checkIsNanAndFinint(individTotalHomeGoal / M4host);
      const E16guest = checkIsNanAndFinint(individTotalAwayGoal / M5guest);

      // //F15
      const F15host = checkIsNanAndFinint(toTheRatioOfAttackHost / S5guest);
      const F16guest = checkIsNanAndFinint(toTheRatioOfAttackGuest / S4host);

      // //D15/D16
      const D15host = checkIsNanAndFinint(E15host / F15host);

      const D16guest = checkIsNanAndFinint(E16guest / F16guest);

      // //H16 =Индивидуальный тотал голы хозяева /s5
      const h16 = checkIsNanAndFinint(individTotalHomeGoal / S5guest);

      const h15 = checkIsNanAndFinint(individTotalAwayGoal / S4host);

      const J19 = checkIsNanAndFinint(individTotalAwayThrow / N27);

      const m14 = checkIsNanAndFinint(
        middleMissedForSixMatcesHome / middleMissedShotsOnTargetForSixMatches
      );

      // //Пропустят хозяева
      const k14 = J19 * m14;

      const i16 = checkIsNanAndFinint(k14 / M5guest);

      const H16 = checkIsNanAndFinint(individTotalHomeGoal / S5guest);

      const g16 = checkIsNanAndFinint(H16 / i16);

      const c19 = checkIsNanAndFinint(D16guest / g16);

      // //B15 = тренд /d15
      const B15 = trandHost * D15host;

      const B18 = checkIsNanAndFinint(B15 / c19);

      const A18 = checkIsNanAndFinint(B18 / individTotalHomeGoal);

      // //Показаьель хозяева
      const indicatorHome = checkIsNanAndFinint(trandHost / A18);

      const B16 = trandGuest * D16guest;

      const m15 = checkIsNanAndFinint(
        middleMissedForSixMatcesAway /
          middleMissedShotsOnTargetForSixMatchesAway
      );

      const J18 = checkIsNanAndFinint(individTotalHomeThrow / N28);

      const K15 = J18 * m15;

      const I15 = checkIsNanAndFinint(K15 / M4host);

      const G15 = checkIsNanAndFinint(h15 / I15);

      const C18 = checkIsNanAndFinint(D15host / G15);

      const B19 = checkIsNanAndFinint(B16 / C18);

      const A19 = checkIsNanAndFinint(B19 / individTotalAwayGoal);

      const indicatorAway = checkIsNanAndFinint(trandGuest / A19); ///Показатель гости
      const h10 = F10 * missedRateAway;

      const l10 = checkIsNanAndFinint(h10 / M4host);

      const k11 = checkIsNanAndFinint(attackHost / S5guest);

      const j11 = checkIsNanAndFinint(l10 / k11);

      const l18 = checkIsNanAndFinint(K15 / j11);

      const c13 = checkIsNanAndFinint(l18 / trandHost);

      // ////////
      const stabilizerHome = trandHost * c13; /////Стабилизатор Хозяева
      // ////////

      const h11 = F11 * missedRateHome;

      const l11 = checkIsNanAndFinint(h11 / M5guest);

      const k10 = checkIsNanAndFinint(attackGuest / S4host);

      const j10 = checkIsNanAndFinint(l11 / k10);

      const l17 = checkIsNanAndFinint(k14 / j10);

      const c14 = checkIsNanAndFinint(l17 / trandGuest);

      // ///////
      const stabilizerAway = trandGuest * c14; /////Стабилизатор гости
      // //////

      ///Трендовый показатель хозяева

      const trendIndicatorHome = checkIsNanAndFinint(stabilizerHome, A19);
      // ////

      function checkIsNanAndFinint(a, b) {
        const d = a / b;
        return isNaN(d) ? 0 : d || isFinite(d) ? d : 0;
      }

      // ///Трендовый показатель гости
      const trendIndicatorAway = isNaN(stabilizerAway / A18)
        ? 0
        : stabilizerAway / A18 && isFinite(stabilizerAway / A18)
        ? 0
        : stabilizerAway / A18;

      // /////// Якорный показатель хозяева
      const anchorValueHome =
        (trendIndicatorHome / efficiencyLeagAway) * indicatorHome;

      // /////Якорный показатель гости
      const anchorValueAway =
        (trendIndicatorAway / efficiencyLeagHome) * indicatorAway;

      return {
        indicatorHome,
        indicatorAway,
        stabilizerHome,
        stabilizerAway,
        trendIndicatorHome,
        trendIndicatorAway,
        anchorValueHome,
        anchorValueAway,
        follsInjurieHome,
        follsInjuriesAway,
        totalFollsInjuries,
        totalYellowCardInjuries,
        injuriesYellowCardAway,
        injuriesYellowCardHome,
        offsidersInjurieHome,
        offsidersInjuriesAway,
        totalOfidersInjuriesHome,
        totalShotsOnTarget,
        totalInjuriesAway,
        totalInjuriesHome,
        cornerInjuriesHome,
        cornerInjuriesAway,
        cornerTotalInjuries,
        injuriesBlockedShotsHome,
        injuriesBlockedShotsAway,
        totalShotsBlocked,
        twoMinutsRemoveTotalInjuries,
        twoMinutsRemoveInjuriesAway,
        twoMinutsRemoveInjuriesHome,
      };
    }
  }

  function calculateAllStats(period) {
    if (currentMatch) {
      const countGameHome = previosMatchHome.length;
      const countGameAway = previosMatchAway.length;

      //Забито в лиге
      const goalsInTheLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.HOME_SCORE_FULL);
      }, 0);
      const goalsInTheLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.AWAY_SCORE_FULL);
      }, 0);

      const middleGoalInLeagHome = goalsInTheLeagHome / countGameHome;
      const middleGoalInLeagAway = goalsInTheLeagAway / countGameAway;

      //Пропущено в лиге
      const missedInLeagHome = previosMatchHome.reduce((sum, match) => {
        return sum + Number(match?.AWAY_SCORE_FULL);
      }, 0);
      const missedInLeagAway = previosMatchAway.reduce((sum, match) => {
        return sum + Number(match?.HOME_SCORE_FULL);
      }, 0);
      const middleMissInLeagHome = missedInLeagHome / countGameHome;
      const middleMissInLeagAway = missedInLeagAway / countGameAway;

      //Забито за 4 матча
      const goalsForFourMatchHome = previosMatchHome
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match?.HOME_SCORE_FULL);
        }, 0);

      const goalsForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match?.AWAY_SCORE_FULL);
        }, 0);

      const middleGoalForFourMatchesHome = goalsForFourMatchHome / 4;
      const middleGoalForFourMatchesAway = goalsForFourMatchAway / 4;

      //Забито за 6 матчей
      const goalsForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match?.HOME_SCORE_FULL);
        }, 0);

      const goalsForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match?.AWAY_SCORE_FULL);
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
          return sum + Number(match?.AWAY_SCORE_FULL);
        }, 0);

      const misedForFourMatchAway = previosMatchAway
        .slice(0, 4)
        .reduce((sum, match) => {
          return sum + Number(match?.HOME_SCORE_FULL);
        }, 0);

      const middleMissedForFourMatcesHome = misedForFourMatchHome / 4;
      const middleMissedForFourMatcesAway = misedForFourMatchAway / 4;

      //Пропущено за 6 матчей
      const misedForSixMatchHome = previosMatchHome
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match?.AWAY_SCORE_FULL);
        }, 0);

      const misedForSixMatchAway = previosMatchAway
        .slice(0, 6)
        .reduce((sum, match) => {
          return sum + Number(match?.HOME_SCORE_FULL);
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

      const shotsOnTargetHomeForFourMatch =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetHome.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetHome.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);

      const shotsOnTargetHomeForSixMatches =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetHome.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, shotsOnTargetHomeForFourMatch)
          : shotsOnTargetHome.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, shotsOnTargetHomeForFourMatch);

      const shotsOnTargetMissedHomeForFourMatch =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetHome.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetHome.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);

      const shotsOnTargeMissedtHomeForSixMatches =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetHome.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, shotsOnTargetMissedHomeForFourMatch)
          : shotsOnTargetHome.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, shotsOnTargetMissedHomeForFourMatch);

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

      const shotsOnTargetAwayForFourMatch =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetAway.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : shotsOnTargetAway.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);

      const shotsOnTargetAwayForSixMatches =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetAway.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, shotsOnTargetAwayForFourMatch)
          : shotsOnTargetAway.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, shotsOnTargetAwayForFourMatch);

      const shotsOnTargetMissedAwayForFourMatch =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetAway.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : shotsOnTargetAway.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);

      const shotsOnTargeMissedtAwayForSixMatches =
        tournament.NAME === "США: НХЛ"
          ? shotsOnTargetAway.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, shotsOnTargetMissedAwayForFourMatch)
          : shotsOnTargetAway.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, shotsOnTargetMissedAwayForFourMatch);

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

      const blockedShotsForFourMatch =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsHome.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsHome.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);

      const blockedShotsForSixMatch =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsHome.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, blockedShotsForFourMatch)
          : blockedShotsHome.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, blockedShotsForFourMatch);

      const missedBlockedShotsForFourMatchHome =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsHome.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsHome.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);

      const missedBlockedShotsForSixMatchHome =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsHome.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, missedBlockedShotsForFourMatchHome)
          : blockedShotsHome.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, missedBlockedShotsForFourMatchHome);

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

      const cornerShotsHomeForFourMatches = cornerShotsHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const cornerShotsHomeForSixMatches = cornerShotsHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, cornerShotsHomeForFourMatches);

      const cornerShotsAwayForFourMatches = cornerShotsAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const cornerShotsAwayForSixMatches = cornerShotsAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, cornerShotsAwayForFourMatches);

      const missedCorneForFourMatchesHome = cornerShotsHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedCorneForSixMatchesHome = cornerShotsHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedCorneForFourMatchesHome);

      const missedCorneForFourMatchesAway = cornerShotsAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedCorneForSixMatchesAway = cornerShotsAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedCorneForFourMatchesAway);

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

      const ofsidesHomeFourMatch = ofsidesHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const ofsidesHomeSixMatch = ofsidesHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, ofsidesHomeFourMatch);

      const missedOffsidesHomeFourMatches = ofsidesHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedOfsidesHomeSixMatch = ofsidesHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedOffsidesHomeFourMatches);

      const ofsidesAwayFourMatches = ofsidesAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const ofsidesAwaySixMatches = ofsidesAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, ofsidesAwayFourMatches);

      const missedOfsidersAwayFour = ofsidesAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedOfsidersAwaySix = ofsidesAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedOfsidersAwayFour);

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

      const follsHomeFourMatch = follsHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const follsHomeSixMatch = follsHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, follsHomeFourMatch);

      const missedFollsHomeFourMatches = follsHome
        .slice(0, 8)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const missedFollsHomeSixMatch = follsHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, missedFollsHomeFourMatches);

      const follsAwayFourMatches = follsAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const follsAwaySixMatches = follsAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, follsAwayFourMatches);

      const missedFollsAwayFour = follsAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const missedFollsAwaySix = follsAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, missedFollsAwayFour);

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

      const yellowCardHomeFourMatch = yellowCardHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const yellowCardHomeSixMatch = yellowCardHome
        .slice(8, 12)
        .filter((item) => item !== undefined)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, yellowCardHomeFourMatch);

      const enemyYellowCardHomeFour = yellowCardHome
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const enemyYellowCardHomeSix = yellowCardHome
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, enemyYellowCardHomeFour);

      const yellowCardAwayFourMatch = yellowCardAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, 0);

      const yellowCardAwaySixMatch = yellowCardAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_AWAY);
        }, yellowCardAwayFourMatch);

      const yellowCardAwayFourMatchEnemy = yellowCardAway
        .filter((item) => item !== undefined)
        .slice(0, 8)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, 0);

      const yellowCardAwaySixMatchEnemy = yellowCardAway
        .filter((item) => item !== undefined)
        .slice(8, 12)
        .reduce((sum, obj) => {
          return sum + Number(obj?.VALUE_HOME);
        }, yellowCardAwayFourMatchEnemy);

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

      const blockedShotsForFourMatchAway =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsAway.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0)
          : blockedShotsAway.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, 0);

      const blockedShotsForSixMatchAway =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsAway.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, blockedShotsForFourMatchAway)
          : blockedShotsAway.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_AWAY);
            }, blockedShotsForFourMatchAway);

      const missedBlockedShotsForFourMatchAway =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsAway.slice(0, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0)
          : blockedShotsAway.slice(0, 8).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, 0);

      const missedBlockedShotsForSixMatchAway =
        tournament.NAME === "США: НХЛ"
          ? blockedShotsAway.slice(12, 18).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, missedBlockedShotsForFourMatchAway)
          : blockedShotsAway.slice(8, 12).reduce((sum, obj) => {
              return sum + Number(obj?.VALUE_HOME);
            }, missedBlockedShotsForFourMatchAway);

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
        .map((item) => item?.HOME_SCORE_FULL);

      const prevGoalsEnemyHome = previosMatchHome
        .slice(0, 6)
        .map((item) => item?.AWAY_SCORE_FULL);

      const prevGoalsAway = previosMatchAway
        .slice(0, 6)
        .map((item) => item?.AWAY_SCORE_FULL);

      const prevGoalsEnemyAway = previosMatchAway
        .slice(0, 6)
        .map((item) => item?.HOME_SCORE_FULL);

      function passRateCalc(b, c) {
        const a = b / c;
        return isNaN(a) ? 0 : a || isFinite(a) ? a : 0;
      }

      const firstMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[0]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(0, 3).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(0, 2).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const secondMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[1]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? Number(
                shotsOnTargetHome.slice(3, 6).reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_HOME);
                }, 0)
              )
            : Number(
                shotsOnTargetHome.slice(2, 4).reduce((sum, obj) => {
                  return sum + Number(obj?.VALUE_HOME);
                }, 0)
              )
        )
      );

      const thirdMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[2]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(6, 9).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(4, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const fouthMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[3]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(9, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(6, 8).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const fivesMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[4]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(12, 15).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(8, 10).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const sixMatchPassRateHome = passRateCalc(
        Number(prevGoalsHome?.[5]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(15, 18).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetHome.slice(10, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const firstMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[0]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(0, 3).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(0, 2).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const secondMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[1]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(3, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(2, 4).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const thirdMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[2]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(6, 9).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(4, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const fouthMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[3]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(9, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(6, 8).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const fivesMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[4]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(12, 15).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(8, 10).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const sixMatchPassRateAway = passRateCalc(
        Number(prevGoalsAway?.[5]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(15, 18).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetAway.slice(10, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
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
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(0, 3).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(0, 2).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const secondMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[1]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(3, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(2, 4).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const thirdMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[2]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(6, 9).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(4, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );
      const fouthMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[3]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(9, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(6, 8).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const fivesMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[4]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(12, 15).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(8, 10).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const sixMatchPassRateHomeEnemy = passRateCalc(
        Number(prevGoalsEnemyHome?.[5]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetHome.slice(15, 18).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
            : shotsOnTargetHome.slice(10, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_AWAY);
              }, 0)
        )
      );

      const firstMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[0]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(0, 3).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(0, 2).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const secondMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[1]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(3, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(2, 4).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const thirdMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[2]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(6, 9).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(4, 6).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const fouthMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[3]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(9, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(6, 8).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const fivesMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[4]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(12, 15).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(8, 10).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
      );

      const sixMatchPassRateAwayEnemy = passRateCalc(
        Number(prevGoalsEnemyAway?.[5]),
        Number(
          tournament.NAME === "США: НХЛ"
            ? shotsOnTargetAway.slice(15, 18).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
            : shotsOnTargetAway.slice(10, 12).reduce((sum, obj) => {
                return sum + Number(obj?.VALUE_HOME);
              }, 0)
        )
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
      const S4host = middleEfficiencyLeagAway / middleMissedForSixMatcesHome;
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
        indicatorHome,
        indicatorAway,
        stabilizerHome,
        stabilizerAway,
        trendIndicatorHome,
        trendIndicatorAway,
        anchorValueHome,
        anchorValueAway,
        follsInjurieHome,
        follsInjuriesAway,
        totalFollsInjuries,
        totalYellowCardInjuries,
        injuriesYellowCardAway,
        injuriesYellowCardHome,
        offsidersInjurieHome,
        offsidersInjuriesAway,
        totalOfidersInjuriesHome,
        totalShotsOnTarget,
        totalInjuriesAway,
        totalInjuriesHome,
        cornerInjuriesHome,
        cornerInjuriesAway,
        cornerTotalInjuries,
        injuriesBlockedShotsHome,
        injuriesBlockedShotsAway,
        totalShotsBlocked,
        twoMinutsRemoveTotalInjuries,
        twoMinutsRemoveInjuriesAway,
        twoMinutsRemoveInjuriesHome,
      };
    }
  }

  const statsAll = 1; // calculateAllStats();
  const firstTime = calculateStats("1-й тайм");
  const secondTime = 1; // calculateStats("2-й тайм");
  const firstPeriod = 1; // calculateStats("1-й период");
  const secondPeriod = 1; // calculateStats("2-й период");
  const thirdPeriod = 1; // calculateStats("3-й период");
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
      response.data.DATA[1]?.GROUPS[0].ITEMS.filter(
        (item) => item.EVENT_NAME === tournament.NAME_PART_2
      )
    );
    setPreviosMatchAway(
      response.data.DATA[2]?.GROUPS[0].ITEMS.filter(
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

  // calculateStats("Матч");

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
