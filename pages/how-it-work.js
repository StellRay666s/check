import React from "react";
import { MainLayout } from "../layouts/MainLayout";
import Breadcrumbs from "../components/breadcrumbs";

import Link from "next/link";

function HowItWork() {
  return (
    <div>
      <MainLayout title="Как это работает">
        <main>
          <div className={`main-content pages-content`}>
            <div className="page-header">
              <Breadcrumbs title={"Как это работает"} />
              <div className={`container mx-auto`}>
                <h1 className={`pages-title m-0`}>Как это работает</h1>
              </div>
            </div>
            <div className={`container mx-auto`}>
              <div className="news-item-info">
                <div className="single-news-content">
                  <h2> Прогнозы Check-bets</h2> <p></p>{" "}
                  <p>
                    Основа наших прогнозов – алгоритм который был выстроен нашей
                    командой. Он основан на 5 прикладных науках и 2 теориях.
                  </p>{" "}
                  <h2> Учитываем только важное</h2>{" "}
                  <p>
                    {" "}
                    Модель расчета уникальна и в учет берутся только
                    определенное количество матчей которое систематизируется на
                    2 части для расчета показателей.
                  </p>
                  <h2> Ожидаемые голы команды</h2>{" "}
                  <p>
                    Многие кто часто смотрит матчи или ставит знают, что
                    зачастую матчи идут совершенно вопреки логики и казалось что
                    невозможно понять почему, наш алгоритм с этим справился. Наш
                    проект имеет 3 стадии для фанатов спорта и ставок на него,
                    -Бесплатная версия дает первичный расчет который необходим
                    игроку для оценки матча и каждого соперника и его
                    показателей. В эту часть входит как биг маркет так и смол
                    маркеты. -Партнерка, эта версия дает доступ к расчету
                    значительно более глубокому нашего алгоритма. В ней
                    показатель из бесплатной версии обработан куда более глубоко
                    и имеет индикатор в виде трендового изменения. Например,
                    бесплатная версия дала расчет матча НХЛ У хозяев 2.78 а у
                    Гостей 3.41, мы советуем играть показатели которые превышают
                    среднии показатели команд и ставку. В хоккеи зачастую инд
                    тотал голов 2.5 б/м выставлен, Если у команды показатель
                    больше 3 как в примере у гостей стоит расматривать эту
                    ставку. А партнерка дает индикатор и вот как это выглядит.
                    Алгоритм усовершенствовал показатели команд и у хозяев он с
                    2.78 изменился на 2.54 а у гостей с 3.41 изменился 3.52.
                    Теперь мы имеем показатели такие Хозяева 2.54 Гости 3.52 Но
                    главное это трендовый индикатор. У хозяев он 2.94 а у гостей
                    3.11 В таком случае стоит играть либо инд тотал хозяев 1.5 б
                    или 2б а вот гостей надо округлить до след целой цифры и у
                    них тренд падения так что играть инд тотал гостей 4 м
                    Платная. Это шедевр наших стараний и наша гордость. В этой
                    версии вы получаете доступ к уникальной точности ибо в этой
                    версии есть якорь( индикатор) который показывает минимальные
                    или максимальные значения которые наберет каждая команда.
                    Если в первых двух вариантах вы можете получить ставку к
                    каждому матчу то в этой версии только к тому что является
                    98% и коэф не ждите на такие расчеты больше 1.1-1.3 ибо эта
                    версия для тех кто зарабатывает на ставках а не проводит
                    досуг.
                  </p>{" "}
                </div>
              </div>
            </div>
          </div>
        </main>
      </MainLayout>
    </div>
  );
}

export default HowItWork;
