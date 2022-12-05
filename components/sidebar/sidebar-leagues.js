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
            "3e63304450msh29388120546f2d0p15ce21jsnb4fdd7382d8f",
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

// const overtimeTargetHomeFourMatches = statsForFourMatchesHome
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Броски в створ ворот"
//     )[0]
// );
// const shotOnTargetForFourMatchesHomeOvertime =
// overtimeTargetHomeFourMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// }, 0);

// const shotOnTargetForFourMatchesHomeEnemyOvertime =
// overtimeTargetHomeFourMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const overtimeTargetHomeSixMatches = statsForSixMatchesHome
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Броски в створ ворот"
//     )[0]
// );
// const shotOnTargetForSixMatchesHomeOvertime =
// overtimeTargetHomeSixMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// }, 0);

// const shotOnTargetForSixMatchesHomeEnemyOvertime =
// overtimeTargetHomeSixMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const blockedOvertimeHomeFour = statsForFourMatchesHome
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Блок-но ударов"
//     )[0]
// );
// const blockedForFourMatchesHomeOvertime = blockedOvertimeHomeFour.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// },
// 0
// );
// const blockedForFourMatchesHomeEnemyOvertime =
// blockedOvertimeHomeFour.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const blockedOvertimeHomeSix = statsForSixMatchesHome
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Блок-но ударов"
//     )[0]
// );

// const blockedForSixMatchesHomeOvertime = blockedOvertimeHomeSix.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// },
// 0
// );
// const blockedForSixMatchesHomeEnemyOvertime = blockedOvertimeHomeSix.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// },
// 0
// );

// const overtimeTargetAwayFourMatches = statsForFourMatchesAway
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Броски в створ ворот"
//     )[0]
// );

// const shotOnTargetForFourMatchesAwayOvertime =
// overtimeTargetAwayFourMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const shotOnTargetForFourMatchesAwayEnemyOvertime =
// overtimeTargetAwayFourMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// }, 0);

// const overtimeTargetAwaySixMatches = statsForSixMatchesAway
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Броски в створ ворот"
//     )[0]
// );
// const shotOnTargetForSixMatchesAwayOvertime =
// overtimeTargetAwaySixMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const shotOnTargetForSixMatchesAwayEnemyOvertime =
// overtimeTargetAwaySixMatches.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// }, 0);

// const blockedOvertimeAwayFour = statsForFourMatchesAway
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Блок-но ударов"
//     )[0]
// );
// const blockedForFourMatchesAwayOvertime = blockedOvertimeAwayFour.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// },
// 0
// );
// const blockedForFourMatchesAwayEnemyOvertime =
// blockedOvertimeAwayFour.reduce((sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// }, 0);

// const blockedOvertimeAwaySix = statsForSixMatchesAway
// .filter((item) => item.STAGE_NAME === "Овертайм")
// .map(
//   (item) =>
//     item.GROUPS[0].ITEMS.filter(
//       (item) => item.INCIDENT_NAME === "Блок-но ударов"
//     )[0]
// );

// const blockedForSixMatchesAwayOvertime = blockedOvertimeAwaySix.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_AWAY);
// },
// 0
// );
// const blockedForSixMatchesAwayEnemyOvertime = blockedOvertimeAwaySix.reduce(
// (sum, obj) => {
//   return sum + Number(obj.VALUE_HOME);
// },
// 0
// );

// //Блок-но ударов

// const periodsForFourMatchesHome = statsForFourMatchesHome.filter(
// (stats) => stats.STAGE_NAME === period
// );

// const periodsForSixMatchesHome = statsForSixMatchesHome.filter(
// (stats) => stats.STAGE_NAME === period
// );

// const periodsForFourMatchesAway = statsForFourMatchesHome.filter(
// (stats) => stats.STAGE_NAME === period
// );

// const periodsForSixMatchesAway = statsForSixMatchesHome.filter(
// (stats) => stats.STAGE_NAME === period
// );

// const shotsOnTargetHome = {
// fistMatch: periodsForFourMatchesHome[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// secondMatch: periodsForFourMatchesHome[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// thirdMatch: periodsForFourMatchesHome[2]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// fouthMatch: periodsForFourMatchesHome[3]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// fifesMatch: periodsForSixMatchesHome[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// sixMatch: periodsForSixMatchesHome[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// };

// const shotsOnTargetAway = {
// fistMatch: periodsForFourMatchesAway[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// secondMatch: periodsForFourMatchesAway[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// thirdMatch: periodsForFourMatchesAway[2]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// fouthMatch: periodsForFourMatchesAway[3]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// fifesMatch: periodsForSixMatchesAway[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// sixMatch: periodsForSixMatchesAway[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) =>
//     item.INCIDENT_NAME === "Удары в створ" ||
//     item.INCIDENT_NAME === "Броски в створ ворот"
// )?.[0],
// };

