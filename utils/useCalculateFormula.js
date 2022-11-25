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
  const [statsForSixMatchesAway, setStatsForSixMatchesAway] = React.useState(
    []
  );

  const time = currentMatch?.START_TIME;
  const milleSeconds = time * 1000;
  const datteObject = new Date(milleSeconds);
  const hour = datteObject.toLocaleString("en-UK", { hour: "numeric" });
  const minute = datteObject.toLocaleString("en-UK", { minute: "numeric" });
  const day = datteObject.toLocaleString("en-UK", { day: "numeric" });
  const month = datteObject.toLocaleString("ru-RU", { month: "long" });

  //Кол-во игр в лиге
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

  const misedForFourMatchAway = previosMatchHome
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

  const misedForSixMatchAway = previosMatchHome
    .slice(0, 6)
    .reduce((sum, match) => {
      return sum + Number(match.HOME_SCORE_FULL);
    }, 0);

  const middleMissedForSixMatcesHome = misedForSixMatchHome / 6;
  const middleMissedForSixMatcesAway = misedForSixMatchAway / 6;

  //Пропущенные хозяев и гостей
  const missedHome =
    middleMissedForFourMatcesHome * 0.6 + middleMissedForSixMatcesHome * 0.4;
  const missedAway =
    middleMissedForFourMatcesAway * 0.6 + middleMissedForSixMatcesAway * 0.4;

  //Голы тотал
  //Без травм
  const totalMatchWithoutInjuriesHome = goalHome + missedHome;
  const totalMatchWithoutInjuriesGuest = goalAway + missedAway;
  const finallyTotalGoal =
    (totalMatchWithoutInjuriesHome + totalMatchWithoutInjuriesGuest) / 2;

  //Результативность лиги
  const efficiencyLeagHome = goalsForSixMatchHome / misedForSixMatchHome;
  const efficiencyLeagAway = goalsForSixMatchAway / misedForSixMatchAway;
  const middleEfficiencyLeagHome = efficiencyLeagHome / 2;
  const middleEfficiencyLeagAway = efficiencyLeagAway / 2;

  //Ценность  забитого
  const scoringValueHome = middleEfficiencyLeagHome / middleGoalInLeagHome;
  const scoringValueAway = middleEfficiencyLeagAway / middleGoalInLeagAway;

  //Ценность пропущенного
  const valueOfMissingHome = middleEfficiencyLeagHome / middleMissInLeagHome;
  const valueOfMissingAway = middleEfficiencyLeagAway / middleMissInLeagAway;

  //За все периоды
  const allPeriod = statsForSixMatchesHome.filter(
    (stats) => stats.STAGE_NAME === "Матч"
  );

  const allPeriodAway = statsForSixMatchesAway.filter(
    (stats) => stats.STAGE_NAME === "Матч"
  );

  // Удары в створ хозяева + соперники хозяев
  const shotsOnTargetHome = {
    fistMatch: allPeriod[0]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    secondMatch: allPeriod[1]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    thirdMatch: allPeriod[2]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    fouthMatch: allPeriod[3]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    fifesMatch: allPeriod[4]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    sixMatch: allPeriod[5]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
  };

  //Удары в створ за 4 матча хозяева
  const shotsOnTargetHomeForFourMatches =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME);

  //Всего ударов в створ хозяев
  const sumShotsOnTargetHome =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_HOME);

  //Пропущенные удары в створ хозяева
  const missedShotsOnTargetHome =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_AWAY);

  const missedShotsForFourMatchesHome =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY);

  //Средние пропущенные удары в створ
  const middleMissedShotsOnTargetForSixMatches = missedShotsOnTargetHome / 6;
  const middleMissedShotsOnTargetForFourMatches =
    missedShotsForFourMatchesHome / 4;
  //Средние удары в створ хозяева
  const middleShotsOnTargetForFourMatchesHome =
    shotsOnTargetHomeForFourMatches / 4;
  const middleShotsOnTargetForSixMatchesHome =
    shotsOnTargetHomeForFourMatches / 6;

  const shotOnTargetHome =
    middleShotsOnTargetForFourMatchesHome * 0.6 +
    middleShotsOnTargetForSixMatchesHome * 0.4;

  const miisedShotOnTarget =
    middleMissedShotsOnTargetForFourMatches * 0.6 +
    middleMissedShotsOnTargetForSixMatches * 0.4;

  //Блокированные голы хозяев + соперики хозяев
  const blockedShotsHome = {
    fistMatch: allPeriod[0]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    secondMatch: allPeriod[1]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    thirdMatch: allPeriod[2]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    fouthMatch: allPeriod[3]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    fifesMatch: allPeriod[4]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    sixMatch: allPeriod[5]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
  };

  //Голы хозяев + соперники хозяев
  const goalsHome = {
    fistMatch: Number(previosMatchHome[0]?.HOME_SCORE_FULL),
    secondMatch: Number(previosMatchHome[1]?.HOME_SCORE_FULL),
    thirdMatch: Number(previosMatchHome[2]?.HOME_SCORE_FULL),
    fouthMatch: Number(previosMatchHome[3]?.HOME_SCORE_FULL),
    fifesMatch: Number(previosMatchHome[4]?.HOME_SCORE_FULL),
    sixMatch: Number(previosMatchHome[5]?.HOME_SCORE_FULL),
  };
  const goalsHomeEnemy = {
    fistMatch: Number(previosMatchHome[0]?.AWAY_SCORE_FULL),
    secondMatch: Number(previosMatchHome[1]?.AWAY_SCORE_FULL),
    thirdMatch: Number(previosMatchHome[2]?.AWAY_SCORE_FULL),
    fouthMatch: Number(previosMatchHome[3]?.AWAY_SCORE_FULL),
    fifesMatch: Number(previosMatchHome[4]?.AWAY_SCORE_FULL),
    sixMatch: Number(previosMatchHome[5]?.AWAY_SCORE_FULL),
  };

  //Удары в створ гости + соперники гостей
  const shotsOnTargetAway = {
    fistMatch: allPeriodAway[0]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    secondMatch: allPeriodAway[1]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    thirdMatch: allPeriodAway[2]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    fouthMatch: allPeriodAway[3]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    fifesMatch: allPeriodAway[4]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
    sixMatch: allPeriodAway[5]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Удары в створ"
    ),
  };
  //Блокированные удары гостей + соперники
  const blockedShotsAway = {
    fistMatch: allPeriodAway[0]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    secondMatch: allPeriodAway[1]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    thirdMatch: allPeriodAway[2]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    fouthMatch: allPeriodAway[3]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    fifesMatch: allPeriodAway[4]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
    sixMatch: allPeriodAway[5]?.GROUPS?.[0].ITEMS.filter(
      (item) => item.INCIDENT_NAME === "Блок-но ударов"
    ),
  };
  // Всего ударов в створ гости
  const sumShotsTargetAway =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_AWAY);

  const shotsOnTargetAwayForFourMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_AWAY);

  //Пропущенные удары в створ гости
  const missedShotsOnTargetAwayForFourMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME);

  const missedSumShotsTargetAway =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_HOME);

  //Пропущенные удары в створ
  const middleMissedShotsOnTargetAwayForSixMAtches =
    missedSumShotsTargetAway / 6;
  const middleMissedShotsOnTargetAwayForFourMAtches =
    missedShotsOnTargetAwayForFourMatches / 4;

  //Средние удары в створ гости
  const middleShotsOnTargetForFourMatchesAway =
    shotsOnTargetAwayForFourMatches / 4;
  const middleShotsOnTargetForSixMatchesAway = sumShotsTargetAway / 6;

  //Пропущенные удары в створ гости
  const missedShotOnTargetAway =
    middleMissedShotsOnTargetAwayForFourMAtches * 0.6 +
    middleMissedShotsOnTargetAwayForSixMAtches * 0.4;

  //Удары в створ гости
  const shotOnTargetAway =
    middleShotsOnTargetForFourMatchesAway * 0.6 +
    middleShotsOnTargetForSixMatchesAway * 0.4;

  //Индивидуальный тотал голы
  const individTotalHomeGoal = (goalHome + missedAway) / 2;
  const individTotalAwayGoal = (goalAway + missedHome) / 2;

  //Голы гостей + соперников гостей
  const goalsAway = {
    fistMatch: Number(previosMatchAway[0]?.AWAY_SCORE_FULL),
    secondMatch: Number(previosMatchAway[1]?.AWAY_SCORE_FULL),
    thirdMatch: Number(previosMatchAway[2]?.AWAY_SCORE_FULL),
    fouthMatch: Number(previosMatchAway[3]?.AWAY_SCORE_FULL),
    fifesMatch: Number(previosMatchAway[4]?.AWAY_SCORE_FULL),
    sixMatch: Number(previosMatchAway[5]?.AWAY_SCORE_FULL),
  };
  const goalsAwayEnemy = {
    fistMatch: Number(previosMatchAway[0]?.HOME_SCORE_FULL),
    secondMatch: Number(previosMatchAway[1]?.HOME_SCORE_FULL),
    thirdMatch: Number(previosMatchAway[2]?.HOME_SCORE_FULL),
    fouthMatch: Number(previosMatchAway[3]?.HOME_SCORE_FULL),
    fifesMatch: Number(previosMatchAway[4]?.HOME_SCORE_FULL),
    sixMatch: Number(previosMatchAway[5]?.HOME_SCORE_FULL),
  };

  //Тотал без травм удары в створ
  const shotsOnTargetInjuriesHome = shotOnTargetHome + miisedShotOnTarget;
  const shotsOnTargetInjuriesAway = shotOnTargetAway + missedShotOnTargetAway;
  const finallyTotalShotsOnTarget =
    (shotsOnTargetInjuriesHome + shotsOnTargetInjuriesAway) / 2;

  //Индивидуальный тотал
  const individTotalHome = (shotOnTargetHome + missedShotOnTargetAway) / 2;
  const individTotalAway = (shotOnTargetAway + miisedShotOnTarget) / 2;

  //Броски хозяева(удары в створ + блокированные удары)
  const throwsHomeForFourMatches =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.fistMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.secondMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.fouthMatch[0]?.VALUE_HOME);

  const throwsHomeForSixMatches =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.fistMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.secondMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.thirdMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.fouthMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.fifesMatch[0]?.VALUE_HOME) +
    Number(blockedShotsHome?.sixMatch[0]?.VALUE_HOME);

  const middleThrowsHomeForFourMatches = throwsHomeForFourMatches / 4;
  const middleThrowsHomeForSixMatches = throwsHomeForSixMatches / 6;

  // Пропущенные броски хозяева(удары в створ + блокированные удары)
  const missedThrowsHomeForFourMatches =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.fouthMatch[0]?.VALUE_AWAY);

  const missedThrowsHomeForSixMatches =
    Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.fistMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.secondMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.thirdMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.fouthMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.fifesMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsHome?.sixMatch[0]?.VALUE_AWAY);

  const middleMissedThrowForSixMatchHome = missedThrowsHomeForSixMatches / 6;
  const middleMissedThrowForFourMatchHome = missedThrowsHomeForFourMatches / 4;

  //Броски гостей(удары в створ + блокированные удары)
  const throwsAwayForFourMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.fouthMatch[0]?.VALUE_AWAY);

  const throwsAwayForSixMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_AWAY) +
    Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.fistMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.secondMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.thirdMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.fouthMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.fifesMatch[0]?.VALUE_AWAY) +
    Number(blockedShotsAway?.sixMatch[0]?.VALUE_AWAY);

  const middleThrowsAwayForFourMatches = throwsAwayForFourMatches / 4;
  const middleThrowsAwayForSixMatches = throwsAwayForSixMatches / 6;

  //Пропущенные броски гостей(удары в створ + блокированные удары)
  const missedThrowsAwayForFourMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) +
    Number(blockedShotsAway?.fistMatch[0]?.VALUE_HOME) +
    Number(blockedShotsAway?.secondMatch[0]?.VALUE_HOME) +
    Number(blockedShotsAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(blockedShotsAway?.fouthMatch[0]?.VALUE_HOME);

  const missedThrowsAwayForSixMatches =
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_HOME) +
    Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_HOME);

  const middleMissedThrowsAwayForFourMatches =
    missedThrowsAwayForFourMatches / 4;
  const middleMissedThrowsAwayForSixMatches = missedThrowsAwayForSixMatches / 6;

  //Броски хозяева/гостей
  const throwHome =
    middleThrowsHomeForFourMatches * 0.6 + middleThrowsHomeForSixMatches * 0.4;
  const throwAway =
    middleThrowsAwayForFourMatches * 0.6 + middleThrowsAwayForSixMatches * 0.4;

  //Броски хозяев/гостей пропущенные
  const throwHomeMissed =
    middleMissedThrowForSixMatchHome * 0.4 +
    middleMissedThrowForFourMatchHome * 0.6;

  const throwAwayMissed =
    middleMissedThrowsAwayForFourMatches * 0.6 +
    middleMissedThrowsAwayForSixMatches * 0.4;

  //Индивидуальный тотал броски
  const individTotalThrowHome = (throwHome + throwAwayMissed) / 2;
  const individTotalThrowAway = (throwAway + throwHomeMissed) / 2;

  //Хозяева Процент пропущенных
  console.log(previosMatchHome);
  const passRateHome = {
    firstMatch:
      Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[0]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[0]?.AWAY_SCORE_FULL),
    secondMatch:
      Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[1]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[1]?.AWAY_SCORE_FULL),
    thirdMatch:
      Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[2]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[2]?.AWAY_SCORE_FULL),
    fourMatch:
      Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[3]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[3]?.AWAY_SCORE_FULL),
    fifesMacth:
      Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[4]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[4]?.AWAY_SCORE_FULL),
    sixMacth:
      Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_AWAY) /
        Number(previosMatchHome[5]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_AWAY) /
          Number(previosMatchHome[5]?.AWAY_SCORE_FULL),
  };

  //Гости процент пропущенных
  const passRateAway = {
    firstMatch:
      Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[0]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.fistMatch[0]?.VALUE_HOME) /
          Number(previosMatchAway[0]?.HOME_SCORE_FULL),
    secondMatch:
      Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[1]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.secondMatch[0]?.VALUE_HOME) /
          Number(previosMatchAway[1]?.HOME_SCORE_FULL),
    thirdMatch:
      Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[2]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.thirdMatch[0]?.VALUE_HOME) /
          Number(previosMatchAway[2]?.HOME_SCORE_FULL),
    fourMatch:
      Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[3]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.fouthMatch[0]?.VALUE_HOME) /
          Number(previosMatchAway[3]?.HOME_SCORE_FULL),
    fifesMacth:
      Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[4]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.fifesMatch[0]?.VALUE_HOME) /
          Number(previosMatchAway[4]?.HOME_SCORE_FULL),
    sixMacth:
      Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_HOME) /
        Number(previosMatchAway[5]?.HOME_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetAway?.sixMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[5]?.HOME_SCORE_FULL),
  };

  //Средний процент отбития
  const middlePassRateHome =
    (passRateHome.firstMatch +
      passRateHome.secondMatch +
      passRateHome.thirdMatch +
      passRateHome.fourMatch +
      passRateHome.fifesMacth +
      passRateHome.sixMacth) /
    6;

  const middlePassRateAway =
    (passRateAway.firstMatch +
      passRateAway.secondMatch +
      passRateAway.thirdMatch +
      passRateAway.fourMatch +
      passRateAway.fifesMacth +
      passRateAway.sixMacth) /
    6;
  //Хозяева процент забитых
  const scoringPercentage = {
    firstMatch:
      Number(previosMatchHome[0]?.AWAY_SCORE_FULL) /
        Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fistMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[0]?.AWAY_SCORE_FULL),
    secondMatch:
      Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) /
        Number(previosMatchHome[1]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.secondMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[1]?.AWAY_SCORE_FULL),
    thirdMatch:
      Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) /
        Number(previosMatchHome[2]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.thirdMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[2]?.AWAY_SCORE_FULL),
    fourMatch:
      Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME) /
        Number(previosMatchHome[3]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fouthMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[3]?.AWAY_SCORE_FULL),
    fifesMacth:
      Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_HOME) /
        Number(previosMatchHome[4]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.fifesMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[4]?.AWAY_SCORE_FULL),
    sixMacth:
      Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_HOME) /
        Number(previosMatchHome[5]?.AWAY_SCORE_FULL) ===
      Infinity
        ? 0
        : Number(shotsOnTargetHome?.sixMatch[0]?.VALUE_HOME) /
          Number(previosMatchHome[5]?.AWAY_SCORE_FULL),
  };

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
            "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
            "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
            "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
              "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                  "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                    "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                      "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
            "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
              "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                  "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                    "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
                      "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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
    // if (query.id && !currentMatch) {
    //   getCurrentMatch(query.id);
    // }
    // if (currentMatch) {
    //   getPrevMatches(currentMatch);
    //   getDateFromTimeStamp(previosMatchHome);
    // }
  }, [query.id, currentMatch]);

  React.useEffect(() => {
    setTimeout(() => {
      // getStatsHome(previosMatchHome);
      // getStatsAway(previosMatchAway);
    }, 4400);
  }, [previosMatchHome]);

  return {
    currentMatch,
    hour,
    minute,
    day,
    month,
    tournament,
    previosMatchHome,
  };
}

