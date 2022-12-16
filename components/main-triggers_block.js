import React from "react";

export default function MainTriggersBlock() {
  return (
    <div className={`main-triggers-block d-flex justify-content-between`}>
      <div className={`main-triggers-info`}>
        <div className={`main-triggers-title`}>Check-bets</div>
        <div className={`main-triggers-text`}>
          это реальный способ заработать на ставках
        </div>
      </div>
      <div className={`main-triggers-content d-grid`}>
        <div className={`main-trigger-item text-center`}>
          <div className={`main-trigger-icon`}>
            <img src="../images/main-trigger-1.svg" alt="" />
          </div>
          <div className={`main-trigger-name`}>
            Прогнозы в виде ожидаемых показателей карты
          </div>
        </div>
        <div className={`main-trigger-item text-center`}>
          <div className={`main-trigger-icon`}>
            <img src="../images/main-trigger-2.svg" alt="" />
          </div>
          <div className={`main-trigger-name`}>
            Собственная методика расчета
          </div>
        </div>
        <div className={`main-trigger-item text-center`}>
          <div className={`main-trigger-icon`}>
            <img src="../images/main-trigger-3.svg" alt="" />
          </div>
          <div className={`main-trigger-name`}>
            Доступные тарифы для получения прогнозов
          </div>
        </div>
      </div>
    </div>
  );
}
