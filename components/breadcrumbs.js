import React from 'react'
import Link from 'next/link';
export default function Breadcrumbs() {
    return (
        <div className={`breadcrumbs_block`}>
            <div className={`container-max mx-auto`}>
                <div className={`breadcrumbs-content d-flex align-items-center`}>
                    <Link href="">
                        <a className={`breadcrumb-link`}>Главная</a>
                    </Link>
                    <span className={`separate`}>/</span>
                    Лиги
                </div>
            </div>
        </div>
    )
}
