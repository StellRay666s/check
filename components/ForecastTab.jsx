import React from "react";

function ForecastTab({ activeForecastTab, handlematch, nameTab, time }) {
  return (
    <button
      className={`btn tab-button d-flex align-items-center justify-content-center ${
        activeForecastTab === time ? "active" : ""
      }`}
      onClick={handlematch}
    >
      <span>{nameTab}</span>
    </button>
  );
}

export default ForecastTab;