export { useCalculateFormule };

export function goalsForFourMatchesHost(first, second, third, fouth) {
  return first + second + third + fouth;
}
const goalForFourMatchesHost = 12;
const goalForSixMatchesHost = 17;
const middleForFourMAtchesHost = 3;
const middleForSixMAtchesHost = 2.833333333;

//Пропущенные
const missedForFourMatchesHost = 10;
const missedForSixMatchesHost = 18;
const middleMissedForFourMatchesHost = 2.5;
const middleMissedForSixMatchesHost = 3;

//голы соперников хозяеев + удары в створ
const goalsEnemyHost = [1, 4, 5, 0, 5, 3];
const shotOnGoalsEnemyHost = [28, 38, 43, 34, 35, 27];

//голы хозяев + удары в ствоgoalGuestgoalHost = [2, 3, 3, 4, 2, 3];
const shotOnGoalHost = [20, 27, 31, 22, 28, 42];
const goalHost = [2, 3, 3, 4, 2, 3];

//Кол-во игр
const countGameHost = 13;

//Забито в лиге хозяев
const goalInLeagueHost = 35;
const missedInLeagueHost = 29;

//Голы хозяев
const goalsHost =
  middleForFourMAtchesHost * 0.6 + middleForSixMAtchesHost * 0.4;
