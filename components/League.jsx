import React from "react";
import Link from "next/link";

function League({ title, path }) {
  return (
    <Link href="/">
      <a className={`league-item d-flex align-items-center`}>
        <div className="league-icon">
          <img src="../images/league.png" alt="" />
        </div>
        <div className="league-name">{title}</div>
      </a>
    </Link>
  );
}

export default League;