// const shotsOnTargetHomeForFourMatches =
// period === "Матч"
//   ? Number(shotsOnTargetHome.fistMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.secondMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.thirdMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.fouthMatch.VALUE_HOME) -
//     shotOnTargetForFourMatchesHomeOvertime
//   : Number(shotsOnTargetHome.fistMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.secondMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.thirdMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.fouthMatch.VALUE_HOME);

// const shotsOnTargetHomeForSixMatches =
// period === "Матч"
//   ? shotsOnTargetHomeForFourMatches +
//     Number(shotsOnTargetHome.fifesMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.sixMatch.VALUE_HOME) -
//     shotOnTargetForSixMatchesHomeOvertime
//   : shotsOnTargetHomeForFourMatches +
//     Number(shotsOnTargetHome.fifesMatch.VALUE_HOME) +
//     Number(shotsOnTargetHome.sixMatch.VALUE_HOME);

// const missedShotsOnTargetHomeForFourMatches =
// period === "Матч"
//   ? Number(shotsOnTargetHome.fistMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.secondMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.thirdMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.fouthMatch.VALUE_AWAY) -
//     shotOnTargetForFourMatchesHomeEnemyOvertime
//   : Number(shotsOnTargetHome.fistMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.secondMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.thirdMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.fouthMatch.VALUE_AWAY);

// const missedShotsOnTargetHomeForSixMatches =
// period === "Матч"
//   ? missedShotsOnTargetHomeForFourMatches +
//     Number(shotsOnTargetHome.fifesMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.sixMatch.VALUE_AWAY) -
//     shotOnTargetForSixMatchesHomeEnemyOvertime
//   : missedShotsOnTargetHomeForFourMatches +
//     Number(shotsOnTargetHome.fifesMatch.VALUE_AWAY) +
//     Number(shotsOnTargetHome.sixMatch.VALUE_AWAY);

// const middleShotOnTargeForFourMatches = shotsOnTargetHomeForFourMatches / 4;
// const middleShotOnTargetForSixMatches = shotsOnTargetHomeForSixMatches / 6;

// const middleMissedShotOnTargetForFourMatchesHome =
// missedShotsOnTargetHomeForFourMatches / 4;
// const middleMissedShotOnTargetForSixMatchesHome =
// missedShotsOnTargetHomeForSixMatches / 6;

// const shotOnTargetAwayForFourMatches =
// period === "Матч"
//   ? Number(shotsOnTargetAway.fistMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.secondMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.thirdMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.fouthMatch.VALUE_AWAY) -
//     shotOnTargetForFourMatchesAwayOvertime
//   : Number(shotsOnTargetAway.fistMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.secondMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.thirdMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.fouthMatch.VALUE_AWAY);

// const shotOnTargetAwayForSixMatches =
// period === "Матч"
//   ? shotOnTargetAwayForFourMatches +
//     Number(shotsOnTargetAway.fifesMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.sixMatch.VALUE_AWAY) -
//     shotOnTargetForSixMatchesAwayOvertime
//   : shotOnTargetAwayForFourMatches +
//     Number(shotsOnTargetAway.fifesMatch.VALUE_AWAY) +
//     Number(shotsOnTargetAway.sixMatch.VALUE_AWAY);

// const missedShotOnTargetForFourMatchesAway =
// period === "Матч"
//   ? Number(shotsOnTargetAway.fistMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.secondMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.thirdMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.fouthMatch.VALUE_HOME) -
//     shotOnTargetForFourMatchesAwayEnemyOvertime
//   : Number(shotsOnTargetAway.fistMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.secondMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.thirdMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.fouthMatch.VALUE_HOME);

// const missedShotOnTargetForSixMatchesAway =
// period === "Матч"
//   ? missedShotOnTargetForFourMatchesAway +
//     Number(shotsOnTargetAway.fifesMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.sixMatch.VALUE_HOME) -
//     shotOnTargetForSixMatchesAwayEnemyOvertime
//   : missedShotOnTargetForFourMatchesAway +
//     Number(shotsOnTargetAway.fifesMatch.VALUE_HOME) +
//     Number(shotsOnTargetAway.sixMatch.VALUE_HOME);

// const middleShotOnTargeForFourMatchesAway =
// shotOnTargetAwayForFourMatches / 4;
// const middleShotOnTargetForSixMatchesAway =
// shotOnTargetAwayForSixMatches / 6;

// const middleMissedShotOnTargetForFourMatchesAway =
// missedShotOnTargetForFourMatchesAway / 4;
// const middleMissedShotOnTargetForSixMatchesAway =
// missedShotOnTargetForSixMatchesAway / 6;