//Пропущенные хозяев
const missedHost =
  middleMissedForFourMatchesHost * 0.6 + middleMissedForSixMatchesHost * 0.4;

//Результативность лиги хозяева
const resultLeagueHost = (goalForSixMatchesHost + missedForSixMatchesHost) / 6;
//Средняя результативность лиги хозяева
const middleResultLeagueHost = resultLeagueHost / 2;

//среднее забитое в лиге хозяева
const middleGoalInLeagueHost = goalInLeagueHost / countGameHost;
//Среднее пропущенное в лиге хозяева
const middleMissedInLeagueHost = missedInLeagueHost / countGameHost;

//ценность забитого хозяева
const valueGoalsHost = middleResultLeagueHost / middleGoalInLeagueHost;

//ценность пропущенного хозяева
const valueMissedHost = middleResultLeagueHost / middleMissedInLeagueHost;
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//Гости
//Голы
const goalForFourMatchesGuest = 12;
const goalForSixMatchesGuest = 23;
const middleForFourMAtchesGuest = 3;
const middleForSixMAtchesGuest = 3.833333333;
//Пропущенные
const missedForFourMatchesGuest = 10;
const missedForSixMatchesGuest = 15;
const middleMissedForFourMatches = 2.5;
const middleMissedForSixMatches = 2.5;

