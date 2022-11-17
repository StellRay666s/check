import React from 'react'

export default function Search() {
    return (
        <form className={`search_block position-relative`} action="">
            <input type="text" className={`search-input w-100`} placeholder="Поиск команды" />
            <button className={`btn btn-search d-flex position-absolute`}>
                <img src="../images/search.svg" alt="" />
            </button>
        </form>
    )
}
