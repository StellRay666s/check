import React from 'react';
import Link from 'next/link'

export default function HowItWork() {
    return (
        <div>
            <div className={`how-it-work`}>
          <div className={`container mx-auto`}>
            <div className={`how-it-work-content d-flex align-items-center`}>
              <div className={`how-it-work-content-nums d-flex`}>
                <div className={`how-it-work-content-num d-flex align-items-center justify-content-center`}>0.1</div>
                <div className={`how-it-work-content-num d-flex align-items-center justify-content-center`}>2.2</div>
              </div>
              <div className={`how-it-work-info flex-grow-1`}>
                <div className={`how-it-work-name`}>Как это работает?</div>
                <div className={`how-it-work-subname`}>Узнай о системе прогнозирования и алгоритмах</div>
              </div>
              <div className={`how-it-work-decore`}>
                <img src="../images/football_player.png" alt="" />
              </div>
              <div className={`how-it-work-text`}>
                <div className={`how-it-work-text-inner`}>
                  Уникальная платформа для анализа футбольных и хоккейных матчей
                </div>
                <Link href="/">
                  <a className={`how-it-work-link d-inline-block`}>
                    Узнать подробнее
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
        </div>
    );
}