//голы соперников гостей + удары в створ
const goalsEnemyGuest = [3, 2, 3, 2, 3, 2];
const shotOnGoalsEnemyGuest = [36, 29, 31, 36, 29, 34];

//голы гостей + удары в створ
const goalGuest = [3, 1, 5, 3, 6, 5];
const shotOnGoalGuest = [35, 43, 43, 21, 42, 31];

//Кол-во игр
const countGameGuest = 12;

//Забито в лиге гости
const goalInLeagueGuest = 41;
const missedInLeagueGuest = 33;

//Голы гости
const goalsGuest =
  middleForFourMAtchesGuest * 0.6 + middleForSixMAtchesGuest * 0.4;
//Пропущенные гости
const missedGuest =
  middleMissedForFourMatches * 0.6 + middleMissedForSixMatches * 0.4;

//Результативность лиги гости
const resultLeagueGuest =
  (goalForSixMatchesGuest + missedForSixMatchesGuest) / 6;
//Средняя результативность лиги гости
const middleResultLeagueGuest = resultLeagueGuest / 2;

//среднее забитое в лиге гости
const middleGoalInLeagueGuest = goalInLeagueGuest / countGameGuest;
//Среднее пропущенное в лиге гости
const middleMissedInLeagueGuest = missedInLeagueGuest / countGameGuest;

