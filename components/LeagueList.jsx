import React from "react";
import League from "./League";
function LeagueList({ leag }) {
  const [item, setItem] = React.useState([
    { name: "Премьер лига", path: "/premier_league" },
    { name: "Премьер лига", path: "/premier_league" },
    { name: "Премьер лига", path: "/premier_league" },
    { name: "Премьер лига", path: "/premier_league" },
  ]);

  console.log(leag);
  return (
    <div>
      <div className={`leagues-list-column`}>
        {item.map((item, index) => {
          <League title={item.name} key={index} />;
        })}
      </div>
    </div>
  );
}

export default LeagueList;
