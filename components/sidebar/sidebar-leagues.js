import React from 'react'
import Link from 'next/link'

export default function SidebarLeagues() {
    const leagues = [1, 2, 3, 4, 5, 6, 7, 8, 9]
    return (
        <div className={`popular-leagues`}>
            <div className={`sidebar-name`}>Популярные лиги</div>
            <div className={`popular-leagues-content`}>
                {leagues.map((index) =>
                    <Link key={index} href="/">
                        <a className={`league-item d-flex align-items-center`}>
                            <div className="league-icon">
                                <img src="../images/league.png" alt="" />
                            </div>
                            <div className="league-name">Лига Чемпионов</div>
                        </a>
                    </Link>
                )}
            </div>
        </div>
    )
}