//ценность забитого гости
const valueGoalsGuest = middleResultLeagueGuest / middleGoalInLeagueGuest;

//ценность пропущенного гости
const valueMissedGuest = middleResultLeagueGuest / middleMissedInLeagueGuest;

//Голы тотал
//Тотал матча без травм
const totalMatchWithoutInjuriesHost = goalsHost + missedHost;
const totalMatchWithoutInjuriesGuest = goalsGuest + missedGuest;

//Итоговый тотал
const finallyTotal =
  (totalMatchWithoutInjuriesHost + totalMatchWithoutInjuriesGuest) / 2;

//Индивидуальный тотал хозяева
const individTotalHost = (goalsHost + missedGuest) / 2;
const individTotalGuest = (goalsGuest + missedHost) / 2;

///Броски хозяева(Блокированные удары+удары в створ)
const totalShotsForFourMatches = 157;
const totalShotsForSixMatches = 256;
//Средние общие броски зозяева
const middleTotalShotsForFourMatches = totalShotsForFourMatches / 4;
const middleTotalShotsForSixMatches = totalShotsForSixMatches / 6;
//Пропущенные броски
const missedTotalShotsForFourMatches = 227;
const missedTotalShotsForSixMatches = 321;
//Средние пропущенные броски
const middleMissedShotsForFourMatches = missedTotalShotsForFourMatches / 4;
const middleMissedShotsForSixMatches = missedTotalShotsForSixMatches / 6;
//Общие броски хозяева
const totalShotsHost =
  middleTotalShotsForFourMatches * 0.6 + middleTotalShotsForSixMatches * 0.4;
//Общие пропущенные броски хозяева
const totalMissedHost =
  middleMissedShotsForFourMatches * 0.6 + middleMissedShotsForSixMatches * 0.4;