// const shotOnTargetHome =
// middleMissedShotOnTargetForFourMatchesHome * 0.6 +
// middleMissedShotOnTargetForSixMatchesHome * 0.4;

// const missedShotOnTargetHome =
// middleShotOnTargeForFourMatches * 0.6 +
// middleShotOnTargetForSixMatches * 0.4;

// const shotOnTargetAway =
// middleShotOnTargeForFourMatchesAway * 0.6 +
// middleShotOnTargetForSixMatchesAway * 0.4;

// const missedShorOnTargetAway =
// middleMissedShotOnTargetForFourMatchesAway * 0.6 +
// middleMissedShotOnTargetForSixMatchesAway * 0.4;

// const totalMatchWithoutInjuriesShotOnTargetlHome =
// shotOnTargetHome + missedShotOnTargetHome;

// const totalMatchWithoutInjuriesShotOnTargetlAway =
// shotOnTargetAway + missedShorOnTargetAway;

// const totalShotOnTarget =
// (totalMatchWithoutInjuriesShotOnTargetlHome +
//   totalMatchWithoutInjuriesShotOnTargetlAway) /
// 2;

// const individeTotalShotOnTargetHome =
// (shotOnTargetHome + missedShorOnTargetAway) / 2;

// const individeTotalShotOnTargetAway =
// (shotOnTargetAway + missedShotOnTargetHome) / 2;

// const blocledShottHome = {
// fistMatch: periodsForFourMatchesHome[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// secondMatch: periodsForFourMatchesHome[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// thirdMatch: periodsForFourMatchesHome[2]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// fouthMatch: periodsForFourMatchesHome[3]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// fifesMatch: periodsForSixMatchesHome[0]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// sixMatch: periodsForSixMatchesHome[1]?.GROUPS?.[0].ITEMS.filter(
//   (item) => item.INCIDENT_NAME === "Блок-но ударов"
// )?.[0],
// };

// const blockedShotsHomeForFourMatch =
// period === "Матч"
//   ? Number(blocledShottHome.fistMatch.VALUE_HOME) +
//     Number(blocledShottHome.secondMatch.VALUE_HOME) +
//     Number(blocledShottHome.thirdMatch.VALUE_HOME) +
//     Number(blocledShottHome.fouthMatch.VALUE_HOME) -
//     blockedForFourMatchesHomeOvertime
//   : Number(blocledShottHome.fistMatch.VALUE_HOME) +
//     Number(blocledShottHome.secondMatch.VALUE_HOME) +
//     Number(blocledShottHome.thirdMatch.VALUE_HOME) +
//     Number(blocledShottHome.fouthMatch.VALUE_HOME);

// const blockedShotsHomeForSixMatch =
// period === "Матч"
//   ? blockedShotsHomeForFourMatch +
//     Number(blocledShottHome.fifesMatch.VALUE_HOME) +
//     Number(blocledShottHome.sixMatch.VALUE_HOME) -
//     blockedForSixMatchesHomeOvertime
//   : blockedShotsHomeForFourMatch +
//     Number(blocledShottHome.fifesMatch.VALUE_HOME) +
//     Number(blocledShottHome.sixMatch.VALUE_HOME);

// const blockedShotsMissedForFourMatchHome =
// period === "Матч"
//   ? Number(blocledShottHome.fistMatch.VALUE_AWAY) +
//     Number(blocledShottHome.secondMatch.VALUE_AWAY) +
//     Number(blocledShottHome.thirdMatch.VALUE_AWAY) +
//     Number(blocledShottHome.fouthMatch.VALUE_AWAY) -
//     blockedForFourMatchesHomeEnemyOvertime
//   : Number(blocledShottHome.fistMatch.VALUE_AWAY) +
//     Number(blocledShottHome.secondMatch.VALUE_AWAY) +
//     Number(blocledShottHome.thirdMatch.VALUE_AWAY) +
//     Number(blocledShottHome.fouthMatch.VALUE_AWAY);

// const blockedShotsMissedHomeForSixMatch =
// period === "Матч"
//   ? blockedShotsMissedForFourMatchHome +
//     Number(blocledShottHome.fifesMatch.VALUE_AWAY) +
//     Number(blocledShottHome.sixMatch.VALUE_AWAY) -
//     blockedForSixMatchesHomeEnemyOvertime
//   : blockedShotsHomeForFourMatch +
//     Number(blocledShottHome.fifesMatch.VALUE_AWAY) +
//     Number(blocledShottHome.sixMatch.VALUE_AWAY);

// const blockeShotsForFourMatchesAway =
//     period === 'Матч'?

//     :''
