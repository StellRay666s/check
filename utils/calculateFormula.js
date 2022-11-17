//Хозяева
//Голы
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