///Броски гости(Блокированные удары+удары в створ)
const totalShotsForFourMatchesGuest = 215;
const totalShotsForSixMatchesGuest = 326;
//Средние общие броски гости
const middleTotalShotsForFourMatchesGuest = totalShotsForFourMatchesGuest / 4;
const middleTotalShotsForSixMatchesGuest = totalShotsForSixMatchesGuest / 6;
//Пропущенные броски
const missedTotalShotsForFourMatchesGuest = 186;
const missedTotalShotsForSixMatchesGuest = 276;
//Средние пропущенные броски
const middleMissedShotsForFourMatchesGuest =
  missedTotalShotsForFourMatchesGuest / 4;
const middleMissedShotsForSixMatchesGuest =
  missedTotalShotsForSixMatchesGuest / 6;
//Общие броски гости
const totalShotsGuest =
  middleTotalShotsForFourMatchesGuest * 0.6 +
  middleTotalShotsForSixMatchesGuest * 0.4;
//Общие пропущенные броски гости
const totalMissedGuest =
  middleMissedShotsForFourMatchesGuest * 0.6 +
  middleMissedShotsForSixMatchesGuest * 0.4;

//Броски тотал
const individtotalShotsHost = (totalShotsHost + totalMissedGuest) / 2;
const individtotalShotsGuest = (totalMissedHost + totalShotsGuest) / 2;

//Удары в створ хозяева
const shotsOnGoalHostFourMatches = 100;
const shotsOnGoalHostSixMatches = 170;
//Средние удары в створ хоз
const middleShotsOnGoalHostFourMatches = shotsOnGoalHostFourMatches / 4;
const middleShotsOnGoalHostSixMatches = shotsOnGoalHostSixMatches / 6;
//Пропущенные удары в створ
const missedShotsOnGoalHostFourMatches = 143;
const missedShotsOnGoalHostSixMatches = 205;
//Средние пропущенные удары в створ хоз
const missedMiddleShotsOnGoalHostFourMatches =
  missedShotsOnGoalHostFourMatches / 4;
const missedMiddleShotsOnGoalHostSixMatches =
  missedShotsOnGoalHostSixMatches / 6;
//Удары в створ хозяева
const shotsOnGoalHost =
  middleShotsOnGoalHostFourMatches * 0.6 +
  middleShotsOnGoalHostSixMatches * 0.4;
//пропущенные удары в створ хозяева
const missedOnGoalShotsHost =
  missedMiddleShotsOnGoalHostFourMatches * 0.6 +
  missedMiddleShotsOnGoalHostSixMatches * 0.4;

//Удары в створ гости
const shotsOnGoalGuestFourMatches = 142;
const shotsOnGoalGuestSixMatches = 215;
//Средние удары в створ гости
const middleShotsOnGoalGuestFourMatches = shotsOnGoalGuestFourMatches / 4;
const middleShotsOnGoalGuestSixMatches = shotsOnGoalGuestSixMatches / 6;
//Пропущенные удары в створ
const missedShotsOnGoalGuestFourMatches = 132;
const missedShotsOnGoalGuestSixMatches = 195;
//Средние пропущенные удары в створ гости
const missedMiddleShotsOnGoalGuestFourMatches =
  missedShotsOnGoalGuestFourMatches / 4;
const missedMiddleShotsOnGoalGuestSixMatches =
  missedShotsOnGoalGuestSixMatches / 6;
//Удары в створ гости
const shotsOnGoalGuest =
  middleShotsOnGoalGuestFourMatches * 0.6 +
  middleShotsOnGoalGuestSixMatches * 0.4;
//пропущенные удары в створ гости
const missedOnGoalShotsGuest =
  missedMiddleShotsOnGoalGuestFourMatches * 0.6 +
  missedMiddleShotsOnGoalGuestSixMatches * 0.4;

//Удары в створ тотал
const totalShotsOnGoalWithoutInjuryHost =
  shotsOnGoalHost + missedOnGoalShotsHost;
const totalShotsOnGoalWithoutInjuryGuest =
  shotsOnGoalGuest + missedOnGoalShotsGuest;
const summeryTotalShotsOnGoal =
  (totalShotsOnGoalWithoutInjuryHost + totalShotsOnGoalWithoutInjuryGuest) / 2;

//Индивидуальный тотал
const individShotsOnGoalHost = (shotsOnGoalHost + missedOnGoalShotsGuest) / 2;
const individShotsOnGoalGuest = (shotsOnGoalGuest + missedOnGoalShotsHost) / 2;
//Ценность ударов в створ(Нападение)
const valueShotsOnGoalHostAttack =
  goalForSixMatchesHost / shotsOnGoalHostSixMatches;
const valueShotsOnGoalGuestAttack =
  goalForSixMatchesGuest / shotsOnGoalGuestSixMatches;
//Ценность ударов в створ(Защита)
const valueShotsOnGoalHostSave =
  missedForSixMatchesHost / missedShotsOnGoalHostSixMatches;
const valueShotsOnGoalGuestSave =
  missedForSixMatchesGuest / missedShotsOnGoalGuestSixMatches;

//средний процент отбития хозяева
const battingAverageHost =
  (goalsEnemyHost[0] / shotOnGoalsEnemyHost[0] +
    goalsEnemyHost[1] / shotOnGoalsEnemyHost[1] +
    goalsEnemyHost[2] / shotOnGoalsEnemyHost[2] +
    goalsEnemyHost[3] / shotOnGoalsEnemyHost[3] +
    goalsEnemyHost[4] / shotOnGoalsEnemyHost[4] +
    goalsEnemyHost[5] / shotOnGoalsEnemyHost[5]) /
  6;

//средний процент отбития гости
const battingAverageGuest =
  (goalsEnemyGuest[0] / shotOnGoalsEnemyGuest[0] +
    goalsEnemyGuest[1] / shotOnGoalsEnemyGuest[1] +
    goalsEnemyGuest[2] / shotOnGoalsEnemyGuest[2] +
    goalsEnemyGuest[3] / shotOnGoalsEnemyGuest[3] +
    goalsEnemyGuest[4] / shotOnGoalsEnemyGuest[4] +
    goalsEnemyGuest[5] / shotOnGoalsEnemyGuest[5]) /
  6;

//Процент забитых к вствор
const fieldGoalPercentageHost =
  (goalHost[0] / shotOnGoalHost[0] +
    goalHost[1] / shotOnGoalHost[1] +
    goalHost[2] / shotOnGoalHost[2] +
    goalHost[3] / shotOnGoalHost[3] +
    goalHost[4] / shotOnGoalHost[4] +
    goalHost[5] / shotOnGoalHost[5]) /
  6;

//Процент забитых к вствор
const fieldGoalPercentageGuest =
  (goalGuest[0] / shotOnGoalGuest[0] +
    goalGuest[1] / shotOnGoalGuest[1] +
    goalGuest[2] / shotOnGoalGuest[2] +
    goalGuest[3] / shotOnGoalGuest[3] +
    goalGuest[4] / shotOnGoalGuest[4] +
    goalGuest[5] / shotOnGoalGuest[5]) /
  6;

// Хозяева Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M27-название ячейки
const M27 = middleTotalShotsForSixMatches / middleShotsOnGoalHostSixMatches;

//Хозяева Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N27-название ячейки
const N27 =
  middleMissedShotsForSixMatches / missedMiddleShotsOnGoalHostSixMatches;

//Гости Средние забитые броски за 6 матчей /Средние забитые удары в створ за 6 матчей P.S M28-название ячейки
const M28 =
  middleTotalShotsForSixMatchesGuest / middleShotsOnGoalGuestSixMatches;

//Гости Средние пропущенные броски за 6 матчей/Средние пропущенные удары в створ за 6 матчей P.S N28-название ячейки
const N28 =
  middleMissedShotsForSixMatchesGuest / missedMiddleShotsOnGoalGuestSixMatches;

//Хозяева D10
const host = individtotalShotsHost / M27;
//Гости
const guest = individtotalShotsGuest / M28;

//К соотношению атаки
const toTheRatioOfAttackHost = host * valueShotsOnGoalHostAttack;
const toTheRatioOfAttackGuest = guest * valueShotsOnGoalGuestAttack;

//Среднее результативность в лиге/Среднее забитое за 6 матчей M4
const M4host = middleResultLeagueHost / middleForSixMAtchesHost;

//Среднее результативность в лиге/Среднее забитое за 6 матчей M5
const M5guest = middleResultLeagueGuest / middleForSixMAtchesGuest;

//ИТБ к ценности нападения
const itbToTheValueOfTheAttackHost = individTotalHost / M4host;
const itbToTheValueOfTheAttackGuest = individTotalGuest / M5guest;

//F10=Индивидуальный тотал(удары, хозява)/N28
const F10 = individtotalShotsHost / N28;
//F11=Индивидуальный тотал(удары, гости)/N27
const F11 = individtotalShotsGuest / N27;

//Атака H13
const attackHost = F10 * fieldGoalPercentageHost;
//Атака H14
const attackGuest = F11 * fieldGoalPercentageGuest;
//Атака H13*Ценность удары в створ защита хоз
const I13 = attackHost * valueShotsOnGoalGuestSave;
//Атака H14*Ценность удары в створ защита гости
const I14 = attackGuest * valueShotsOnGoalHostSave;

//S4, S5 =Средняя результативность лиги/Среднее пропущенное за 6 матчей
const S4host = middleResultLeagueGuest / middleMissedForSixMatchesHost;
const S5guest = middleResultLeagueGuest / middleMissedForSixMatches;

//К ценности защиты противника
const valueOfTheEnemysDefenseHost = attackHost / S5guest;
const valueOfTheEnemysDefenseGuest = attackGuest / S4host;

//H8 ИТБ к ценности нападения/К ценности защиты противника
const H8host = valueOfTheEnemysDefenseHost / itbToTheValueOfTheAttackHost;
const H8guest = valueOfTheEnemysDefenseGuest / itbToTheValueOfTheAttackGuest;

//Тренд
const trandHost = toTheRatioOfAttackHost / H8host;
const trandGuest = toTheRatioOfAttackGuest / H8guest;

//B14 = B18/S16(индивидуальный тотал)

//E15 =Индивидуальный тотал ГОЛЫ ХОЗЯЕВА/M4
const E15host = individTotalHost / M4host;
const E16guest = individTotalGuest / M5guest;

//F15
const F15host = toTheRatioOfAttackHost / S5guest;
const F16guest = toTheRatioOfAttackGuest / S4host;

//D15/D16
const D15host = E15host / F15host;
const D16guest = E16guest / F16guest;

//H16 =Индивидуальный тотал голы хозяева /s5
const h16 = individTotalHost / S5guest;
const h15 = individTotalGuest / S4host;

//i16 =k14/m5 k14=j19*m14 j19=z9/n27 m14 =t2/t21

const J19 = individtotalShotsGuest / N27;
const m14 =
  middleMissedForSixMatchesHost / missedMiddleShotsOnGoalHostSixMatches;

//Пропустят хозяева
const k14 = J19 * m14;

//i16
const i16 = k14 / M5guest;

const H16 = individTotalHost / S5guest;

const g16 = H16 / i16;

const c19 = D16guest / g16;

//B15 = тренд /d15
const B15 = trandHost * D15host;

const B18 = B15 / c19;

const A18 = B18 / individTotalHost;

/////////
const B13 = trandHost / A18; ////Показатель Хозяев
/////////

// B14=E14/A19 A19=B19/s17 B19=B16/C18 B16 = E14*D16

const B16 = trandGuest * D16guest;

//C18 = D15/g15 G15=H15/i15 h15 = s17/s4 i15 = k15/m4 k15 =j18*m15 J18 =z8/n28 m15 = t3/t22

const m15 = middleMissedForSixMatches / missedMiddleShotsOnGoalGuestSixMatches;

const J18 = individtotalShotsHost / N28;

const K15 = J18 * m15;

const I15 = K15 / M4host;

const G15 = h15 / I15;

const C18 = D15host / G15;

const B19 = B16 / C18;

const A19 = B19 / individTotalGuest;

////
const B14 = trandGuest / A19; ///Показатель гости
////
//стабилизатор хозяева
//f13=e13*c13 c13 = l18/e13 l18=k15/j11 j11 =l10/k11 l10=h10/m4

const h10 = F10 * battingAverageGuest;

const l10 = h10 / M4host;

const k11 = attackHost / S5guest;

const j11 = l10 / k11;

const l18 = K15 / j11;

const c13 = l18 / trandHost;

////////
const f13 = trandHost * c13; /////Стабилизатор Хозяева
////////

////
//const f14=E14*C14, c14=l17/e14 l17=k14/j10 j10=l11/k10

const h11 = F11 * battingAverageHost;

const l11 = h11 / M5guest;

const k10 = attackGuest / S4host;

const j10 = l11 / k10;

const l17 = k14 / j10;

const c14 = l17 / trandGuest;

///////
const f14 = trandGuest * c14; /////Стабилизатор гости
//////

///Трендовый показатель хозяева

const c43 = f13 / A19;
////

///Трендовый показатель гости

const c44 = f14 / A18;

/////// Якорный показатель хозяева
const e43 = (c43 / resultLeagueGuest) * B13;

/////Якорный показатель гости
const e44 = (c44 / resultLeagueHost) * B14;

function IndicatorHosts() {
  return trandHost / A18;
}

function IndicatorGuest() {
  return trandGuest / A19;
}

function stabilizerHost() {
  return trandHost * c13;
}

function stabilizerGuest() {
  return trandGuest * c14;
}

function anchorIndicatorHost() {
  return (c43 / resultLeagueGuest) * B13;
}

function anchorIndicatorGuest() {
  return (c44 / resultLeagueHost) * B14;
}

export {
  IndicatorHosts,
  IndicatorGuest,
  stabilizerHost,
  stabilizerGuest,
  anchorIndicatorHost,
  anchorIndicatorGuest,
};
